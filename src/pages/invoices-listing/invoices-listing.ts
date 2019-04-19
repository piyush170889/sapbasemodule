import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Popover, AlertController } from 'ionic-angular';
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
  ledgerOpeningBalance: any = 0;
  ledgerClosingBalance: any = 0;
  totalLedgerInvoiceBalance: number = 0;
  totalInvoiceBalance: number = 0;
  ledgerInvoiceList: any[] = [];
  openingBalanceInvoice: any = null;
  agingAmount: any = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restService: RestserviceProvider,
    private popOverController: PopoverController,
    public alertCtrl: AlertController) {

    this.customer = this.navParams.get('customer');
    this.fromDate = this.navParams.get('fromDate');
    this.noOfDays = this.navParams.get('noOfDays');
    this.agingAmount = this.navParams.get('agingAmount');

    let invoiceListingApiEndpoint: string = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_CUST_DTLS
      + ConstantsProvider.URL_SEPARATOR + this.customer.customerDetails.cardCode
      + ConstantsProvider.URL_SEPARATOR + "invoices?due-date=" + this.fromDate + "&no-of-days=" + this.noOfDays;

    console.log('invoiceListingApiEndpoint = ' + invoiceListingApiEndpoint);

    this.restService.getDetails(invoiceListingApiEndpoint)
      .subscribe(
        (response) => {
          this.invoicesListing = response.response;
          console.log('Response = ' + JSON.stringify(this.invoicesListing));

          let indexToSplice: any = null;

          this.invoicesListing.forEach(
            (invoice) => {
              console.log('Invoice Date = ' + JSON.stringify(invoice));
              if (invoice.type != 'OB')
                this.totalInvoiceBalance = this.totalInvoiceBalance + Number.parseFloat(invoice.grossTotal);
              else {
                this.openingBalanceInvoice = invoice;
                indexToSplice = this.invoicesListing.indexOf(invoice);
              }
            }
          );

          console.log('indexToSplice = ' + indexToSplice + ', openingBalanceInvoice = '
            + JSON.stringify(this.openingBalanceInvoice) + ', totalInvoiceBalance = ' + this.totalInvoiceBalance);

          if (indexToSplice != null)
            this.invoicesListing.splice(indexToSplice, 1);
        }
      );
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
        if (data && data.showLedger) {
          let ledgerBalanceApiEndpoint = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_CUST_DTLS
            + ConstantsProvider.URL_SEPARATOR + this.customer.customerDetails.cardCode
            + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_LEDGER_REPORT

          console.log('ledgerBalanceApiEndpoint = ' + ledgerBalanceApiEndpoint);

          this.restService.getDetails(ledgerBalanceApiEndpoint)
            .subscribe(
              (response) => {
                console.log('Response = ' + JSON.stringify(response.response));

                this.ledgerInvoiceList = response.response;
                // this.ledgerInvoiceList.forEach(
                //   (ledgerInvoice) => {

                //     if (ledgerInvoice.type == 'OB')
                //       this.ledgerOpeningBalance = ledgerInvoice.grossTotal
                //   });

                let indexToSpliceLedger = null;
                this.ledgerInvoiceList.forEach(
                  (ledgerInvoice) => {

                    if (ledgerInvoice.type == 'OB') {
                      this.ledgerOpeningBalance = ledgerInvoice.grossTotal;
                      indexToSpliceLedger = this.ledgerInvoiceList.indexOf(ledgerInvoice);
                    } else {
                      this.totalLedgerInvoiceBalance = this.totalLedgerInvoiceBalance
                        + Number.parseFloat(ledgerInvoice.grossTotal);
                    }
                  }
                );

                if (indexToSpliceLedger != null)
                  this.ledgerInvoiceList.splice(indexToSpliceLedger, 1);

                this.showLedgerPrintOptions();
              }
            )
        }
      }
    )
  }

  showLedgerPrintOptions() {

    const alert = this.alertCtrl.create({
      title: 'Show Ledger',
      subTitle: 'Do you want to Print the ledger?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok clicked');

            this.downloadLedgerReport();
          }
        }
      ]
    });

    alert.present();
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

  shareAgingReport() {
    
  }
}
