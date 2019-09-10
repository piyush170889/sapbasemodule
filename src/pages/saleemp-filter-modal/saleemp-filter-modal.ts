import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';

/**
 * Generated class for the SaleempFilterModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saleemp-filter-modal',
  templateUrl: 'saleemp-filter-modal.html',
})
export class SaleempFilterModalPage {

  summaryReportSaleEmpList: string[] = [];
  selectedSaleEmpList: string[] = [];
  summaryReportList: any[] = [];

  constructor(
    public navParams: NavParams,
    private view: ViewController,
    private commonUtility: CommonUtilityProvider
  ) {
    this.summaryReportList = this.navParams.get('summaryReportList');

    this.summaryReportList.forEach(
      (summaryReport: any) => {
        if (this.summaryReportSaleEmpList.indexOf(summaryReport.salesEmpName) == -1) {
          this.summaryReportSaleEmpList.push(summaryReport.salesEmpName);
        }
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaleempFilterModalPage');
  }

  updateSummaryReportCheckStatus(summaryReportSaleEmp) {
    console.log('updateSummaryReportCheckStatus SaleEmpFilterModalPage');

    if (this.selectedSaleEmpList.indexOf(summaryReportSaleEmp) == -1)
      this.selectedSaleEmpList.push(summaryReportSaleEmp);
  }

  removeSelected(selected: string) {

    console.log('removeSelected SaleEmpFilterModalPage, selected = ' + selected);
    this.selectedSaleEmpList.splice(this.selectedSaleEmpList.indexOf(selected), 1);
  }

  dismissModal() {

    this.view.dismiss({
      isAdded: false
    });
  }

  applyFilters() {

    console.log('applyFilters CustFilterModalPage');

    if (this.selectedSaleEmpList.length > 0) {
      let sortedSummaryReportList: any[] = [];

      this.summaryReportList.forEach(
        (summaryReport: any) => {
          if (this.selectedSaleEmpList.indexOf(summaryReport.salesEmpName) > -1) {
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
