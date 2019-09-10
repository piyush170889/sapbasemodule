import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

/**
 * Generated class for the CustomerSummaryReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-summary-report',
  templateUrl: 'customer-summary-report.html',
})
export class CustomerSummaryReportPage {

  customerDetails: any = {};
  cutomerSummaryReportDetailsList: any[] = [];

  constructor(
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerSummaryReportPage');
  }

  ionViewDidEnter() {

    console.log('ionViewDidEnter CustomerSummaryReportPage');

    this.customerDetails = this.navParams.get("customerDetails");
    this.cutomerSummaryReportDetailsList = this.navParams.get("cutomerSummaryReportDetailsList");

    console.log('customerDetails = ' + JSON.stringify(this.customerDetails) + ", \n cutomerSummaryReportDetailsList = " + JSON.stringify(this.cutomerSummaryReportDetailsList));
  }

}
