import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import HashMap from 'HashMap';

/**
 * Generated class for the BrandFilterModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-brand-filter-modal',
  templateUrl: 'brand-filter-modal.html',
})
export class BrandFilterModalPage {

  summaryReportList: any[] = [];
  summaryReportBrandsList: any[] = [];
  selectedBrandsList: any[] = [];

  constructor(
    public navParams: NavParams,
    private view: ViewController,
    private commonUtility: CommonUtilityProvider
  ) {
    this.summaryReportList = this.navParams.get('summaryReportList');

    this.summaryReportList.forEach(
      (summaryReport: any) => {
        if (this.summaryReportBrandsList.indexOf(summaryReport.brand) == -1) {
          this.summaryReportBrandsList.push(summaryReport.brand);
        }
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrandFilterModalPage');
  }

  updateSummaryReportCheckStatus(summaryReportBrand) {

    console.log('updateSummaryReportCheckStatus BrandFilterModalPage');

    if (this.selectedBrandsList.indexOf(summaryReportBrand) == -1)
      this.selectedBrandsList.push(summaryReportBrand);
  }

  removeSelected(selected: string) {

    console.log('removeSelected BrandFilterModalPage, selected = ' + selected);
    this.selectedBrandsList.splice(this.selectedBrandsList.indexOf(selected), 1);
  }

  dismissModal() {

    this.view.dismiss({
      isAdded: false
    });
  }

  applyFilters() {

    console.log('applyFilters CustFilterModalPage');

    if (this.selectedBrandsList.length > 0) {
      let sortedSummaryReportList: any[] = [];

      var custSummHashMap = new HashMap();
      custSummHashMap.set('TestKey', 'TestVal');

      console.log('key = TestKey, Value = ' + custSummHashMap.get('TestKey'));

      //Reset The Summary Report List
      this.summaryReportList = this.commonUtility.resetSummaryReportDisplayData(this.summaryReportList);

      this.summaryReportList.forEach(
        (summaryReport: any) => {
          if (this.selectedBrandsList.indexOf(summaryReport.brand) > -1) {
            // sortedSummaryReportList.push(summaryReport);

            let cardName: string = summaryReport.cardName;

            let sumarryReportRecord: any;

            if (custSummHashMap.has(cardName)) {
              sumarryReportRecord = custSummHashMap.get(cardName);

              sumarryReportRecord.displayBrand = sumarryReportRecord.displayBrand + ', ' + summaryReport.brand;
              sumarryReportRecord.displayApr = Number.parseFloat(sumarryReportRecord.displayApr == null || sumarryReportRecord.displayApr == '' || sumarryReportRecord.displayApr == undefined ? "0" : sumarryReportRecord.displayApr) + Number.parseFloat(summaryReport.apr == null || summaryReport.apr == '' ? "0" : summaryReport.apr);
              sumarryReportRecord.displayMay = Number.parseFloat(sumarryReportRecord.displayMay == null || sumarryReportRecord.displayMay == '' || sumarryReportRecord.displayMay == undefined ? "0" : sumarryReportRecord.displayMay) + Number.parseFloat(summaryReport.may == null || summaryReport.may == '' ? "0" : summaryReport.may);
              sumarryReportRecord.displayJun = Number.parseFloat(sumarryReportRecord.displayJun == null || sumarryReportRecord.displayJun == '' || sumarryReportRecord.displayJun == undefined ? "0" : sumarryReportRecord.displayJun) + Number.parseFloat(summaryReport.jun == null || summaryReport.jun == '' ? "0" : summaryReport.jun);
              sumarryReportRecord.displayJul = Number.parseFloat(sumarryReportRecord.displayJul == null || sumarryReportRecord.displayJul == '' || sumarryReportRecord.displayJul == undefined ? "0" : sumarryReportRecord.displayJul) + Number.parseFloat(summaryReport.jul == null || summaryReport.jul == '' ? "0" : summaryReport.jul);
              sumarryReportRecord.displayAug = Number.parseFloat(sumarryReportRecord.displayAug == null || sumarryReportRecord.displayAug == '' || sumarryReportRecord.displayAug == undefined ? "0" : sumarryReportRecord.displayAug) + Number.parseFloat(summaryReport.aug == null || summaryReport.aug == '' ? "0" : summaryReport.aug);
              sumarryReportRecord.displaySep = Number.parseFloat(sumarryReportRecord.displaySep == null || sumarryReportRecord.displaySep == '' || sumarryReportRecord.displaySep == undefined ? "0" : sumarryReportRecord.displaySep) + Number.parseFloat(summaryReport.sep == null || summaryReport.sep == '' ? "0" : summaryReport.sep);
              sumarryReportRecord.displayOct = Number.parseFloat(sumarryReportRecord.displayOct == null || sumarryReportRecord.displayOct == '' || sumarryReportRecord.displayOct == undefined ? "0" : sumarryReportRecord.displayOct) + Number.parseFloat(summaryReport.oct == null || summaryReport.oct == '' ? "0" : summaryReport.oct);
              sumarryReportRecord.displayNov = Number.parseFloat(sumarryReportRecord.displayNov == null || sumarryReportRecord.displayNov == '' || sumarryReportRecord.displayNov == undefined ? "0" : sumarryReportRecord.displayNov) + Number.parseFloat(summaryReport.nov == null || summaryReport.nov == '' ? "0" : summaryReport.nov);
              sumarryReportRecord.displayDec = Number.parseFloat(sumarryReportRecord.displayDec == null || sumarryReportRecord.displayDec == '' || sumarryReportRecord.displayDec == undefined ? "0" : sumarryReportRecord.displayDec) + Number.parseFloat(summaryReport.dec == null || summaryReport.dec == '' ? "0" : summaryReport.dec);
              sumarryReportRecord.displayJan = Number.parseFloat(sumarryReportRecord.displayJan == null || sumarryReportRecord.displayJan == '' || sumarryReportRecord.displayJan == undefined ? "0" : sumarryReportRecord.displayJan) + Number.parseFloat(summaryReport.jan == null || summaryReport.jan == '' ? "0" : summaryReport.jan);
              sumarryReportRecord.displayFeb = Number.parseFloat(sumarryReportRecord.displayFeb == null || sumarryReportRecord.displayFeb == '' || sumarryReportRecord.displayFeb == undefined ? "0" : sumarryReportRecord.displayFeb) + Number.parseFloat(summaryReport.feb == null || summaryReport.feb == '' ? "0" : summaryReport.feb);
              sumarryReportRecord.displayMar = Number.parseFloat(sumarryReportRecord.displayMar == null || sumarryReportRecord.displayMar == '' || sumarryReportRecord.displayMar == undefined ? "0" : sumarryReportRecord.displayMar) + Number.parseFloat(summaryReport.mar == null || summaryReport.mar == '' ? "0" : summaryReport.mar);

              custSummHashMap.delete(cardName);
            } else {
              sumarryReportRecord = summaryReport;
            }

            custSummHashMap.set(cardName, sumarryReportRecord);
          }
        }
      );

      custSummHashMap.forEach(
        function (value, key) {
          console.log('Key = ' + key + ', Value = ' + JSON.stringify(value));
          sortedSummaryReportList.push(value);
        });

      this.view.dismiss({
        isAdded: true,
        summaryReportList: sortedSummaryReportList
      });
    } else {
      this.commonUtility.presentErrorToast('Please select valid values');
    }
  }
}
