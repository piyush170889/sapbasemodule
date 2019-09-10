import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ConstantsProvider } from '../../providers/constants/constants';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Network } from '@ionic-native/network';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { ScreenOrientation } from '@ionic-native/screen-orientation';


/**
 * Generated class for the SummaryReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-summary-report',
  templateUrl: 'summary-report.html',
})
export class SummaryReportPage {

  isDataSynching = false;
  tillDate: string = '';
  originalSummaryReportList: any[] = [];
  summaryReportList: any[] = [];
  orginalListDuplicate: any[] = [];
  dispJan: boolean = true;
  dispFeb: boolean = true;
  dispMar: boolean = true;
  dispApr: boolean = true;
  dispMay: boolean = true;
  dispJun: boolean = true;
  dispJul: boolean = true;
  dispAug: boolean = true;
  dispSep: boolean = true;
  dispOct: boolean = true;
  dispNov: boolean = true;
  dispDec: boolean = true;



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private databaseProvider: DatabaseProvider,
    private commonUtility: CommonUtilityProvider,
    private network: Network,
    private restService: RestserviceProvider,
    private modal: ModalController,
    private screenOrientation: ScreenOrientation
  ) {
    // get current
    console.log("screenOrientation = " + this.screenOrientation.type); // logs the current orientation, example: 'landscape'

    // set to landscape
    if (this.screenOrientation.type != this.screenOrientation.ORIENTATIONS.LANDSCAPE)
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    this.isDataSynching = false;

    this.updateSummaryReportsDataFromDB();

    this.databaseProvider.getMetaData(ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS_SUMM_RPT)
      .subscribe(response => {
        if (response && response.rows.length > 0) {

          this.tillDate = response.rows.item(0).data;
          console.log('tillDate = ' + this.tillDate + ', Response = ' + JSON.stringify(response));

          let timeSinceLastSync: number = this.commonUtility.calculateDiffInMins(new Date(this.tillDate), new Date());
          console.log('Till Date : ' + this.tillDate + ', Current Date = ' + new Date() + ', timeSinceLastSync = ' + timeSinceLastSync);

          if (timeSinceLastSync >= 30) {
            console.log('Synching Data');
            this.syncSummaryReportsData();
          } else {
            console.log('Not Synching Data');
          }
        } else {
          console.log('Synching Data');
          this.syncSummaryReportsData();
        }
      }
      );
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SummaryReportPage');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave SummaryReportPage');

    //unlock screenorientation
    this.screenOrientation.unlock();
  }

  updateSummaryReportsDataFromDB() {

    console.log('updateSummaryReportsDataFromDB SummaryReportPage');

    this.databaseProvider.getMetaData(ConstantsProvider.CONFIG_NM_SUMM_RPT_DATA)
      .subscribe(
        res => {
          if (res.rows.length > 0) {

            console.log('Summary Report Data = ' + res.rows.item(0).data);
            let dbSummaryReportList: any[] = JSON.parse(res.rows.item(0).data);

            dbSummaryReportList = this.commonUtility.resetSummaryReportDisplayData(dbSummaryReportList);

            this.originalSummaryReportList = dbSummaryReportList;
            this.summaryReportList = dbSummaryReportList;
          }

          this.orginalListDuplicate = this.originalSummaryReportList;
        }
        , (e) => {
          console.log(JSON.stringify(e));
        });
  }

  syncSummaryReportsData() {

    console.log('syncSummaryReportsData SummaryReportPage');

    console.log('syncVisitData VisitHistoryPage');

    let summaryReportsDetailsApiEndpoint = ConstantsProvider.API_BASE_URL
      + ConstantsProvider.API_ENDPOINT_CUST_DTLS + ConstantsProvider.URL_SEPARATOR
      + ConstantsProvider.API_ENDPOINT_SUMM_RPT;

    console.log('summaryReportsDetailsApiEndpoint = ' + summaryReportsDetailsApiEndpoint);

    if (this.network.type != "unknown" && this.network.type != "none" && this.network.type != undefined) {

      this.isDataSynching = true;

      this.restService.getDetailsWithoutLoader(summaryReportsDetailsApiEndpoint)
        .subscribe(
          (response) => {
            this.isDataSynching = false;

            console.log('Summary Report Data = ' + JSON.stringify(response.response));
            let summaryReportDetailsList: any[] = response.response;
            let sortedSummaryReportDetailsList: any[] = [];

            summaryReportDetailsList.forEach(
              (summaryReportDetails: any) => {
                summaryReportDetails.apr = null == summaryReportDetails.apr
                  || summaryReportDetails.apr == '' ? 0 : Number.parseFloat(summaryReportDetails.apr).toFixed(2);
                summaryReportDetails.may = null == summaryReportDetails.may
                  || summaryReportDetails.may == '' ? 0 : Number.parseFloat(summaryReportDetails.may).toFixed(2);
                summaryReportDetails.jun = null == summaryReportDetails.jun
                  || summaryReportDetails.jun == '' ? 0 : Number.parseFloat(summaryReportDetails.jun).toFixed(2);
                summaryReportDetails.jul = null == summaryReportDetails.jul
                  || summaryReportDetails.jul == '' ? 0 : Number.parseFloat(summaryReportDetails.jul).toFixed(2);
                summaryReportDetails.aug = null == summaryReportDetails.aug
                  || summaryReportDetails.aug == '' ? 0 : Number.parseFloat(summaryReportDetails.aug).toFixed(2);
                summaryReportDetails.sep = null == summaryReportDetails.sep
                  || summaryReportDetails.sep == '' ? 0 : Number.parseFloat(summaryReportDetails.sep).toFixed(2);
                summaryReportDetails.oct = null == summaryReportDetails.oct
                  || summaryReportDetails.oct == '' ? 0 : Number.parseFloat(summaryReportDetails.oct).toFixed(2);
                summaryReportDetails.nov = null == summaryReportDetails.nov
                  || summaryReportDetails.nov == '' ? 0 : Number.parseFloat(summaryReportDetails.nov).toFixed(2);
                summaryReportDetails.dec = null == summaryReportDetails.dec
                  || summaryReportDetails.dec == '' ? 0 : Number.parseFloat(summaryReportDetails.dec).toFixed(2);
                summaryReportDetails.jan = null == summaryReportDetails.jan
                  || summaryReportDetails.jan == '' ? 0 : Number.parseFloat(summaryReportDetails.jan).toFixed(2);
                summaryReportDetails.feb = null == summaryReportDetails.feb
                  || summaryReportDetails.feb == '' ? 0 : Number.parseFloat(summaryReportDetails.feb).toFixed(2);
                summaryReportDetails.mar = null == summaryReportDetails.mar
                  || summaryReportDetails.mar == '' ? 0 : Number.parseFloat(summaryReportDetails.mar).toFixed(2);

                sortedSummaryReportDetailsList.push(summaryReportDetails);
              }
            );

            console.log('Sorted Summary Report = ' + JSON.stringify(sortedSummaryReportDetailsList));
            summaryReportDetailsList = sortedSummaryReportDetailsList;

            this.databaseProvider.initializeSqlLiteDb().then((db: SQLiteObject) => {

              db.executeSql('SELECT data from metadata where configname=?',
                [ConstantsProvider.CONFIG_NM_SUMM_RPT_DATA])
                .then(
                  res => {
                    if (res.rows.length > 0) {
                      this.updateSummaryReportDetailsFromApi(summaryReportDetailsList);
                    } else {
                      db.executeSql('INSERT INTO metadata(configname, data) VALUES(?,?)',
                        [ConstantsProvider.CONFIG_NM_SUMM_RPT_DATA, JSON.stringify(summaryReportDetailsList)])
                        .then(res => {
                          console.log('Inserted summaryReportDetailsList Record');
                          this.updateLastUpdatedTs();
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

  updateLastUpdatedTs() {

    console.log('updateLastUpdatedTs() SummaryReportPage');

    this.databaseProvider.initializeSqlLiteDb().then((db: SQLiteObject) => {
      let updatedTs = new Date().toISOString();
      this.tillDate = updatedTs;
      db.executeSql('UPDATE metadata set data=? WHERE configname=?', [updatedTs,
        ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS_SUMM_RPT])
        .then(
          res => {
            console.log('Updated Last Updated Ts OF Summary Report');
            this.updateSummaryReportsDataFromDB();
            this.isDataSynching = false;
          }
        )
        .catch(e => {
          console.log(JSON.stringify(e))
        })
    })
      .catch(e => {
        console.log(JSON.stringify(e))
      });
  }

  updateSummaryReportDetailsFromApi(summaryReportDetailsList: any[]) {

    console.log('updateSummaryReportDetailsFromApi SummaryReportPage');

    this.databaseProvider.initializeSqlLiteDb().then((db: SQLiteObject) => {
      db.executeSql('UPDATE metadata set data=? WHERE configname=?', [JSON.stringify(summaryReportDetailsList),
      ConstantsProvider.CONFIG_NM_SUMM_RPT_DATA])
        .then(
          res => {
            console.log('Updated Summary Report Data');

            db.executeSql('SELECT data from metadata where configname=?',
              [ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS_SUMM_RPT])
              .then(
                res => {
                  if (res.rows.length > 0) {
                    this.updateLastUpdatedTs();
                  } else {
                    db.executeSql('INSERT INTO metadata(configname, data) VALUES(?,?)',
                      [ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS_SUMM_RPT, new Date().toISOString()])
                      .then(res => {
                        console.log('Inserted Summary Report Last Updated Ts Record');
                        this.updateSummaryReportsDataFromDB();
                        this.isDataSynching = false;
                      })
                      .catch(e => {
                        console.log(JSON.stringify(e))
                        this.isDataSynching = false;
                      });
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
      });
  }

  sortByCust() {
    console.log('sortByCust() SummaryReportsPage');

    let custFilterModal: Modal = this.modal.create('CustFilterModalPage', {
      summaryReportList: this.summaryReportList
    });

    custFilterModal.present();

    custFilterModal.onDidDismiss(
      (custFilterModalData) => {
        console.log('custFilterModalData = ' + JSON.stringify(custFilterModalData));

        if (custFilterModalData.isAdded) {
          console.log('summaryReportList = ' + JSON.stringify(custFilterModalData.summaryReportList));
          this.summaryReportList = custFilterModalData.summaryReportList;
        }
      });
  }

  sortBySalesEmp() {
    console.log('sortBySalesEmp() SummaryReportsPage')

    let saleEmpFilterModal: Modal = this.modal.create('SaleempFilterModalPage', {
      summaryReportList: this.summaryReportList
    });

    saleEmpFilterModal.present();

    saleEmpFilterModal.onDidDismiss(
      (saleEmpFilterModalData) => {
        console.log('saleEmpFilterModalData = ' + JSON.stringify(saleEmpFilterModalData));

        if (saleEmpFilterModalData.isAdded) {
          console.log('summaryReportList = ' + JSON.stringify(saleEmpFilterModalData.summaryReportList));
          this.summaryReportList = saleEmpFilterModalData.summaryReportList;
        }
      });
  }

  sortByBrand() {
    console.log('sortByBrand() SummaryReportsPage')


    let brandFilterModal: Modal = this.modal.create('BrandFilterModalPage', {
      summaryReportList: this.summaryReportList
    });

    brandFilterModal.present();

    brandFilterModal.onDidDismiss(
      (brandFilterModalData) => {
        console.log('brandFilterModalData = ' + JSON.stringify(brandFilterModalData));

        if (brandFilterModalData.isAdded) {
          console.log('summaryReportList = ' + JSON.stringify(brandFilterModalData.summaryReportList));
          this.summaryReportList = brandFilterModalData.summaryReportList;
        }
      });
  }

  clearFilters() {
    console.log('clearFilters CustFilterModalPage');

    this.summaryReportList = this.originalSummaryReportList;
    this.summaryReportList = this.commonUtility.resetSummaryReportDisplayData(this.summaryReportList);

    this.dispJan = true;
    this.dispFeb = true;
    this.dispMar = true;
    this.dispApr = true;
    this.dispMay = true;
    this.dispJun = true;
    this.dispJul = true;
    this.dispAug = true;
    this.dispSep = true;
    this.dispOct = true;
    this.dispNov = true;
    this.dispDec = true;
  }

  applyMonthFilters() {

    console.log('applyMonthFilters CustFilterModalPage');


    let monthFilterModal: Modal = this.modal.create('MonthFilterModalPage');

    monthFilterModal.present();

    monthFilterModal.onDidDismiss(
      (monthFilterModalData) => {
        console.log('monthFilterModalData = ' + JSON.stringify(monthFilterModalData));

        if (monthFilterModalData.isAdded) {
          console.log('monthFilterModalData = ' + JSON.stringify(monthFilterModalData));
          this.dispJan = monthFilterModalData.dispJan;
          this.dispFeb = monthFilterModalData.dispFeb;
          this.dispMar = monthFilterModalData.dispMar;
          this.dispApr = monthFilterModalData.dispApr;
          this.dispMay = monthFilterModalData.dispMay;
          this.dispJun = monthFilterModalData.dispJun;
          this.dispJul = monthFilterModalData.dispJul;
          this.dispAug = monthFilterModalData.dispAug;
          this.dispSep = monthFilterModalData.dispSep;
          this.dispOct = monthFilterModalData.dispOct;
          this.dispNov = monthFilterModalData.dispNov;
          this.dispDec = monthFilterModalData.dispDec;
        }
      });
  }
}
