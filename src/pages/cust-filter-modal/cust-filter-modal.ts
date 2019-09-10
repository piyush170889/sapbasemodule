import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';

/**
 * Generated class for the CustFilterModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cust-filter-modal',
  templateUrl: 'cust-filter-modal.html',
})
export class CustFilterModalPage {

  summaryReportCustList: string[] = [];
  selectedCustList: string[] = [];
  summaryReportList: any[] = [];

  constructor(
    public navParams: NavParams,
    private view: ViewController,
    private commonUtility: CommonUtilityProvider
  ) {
    this.summaryReportList = this.navParams.get('summaryReportList');

    this.summaryReportList.forEach(
      (summaryReport: any) => {
        if (this.summaryReportCustList.indexOf(summaryReport.cardName) == -1) {
          this.summaryReportCustList.push(summaryReport.cardName);
        }
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustFilterModalPage');
  }

  updateSummaryReportCheckStatus(summaryReportCust) {
    console.log('updateSummaryReportCheckStatus CustFilterModalPage');

    if (this.selectedCustList.indexOf(summaryReportCust) == -1)
      this.selectedCustList.push(summaryReportCust);
  }

  removeSelectedCust(selectedCust: string) {

    console.log('removeSelectedCust CustFilterModalPage, selectedCust = ' + selectedCust);
    this.selectedCustList.splice(this.selectedCustList.indexOf(selectedCust), 1);
  }

  dismissModal() {

    this.view.dismiss({
      isAdded: false
    });
  }

  applyFilters() {

    console.log('applyFilters CustFilterModalPage');

    if (this.selectedCustList.length > 0) {
      let sortedSummaryReportList: any[] = [];

      this.summaryReportList.forEach(
        (summaryReport: any) => {
          if (this.selectedCustList.indexOf(summaryReport.cardName) > -1) {
            sortedSummaryReportList.push(summaryReport);
          }
        }
      );

      this.view.dismiss({
        isAdded: true,
        summaryReportList: sortedSummaryReportList
      });
    } else {
      this.commonUtility.presentErrorToast('Please select valid values');
    }
  }

}
