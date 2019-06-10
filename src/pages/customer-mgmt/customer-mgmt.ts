import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { ConstantsProvider } from '../../providers/constants/constants';
import { CustomerDetailsPage } from '../customer-details/customer-details';
import { OrderAddPage } from '../order-add/order-add';
import { OrderMgmtPage } from '../order-mgmt/order-mgmt';
import { PopoverSortFiltersPage } from '../popover-sort-filters/popover-sort-filters';
import { DatabaseProvider } from '../../providers/database/database';
import { AgingFilterPopoverPage } from '../aging-filter-popover/aging-filter-popover';
import { DatePipe } from '@angular/common';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the CustomerMgmtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-mgmt',
  templateUrl: 'customer-mgmt.html',
})
export class CustomerMgmtPage {

  customersList: any[] = [];
  paginationDetails: any = {
    currentPageNo: 1,
    totalPages: 0
  };
  isPaginatedResultsFetched: boolean = true;
  orginalCustomersList: any[] = [];
  orginalListDuplicate: any[] = [];
  myInput: string = '';
  totalOutstanding: number = 0;
  referrer: string = null;
  currentSortOrder: number = 0;
  displayCriteria: any = '0';
  tillDate: any = '';
  isDataSynching: boolean = false;


  customerMgmtApiEndpoint: string = ConstantsProvider.API_BASE_URL
    + ConstantsProvider.API_ENDPOINT_CUSTOMER_MGMT;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private commonUtility: CommonUtilityProvider,
    private popOverController: PopoverController,
    private restService: RestserviceProvider,
    private network: Network,
    private databaseProvider: DatabaseProvider) {

    this.isDataSynching = false;

    this.databaseProvider.getLastUpdatedTs()
      .subscribe(response => {
        this.tillDate = response.rows.item(0).data;
        console.log('tillDate = ' + this.tillDate + ', Response = ' + JSON.stringify(response));

        this.updateCustomerDataFromDB();

        let timeSinceLastSync: number = this.commonUtility.calculateDiffInMins(new Date(this.tillDate), new Date());
        console.log('Till Date : ' + this.tillDate + ', Current Date = ' + new Date() + ', timeSinceLastSync = ' + timeSinceLastSync);

        if (timeSinceLastSync >= 30) {
          console.log('Synching Data');
          this.syncCustomerData();
        } else {
          console.log('Not Synching Data');
        }
      }
      );

    this.referrer = this.navParams.get('referrer');


    // this.restService.getDetails(this.getCustMgmtApiEndpoint(1))
    //   .subscribe(
    //     (response) => {
    //       console.log('Response = ' + JSON.stringify(response.response));
    //       this.customersList = response.response;
    //       this.orginalCustomersList = this.customersList;
    //       this.orginalListDuplicate = this.customersList;
    //       this.totalOutstanding = response.metaData;

    //       //: Update Pagiination Details
    //       this.paginationDetails = response.paginationDetails;
    //       console.log('this.paginationDetails = ' + JSON.stringify(this.paginationDetails));
    //     }
    //   );
  }

  updateCustomerDataFromDB() {

    this.databaseProvider.getCustomerData()
      .subscribe(
        res => {
          if (res.rows.length > 0) {
            console.log('CustData = ' + res.rows.item(0).data);
            this.customersList = JSON.parse(res.rows.item(0).data);
          }

          this.orginalCustomersList = this.customersList;
          this.orginalListDuplicate = this.customersList;

          this.setCustomerBalanceFromOriginalList();
        }
        , (e) => {
          console.log(JSON.stringify(e));
        });
  }

  setCustomerBalanceFromOriginalList() {

    let sortedList: any[] = [];
    this.totalOutstanding = 0;
    // this.customersList.forEach(
    this.orginalCustomersList.forEach(
      (customer) => {
        let custBal = customer.customerDetails.balance;
        this.totalOutstanding = this.totalOutstanding + custBal;

        customer.calculatedBal = custBal;

        sortedList.push(customer);
      }
    );

    this.customersList = sortedList;
    console.log('total outstanding: ' + this.totalOutstanding);
  }

  getCustMgmtApiEndpoint(pageNo: number) {

    // return this.customerMgmtApiEndpoint + pageNo;
    return this.customerMgmtApiEndpoint;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerMgmtPage');
  }

  // getRecordsPaginated(infiniteScrollEvent: any) {

  //   console.log('getRecordsPaginated CustMgmtPage');

  //   let currentPageNo: number = this.paginationDetails.currentPageNo;
  //   let totalPages: number = this.paginationDetails.totalPages;

  //   if (this.isPaginatedResultsFetched) {

  //     if (this.commonUtility.isNetworkAvailable()) {

  //       if (currentPageNo < totalPages) {
  //         currentPageNo = currentPageNo + 1;
  //         console.log('currentPageNo = ' + currentPageNo);
  //         setTimeout(() => {

  //           this.isPaginatedResultsFetched = false;

  //           this.restService.getDetails(this.getCustMgmtApiEndpoint(currentPageNo))
  //             .subscribe(
  //               (response) => {
  //                 this.isPaginatedResultsFetched = true;
  //                 console.log('isPaginatedResultsFetched = ' + this.isPaginatedResultsFetched);

  //                 this.customersList = this.customersList.concat(response.response);
  //                 this.orginalCustomersList = this.customersList;

  //                 this.paginationDetails = response.paginationDetails;

  //                 infiniteScrollEvent.complete();
  //               },
  //               () => {
  //                 this.isPaginatedResultsFetched = true;
  //                 infiniteScrollEvent.complete();
  //                 console.log('isPaginatedResultsFetched = ' + this.isPaginatedResultsFetched);
  //               }
  //             );
  //         }, 500);
  //       } else {
  //         infiniteScrollEvent.enable(false);
  //       }
  //     }
  //   }
  // }

  onInput() {

    console.log('searchTerm = ' + this.myInput);

    let searchVal = this.myInput;

    // if the value is an empty string don't filter the items
    if (searchVal && searchVal.trim() != '') {

      this.customersList = this.orginalCustomersList.filter((customerDetailsObj: any) => {

        let searchValLowerCase = searchVal.toLowerCase();

        if ((null != customerDetailsObj.customerDetails.cardName && customerDetailsObj.customerDetails.cardName.toLowerCase().indexOf(searchValLowerCase) > -1)
          || (customerDetailsObj.customerDetails.phone1 != null
            && customerDetailsObj.customerDetails.phone1.toLowerCase().indexOf(searchValLowerCase) > -1)
          || customerDetailsObj.customerDetails.cardCode.toLowerCase().indexOf(searchValLowerCase) > -1)
          return true;
        else
          return false;
      });

      console.log('Customers List Length = ' + this.customersList.length);
    } else {
      this.customersList = this.orginalListDuplicate;
      this.orginalCustomersList = this.orginalListDuplicate;
    }
  }

  searchCustomers() {

    console.log('searchTerm = ' + this.myInput);

    let searchVal = this.myInput;

    // if the value is an empty string don't filter the items
    if (searchVal && searchVal.trim() != '') {

      let searchCustomerApi = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_CUST_DTLS
        + ConstantsProvider.URL_SEPARATOR + "search-term?search-term=" + searchVal;

      this.restService.getDetails(searchCustomerApi)
        .subscribe(
          (response) => {
            this.customersList = response.response;
            this.orginalCustomersList = this.customersList;
          }
        )
      console.log('Customers List Length = ' + this.customersList.length);
    } else {
      this.customersList = this.orginalListDuplicate;
      this.orginalCustomersList = this.orginalListDuplicate;
    }
  }

  viewCustomerDetails(customer: any) {

    console.log('viewCustomerDetails CustomerMgmtPage');

    if (null != this.referrer && undefined != this.referrer && this.referrer != '') {
      switch (this.referrer) {

        case OrderMgmtPage.name:
          this.navCtrl.push(OrderAddPage, {
            customer: customer
          });
          break;

        default:
          this.commonUtility.presentErrorToast('Invalid Referrer Supplied');
      }
    } else {

      this.navCtrl.push(CustomerDetailsPage, {
        customer: customer,
        isModalData: false
      });
    }

    // if (this.commonUtility.isNetworkAvailable()) {
    //   console.log('referrer = ' + this.referrer);

    //   if (null != this.referrer && undefined != this.referrer && this.referrer != '') {
    //     switch (this.referrer) {

    //       case OrderMgmtPage.name:
    //         this.navCtrl.push(OrderAddPage, {
    //           customer: customer
    //         });
    //         break;

    //       default:
    //         this.commonUtility.presentErrorToast('Invalid Referrer Supplied');
    //     }
    //   } else {
    //     this.navCtrl.push(CustomerDetailsPage, {
    //       customer: customer,
    //       isModalData: false
    //     });
    //   }
    // }
  }


  // callCust(customer) {

  //   console.log('Calling Customer on : ' + customer.customerDetails.cellular);
  //   this.commonUtility.callNumber(customer.customerDetails.cellular, true);
  // }


  callCust(custContactNumber: any) {

    console.log('Calling Customer on : ' + custContactNumber);
    this.commonUtility.callNumber(custContactNumber, true);
  }

  presentPopoverDataSorting(event: any) {

    const popOver = this.popOverController.create(PopoverSortFiltersPage, {
      sortOrder: this.currentSortOrder,
      isCustMgmt: true
    });

    popOver.present({
      ev: event
    });

    popOver.onDidDismiss(
      (data) => {
        if (data && data.sortData) {
          let selectedSortOrder: number = Number.parseInt(data.sortOrder);
          console.log('selectedSortOrder = ' + selectedSortOrder);

          this.sortDataBySelectedSortOrder(selectedSortOrder);
        }
      });
  }

  sortDataBySelectedSortOrder(selectedSortOrder: number) {

    console.log('selectedSortOrder = ' + selectedSortOrder);

    switch (selectedSortOrder) {

      // 1 = Amount (Low - High)
      case 1:
        this.customersList.sort(
          (a, b) => a.calculatedBal <= b.calculatedBal ? -1 : 1
          // (a, b) => a.customerDetails.balance <= b.customerDetails.balance ? -1 : 1
        );
        break;

      // 2 = Amount (High - Low) 
      case 2:
        this.customersList.sort(
          (a, b) => a.calculatedBal >= b.calculatedBal ? -1 : 1
          // (a, b) => a.customerDetails.balance >= b.customerDetails.balance ? -1 : 1
        );
        break;

      // 3 = Due Days (Low - High)
      case 3:
        this.customersList.sort(
          (a, b) => a.dueDateInDays <= b.dueDateInDays ? -1 : 1
        );
        break;

      // 4 = Due Days (High - Low)
      case 4:
        this.customersList.sort(
          (a, b) => a.dueDateInDays >= b.dueDateInDays ? -1 : 1
        );
        break;

      default:
        break;
    }

    this.currentSortOrder = selectedSortOrder;
  }

  presentPopoverAging(event: any) {

    const popOver = this.popOverController.create(AgingFilterPopoverPage, {
      agingperiod: this.displayCriteria
    });
    popOver.present({
      ev: event
    });

    popOver.onDidDismiss(
      (data) => {
        if (data && data.showAging) {
          let selectedAgingPeriod: number = Number.parseInt(data.agingPeriod);
          console.log('selectedAgingPeriod = ' + selectedAgingPeriod);

          if (selectedAgingPeriod == 0) {
            this.setCustomerBalanceFromOriginalList();
          } else {
            console.log('tillDate = ' + this.tillDate);
            let dateToCompare: Date = new Date(this.tillDate);

            console.log('Active Date = ' + dateToCompare.toISOString()
              + ', selectedAgingPeriod = ' + selectedAgingPeriod);

            dateToCompare.setDate(dateToCompare.getDate() - selectedAgingPeriod);
            console.log('Date Back by selectedAgingPeriod Days = ' + dateToCompare.toISOString());

            let dateToCompareFormatted: any = new DatePipe(ConstantsProvider.APP_DATE_LOCALE).transform(dateToCompare.toISOString(), 'yyyy-MM-dd');
            console.log('dateToCompareFormatted = ' + dateToCompareFormatted);

            let sortedList: any[] = [];
            this.totalOutstanding = 0;

            this.orginalCustomersList.forEach((customer: any) => {

              // let custDebit: number = 0;
              // let custCredit: number = 0;
              let custBalance: number = 0;

              if (customer.customerInvoicesList != null && customer.customerInvoicesList.length > 0) {
                customer.customerInvoicesList.forEach(
                  (invoice: any) => {
                    if (invoice.invoiceDate < dateToCompareFormatted
                      && (invoice.type == 'IN' || invoice.type == 'OB' || invoice.type == 'JE')) {
                      // custDebit = custDebit + Number.parseFloat(invoice.debit);
                      // custCredit = custCredit + Number.parseFloat(invoice.credit);
                      custBalance = custBalance + Number.parseFloat(invoice.grossTotal);
                    }
                  }
                );
              }

              // let custBalance: number = custDebit - custCredit;

              if (custBalance > 0) {
                this.totalOutstanding = this.totalOutstanding + custBalance;

                customer.calculatedBal = custBalance;
                console.log('calculatedBal = ' + customer.calculatedBal);

                sortedList.push(customer);
              }
            });

            this.customersList = sortedList;
          }

          this.displayCriteria = selectedAgingPeriod;
          this.sortDataBySelectedSortOrder(this.currentSortOrder);
        }
      }
    );
  }

  syncCustomerData() {

    let customersDetailsApiEndpoint = ConstantsProvider.API_BASE_URL
      + ConstantsProvider.API_ENDPOINT_CUST_DTLS + ConstantsProvider.URL_SEPARATOR
      + ConstantsProvider.API_ENDPOINT_SYNC;

    this.isDataSynching = true;

    if (this.network.type != "unknown" && this.network.type != "none" && this.network.type != undefined) {

      this.restService.getDetailsWithoutLoader(customersDetailsApiEndpoint)
        .subscribe(
          (response) => {
            this.isDataSynching = false;

            console.log('Customers Data = ' + JSON.stringify(response.response));
            let customersDetailsList: any[] = response.response;

            this.databaseProvider.initializeSqlLiteDb().then((db: SQLiteObject) => {

              db.executeSql('SELECT data from metadata where configname=?',
                [ConstantsProvider.CONFIG_NM_CUST_DATA])
                .then(
                  res => {
                    if (res.rows.length > 0) {
                      this.updateCustomerDetailsFromApi(customersDetailsList);
                    } else {
                      db.executeSql('INSERT INTO metadata(configname, data) VALUES(?,?)',
                        [ConstantsProvider.CONFIG_NM_CUST_DATA, ''])
                        .then(res => {
                          console.log('Inserted Empty Customer Record');
                          this.updateCustomerDetailsFromApi(customersDetailsList);
                        })
                        .catch(e => {
                          console.log(JSON.stringify(e))
                          this.isDataSynching = false;
                        })
                    }
                  }
                )
                .catch(e => {
                  console.log(JSON.stringify(e))
                  this.isDataSynching = false;
                })
            })
              .catch(e => {
                console.log(JSON.stringify(e))
                this.isDataSynching = false;
              })
          },
          (err) => {
            this.isDataSynching = false;
          }
        );
    } else {
      this.commonUtility.presentErrorToast('No Internet Connection');
      this.isDataSynching = false;
    }
  }

  updateCustomerDetailsFromApi(customersDetailsList: any[]) {

    this.databaseProvider.initializeSqlLiteDb().then((db: SQLiteObject) => {
      db.executeSql('UPDATE metadata set data=? WHERE configname=?', [JSON.stringify(customersDetailsList),
      ConstantsProvider.CONFIG_NM_CUST_DATA])
        .then(
          res => {
            console.log('Updated Customer Record');

            db.executeSql('SELECT data from metadata where configname=?',
              [ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS])
              .then(
                res => {
                  if (res.rows.length > 0) {
                    this.updateLastUpdatedTs();
                  } else {
                    db.executeSql('INSERT INTO metadata(configname, data) VALUES(?,?)',
                      [ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS, ''])
                      .then(res => {
                        console.log('Inserted Empty Customer Record');
                        this.updateLastUpdatedTs();
                      })
                      .catch(e => console.log(JSON.stringify(e)));
                  }
                }
              );
          }
        )
        .catch(e => {
          console.log(JSON.stringify(e))
        });
    })
      .catch(e => {
        console.log(JSON.stringify(e))
      })
  }

  updateLastUpdatedTs() {

    this.databaseProvider.initializeSqlLiteDb().then((db: SQLiteObject) => {
      let updatedTs = new Date().toISOString();
      this.tillDate = updatedTs;
      db.executeSql('UPDATE metadata set data=? WHERE configname=?', [updatedTs,
        ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS])
        .then(
          res => {
            console.log('Updated Last Updated Ts');
            this.updateCustomerDataFromDB();
            this.isDataSynching = false;
          }
        )
        .catch(e => {
          console.log(JSON.stringify(e))
        })
    })
      .catch(e => {
        console.log(JSON.stringify(e))
      })
  }
}
