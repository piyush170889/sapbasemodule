import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { ConstantsProvider } from '../../providers/constants/constants';
import { CustomerDetailsPage } from '../customer-details/customer-details';
import { OrderAddPage } from '../order-add/order-add';
import { OrderMgmtPage } from '../order-mgmt/order-mgmt';

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

  customerMgmtApiEndpoint: string = ConstantsProvider.API_BASE_URL
    + ConstantsProvider.API_ENDPOINT_CUSTOMER_MGMT;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private commonUtility: CommonUtilityProvider,
    private restService: RestserviceProvider) {

    this.referrer = this.navParams.get('referrer');

    this.restService.getDetails(this.getCustMgmtApiEndpoint(1))
      .subscribe(
        (response) => {
          console.log('Response = ' + JSON.stringify(response.response));
          this.customersList = response.response;
          this.orginalCustomersList = this.customersList;
          this.orginalListDuplicate = this.customersList;

          this.customersList.forEach(
            (customer) => {
              this.totalOutstanding = this.totalOutstanding + customer.customerDetails.balance;
            }
          )
          console.log('total outstanding: ' + this.totalOutstanding);

          //: Update Pagiination Details
          this.paginationDetails = response.paginationDetails;
          console.log('this.paginationDetails = ' + JSON.stringify(this.paginationDetails));
        }
      );
  }

  getCustMgmtApiEndpoint(pageNo: number) {

    return this.customerMgmtApiEndpoint + pageNo;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerMgmtPage');
  }

  getRecordsPaginated(infiniteScrollEvent: any) {

    console.log('getRecordsPaginated CustMgmtPage');

    let currentPageNo: number = this.paginationDetails.currentPageNo;
    let totalPages: number = this.paginationDetails.totalPages;

    if (this.isPaginatedResultsFetched) {

      if (this.commonUtility.isNetworkAvailable()) {

        if (currentPageNo < totalPages) {
          currentPageNo = currentPageNo + 1;
          console.log('currentPageNo = ' + currentPageNo);
          setTimeout(() => {

            this.isPaginatedResultsFetched = false;

            this.restService.getDetails(this.getCustMgmtApiEndpoint(currentPageNo))
              .subscribe(
                (response) => {
                  this.isPaginatedResultsFetched = true;
                  console.log('isPaginatedResultsFetched = ' + this.isPaginatedResultsFetched);

                  this.customersList = this.customersList.concat(response.response);
                  this.orginalCustomersList = this.customersList;

                  this.paginationDetails = response.paginationDetails;

                  infiniteScrollEvent.complete();
                },
                () => {
                  this.isPaginatedResultsFetched = true;
                  infiniteScrollEvent.complete();
                  console.log('isPaginatedResultsFetched = ' + this.isPaginatedResultsFetched);
                }
              );
          }, 500);
        } else {
          infiniteScrollEvent.enable(false);
        }
      }
    }
  }

  onInput() {

    console.log('searchTerm = ' + this.myInput);

    let searchVal = this.myInput;

    // if the value is an empty string don't filter the items
    if (searchVal && searchVal.trim() != '') {

      this.customersList = this.orginalCustomersList.filter((customerDetailsObj: any) => {

        let searchValLowerCase = searchVal.toLowerCase();

        if (customerDetailsObj.customerDetails.cardName.toLowerCase().indexOf(searchValLowerCase) > -1
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

    if (this.commonUtility.isNetworkAvailable()) {
      console.log('referrer = ' + this.referrer);

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
    }
  }


  callCust(customer) {

    console.log('Calling Customer on : ' + customer.customerDetails.cellular);
    this.commonUtility.callNumber(customer.customerDetails.cellular, true);
  }

}
