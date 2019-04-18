import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Popover } from 'ionic-angular';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { InvoiceDetailsPage } from '../invoice-details/invoice-details';
import { ConstantsProvider } from '../../providers/constants/constants';
import { PopoverController } from 'ionic-angular';
import { InvoiceListingSettingsPopoverPage } from '../invoice-listing-settings-popover/invoice-listing-settings-popover';

/**
 * Generated class for the InvoicesListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-invoices-listing',
  templateUrl: 'invoices-listing.html',
})
export class InvoicesListingPage {

  fromDate: string = '';
  customer: any = {};
  noOfDays: string = '0';
  invoicesListing: any[] = [];
  currentDate: any = new Date().toISOString();
  ledgerBalanceList: any[] = [];
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restService: RestserviceProvider,
    private popOverController: PopoverController) {

    this.customer = this.navParams.get('customer');
    this.fromDate = this.navParams.get('fromDate');
    this.noOfDays = this.navParams.get('noOfDays');

    let invoiceListingApiEndpoint: string = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_CUST_DTLS
      + ConstantsProvider.URL_SEPARATOR + this.customer.customerDetails.cardCode
      + ConstantsProvider.URL_SEPARATOR + "invoices?due-date=" + this.fromDate + "&no-of-days=" + this.noOfDays;

    console.log('invoiceListingApiEndpoint = ' + invoiceListingApiEndpoint);

    this.restService.getDetails(invoiceListingApiEndpoint)
      .subscribe(
        (response) => {
          this.invoicesListing = response.response;
          console.log('Response = ' + JSON.stringify(this.invoicesListing));
        }
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicesListingPage');
  }

  showInvoiceDetails(invoice) {

    console.log('showInvoiceDetails InvoiceListingPage');

    this.navCtrl.push(InvoiceDetailsPage, {
      customer: this.customer,
      fromDate: this.fromDate,
      invoice: invoice
    });
  }

  presentPopover(event: any) {

    const popOver = this.popOverController.create(InvoiceListingSettingsPopoverPage, {
      customer: this.customer
    });
    popOver.present();

    popOver.onDidDismiss(
      (data) => {
        if  (data && data.showLedger) {
          let ledgerBalanceApiEndpoint = ConstantsProvider.API_BASE_URL + 
          this.restService.getDetails(ledgerBalanceApiEndpoint)
          this.downloadLedgerReport();
        }
      }
    )
  }

  downloadLedgerReport() {
    console.log('downloadReport InvoiceListingPage');

    var page = document.getElementById('pdfDivLedger');
    cordova.plugins.printer.print(page, 'Ledger_Report.pdf');
  }

  downloadAgingReport() {
    console.log('downloadAgingReport InvoiceListingPage');

    var page = document.getElementById('pdfDivAging');
    cordova.plugins.printer.print(page, 'Aging_Report.pdf');
  }
}
