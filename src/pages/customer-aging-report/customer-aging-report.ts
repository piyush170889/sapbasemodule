import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController } from 'ionic-angular';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { ConstantsProvider } from '../../providers/constants/constants';
import { InvoicesListingPage } from '../invoices-listing/invoices-listing';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { CustomerDetailsPage } from '../customer-details/customer-details';
import { CallNumber } from '@ionic-native/call-number';

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
    private restService: RestserviceProvider,
    private commonUtility: CommonUtilityProvider,
    private modal: ModalController,
    private callNumberNative: CallNumber) {

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

  viewBills(noOfDays: string) {

    console.log('viewBills CustomerAgingReportPage');

    let agingAmount: number = 0;
    switch (noOfDays) {

      case '-30':
        console.log('Here in ' + noOfDays);
        agingAmount = this.agingReportDetails.firstQ;
        break;

      case '-60':
        agingAmount = this.agingReportDetails.secondQ
        break;

      case '-90':
        agingAmount = this.agingReportDetails.thirdQ
        break;

      case '-120':
        agingAmount = this.agingReportDetails.fourthQ
        break;

      case '-365':
        agingAmount = this.agingReportDetails.otherQ
        break;

    }

    console.log('fromDate = ' + this.fromDate + ', noOfDays = ' + noOfDays + ", agingAmount = " + agingAmount);

    this.navCtrl.push(InvoicesListingPage, {
      customer: this.customer,
      fromDate: this.fromDate,
      noOfDays: noOfDays,
      agingAmount: agingAmount
    })

  }


  callCust() {

    console.log('Calling Customer on : ' + this.customer.customerDetails.cellular);
    this.commonUtility.callNumber(this.customer.customerDetails.cellular, true);
  }

  viewCustInfo() {

    let customerDetailsModal: Modal = this.modal.create(CustomerDetailsPage, {
      customer: this.customer,
      isModalData: true
    });

    customerDetailsModal.present();
  }
}
