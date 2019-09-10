import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';

/**
 * Generated class for the MonthFilterModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-month-filter-modal',
  templateUrl: 'month-filter-modal.html',
})
export class MonthFilterModalPage {

  private static MONTH_JAN: string = 'January';
  private static MONTH_FEB: string = 'February';
  private static MONTH_MAR: string = 'March';
  private static MONTH_APR: string = 'April';
  private static MONTH_MAY: string = 'May';
  private static MONTH_JUN: string = 'June';
  private static MONTH_JUL: string = 'July';
  private static MONTH_AUG: string = 'August';
  private static MONTH_SEP: string = 'September';
  private static MONTH_OCT: string = 'October';
  private static MONTH_NOV: string = 'November';
  private static MONTH_DEC: string = 'December';
  dispJan: boolean = false;
  dispFeb: boolean = false;
  dispMar: boolean = false;
  dispApr: boolean = false;
  dispMay: boolean = false;
  dispJun: boolean = false;
  dispJul: boolean = false;
  dispAug: boolean = false;
  dispSep: boolean = false;
  dispOct: boolean = false;
  dispNov: boolean = false;
  dispDec: boolean = false;

  summaryReportMonthsList: any[] = [
    {
      monthName: MonthFilterModalPage.MONTH_JAN,
      value: false
    },
    {
      monthName: MonthFilterModalPage.MONTH_FEB,
      value: false
    },
    {
      monthName: MonthFilterModalPage.MONTH_MAR,
      value: false
    },
    {
      monthName: MonthFilterModalPage.MONTH_APR,
      value: false
    },
    {
      monthName: MonthFilterModalPage.MONTH_MAY,
      value: false
    },
    {
      monthName: MonthFilterModalPage.MONTH_JUN,
      value: false
    },
    {
      monthName: MonthFilterModalPage.MONTH_JUL,
      value: false
    },
    {
      monthName: MonthFilterModalPage.MONTH_AUG,
      value: false
    },
    {
      monthName: MonthFilterModalPage.MONTH_SEP,
      value: false
    },
    {
      monthName: MonthFilterModalPage.MONTH_OCT,
      value: false
    },
    {
      monthName: MonthFilterModalPage.MONTH_NOV,
      value: false
    },
    {
      monthName: MonthFilterModalPage.MONTH_DEC,
      value: false
    }
  ];
  selectedMonthsList: any[] = [];

  constructor(
    public navParams: NavParams,
    private commonUtility: CommonUtilityProvider,
    private view: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MonthFilterModalPage');
  }


  updateSummaryReportCheckStatus(summaryReportMonth) {

    summaryReportMonth.value = true;
    console.log('updateSummaryReportCheckStatus MonthFilterModalPage, summaryReportMonth = '
      + JSON.stringify(summaryReportMonth));

    if (this.selectedMonthsList.indexOf(summaryReportMonth) == -1)
      this.selectedMonthsList.push(summaryReportMonth);
  }

  removeSelected(selected) {

    console.log('removeSelected MonthFilterModalPage, selected = ' + JSON.stringify(selected));
    this.selectedMonthsList.splice(this.selectedMonthsList.indexOf(selected), 1);
  }

  dismissModal() {

    this.view.dismiss({
      isAdded: false
    });
  }

  applyFilters() {

    console.log('applyFilters CustFilterModalPage');
    console.log('this.selectedMonthsList = ' + JSON.stringify(this.selectedMonthsList));

    if (this.selectedMonthsList.length > 0) {

      this.selectedMonthsList.forEach(
        (selectedMonth: any) => {
          if (selectedMonth.monthName == MonthFilterModalPage.MONTH_JAN)
            this.dispJan = selectedMonth.value;
          if (selectedMonth.monthName == MonthFilterModalPage.MONTH_FEB)
            this.dispFeb = selectedMonth.value;
          if (selectedMonth.monthName == MonthFilterModalPage.MONTH_MAR)
            this.dispMar = selectedMonth.value;
          if (selectedMonth.monthName == MonthFilterModalPage.MONTH_APR)
            this.dispApr = selectedMonth.value;
          if (selectedMonth.monthName == MonthFilterModalPage.MONTH_MAY)
            this.dispMay = selectedMonth.value;
          if (selectedMonth.monthName == MonthFilterModalPage.MONTH_JUN)
            this.dispJun = selectedMonth.value;
          if (selectedMonth.monthName == MonthFilterModalPage.MONTH_JUL)
            this.dispJul = selectedMonth.value;
          if (selectedMonth.monthName == MonthFilterModalPage.MONTH_AUG)
            this.dispAug = selectedMonth.value;
          if (selectedMonth.monthName == MonthFilterModalPage.MONTH_SEP)
            this.dispSep = selectedMonth.value;
          if (selectedMonth.monthName == MonthFilterModalPage.MONTH_OCT)
            this.dispOct = selectedMonth.value;
          if (selectedMonth.monthName == MonthFilterModalPage.MONTH_NOV)
            this.dispNov = selectedMonth.value;
          if (selectedMonth.monthName == MonthFilterModalPage.MONTH_DEC)
            this.dispDec = selectedMonth.value;
        }
      );

      const monthFilterModalData: any = {
        isAdded: true,
        dispJan: this.dispJan,
        dispFeb: this.dispFeb,
        dispMar: this.dispMar,
        dispApr: this.dispApr,
        dispMay: this.dispMay,
        dispJun: this.dispJun,
        dispJul: this.dispJul,
        dispAug: this.dispAug,
        dispSep: this.dispSep,
        dispOct: this.dispOct,
        dispNov: this.dispNov,
        dispDec: this.dispDec
      };

      console.log('monthFilterModalData = ' + JSON.stringify(monthFilterModalData));
      this.view.dismiss(monthFilterModalData);
    } else {
      this.commonUtility.presentErrorToast('Please select valid values');
    }
  }
}
