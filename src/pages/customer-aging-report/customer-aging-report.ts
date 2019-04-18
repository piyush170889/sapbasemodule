import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { ConstantsProvider } from '../../providers/constants/constants';
import { InvoicesListingPage } from '../invoices-listing/invoices-listing';

/**
 * Generated class for the CustomerAgingReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-customer-aging-report',
  templateUrl: 'customer-aging-report.html',
})
export class CustomerAgingReportPage {

  customer: any;
  currentDate: string;
  // agingReportList: any[] = [];
  agingReportDetails: any = {};
  fromDate: string;
  // noOfDays: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private restService: RestserviceProvider) {

    this.customer = this.navParams.get('customer');
    this.fromDate = this.navParams.get('fromDate');

    // this.currentDate = new DatePipe('en-Us').transform(new Date().toISOString(), 'dd-MMM-yyy hh:mm a');
    // console.log('Current Date = ' + this.currentDate);

    let agingReportApiEndpoint: string = ConstantsProvider.API_BASE_URL
      + ConstantsProvider.API_ENDPOINT_CUST_DTLS + ConstantsProvider.URL_SEPARATOR
      + this.customer.customerDetails.cardCode + ConstantsProvider.URL_SEPARATOR
      + ConstantsProvider.API_ENDPOINT_AGING_REPORT + "?from-date=" + this.fromDate;

    console.log('agingReport = ' + agingReportApiEndpoint);

    this.restService.getDetails(agingReportApiEndpoint)
      .subscribe(
        (response) => {

          console.log('Response = ' + JSON.stringify(response.response));
          // this.agingReportList = response.response;
          this.agingReportDetails = response.response;
        }
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerAgingReportPage');
  }

  downloadReport() {

    console.log('downloadPdf');

    var page = document.getElementById('pdfDiv');
    cordova.plugins.printer.print(page, 'Aging_Report.pdf');
  }

  viewBills(noOfDays: number) {

    console.log('viewBills CustomerAgingReportPage');

    this.navCtrl.push(InvoicesListingPage, {
      customer: this.customer,
      fromDate: this.fromDate,
      noOfDays: noOfDays
    })

  }
}
