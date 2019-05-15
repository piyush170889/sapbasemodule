import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Popover, AlertController, Modal, ModalController } from 'ionic-angular';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { InvoiceDetailsPage } from '../invoice-details/invoice-details';
import { ConstantsProvider } from '../../providers/constants/constants';
import { PopoverController } from 'ionic-angular';
import { InvoiceListingSettingsPopoverPage } from '../invoice-listing-settings-popover/invoice-listing-settings-popover';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';
import { CustomerDetailsPage } from '../customer-details/customer-details';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  pdfObj = null;
  pdf: any;
  shareMessage: string = '';
  shareSubject: string = '';


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restService: RestserviceProvider,
    private popOverController: PopoverController,
    public alertCtrl: AlertController,
    private commonUtility: CommonUtilityProvider,
    public file: File,
    public fileOpener: FileOpener,
    public socialSharing: SocialSharing,
    public modal: ModalController) {

    this.customer = this.navParams.get('customer');
    this.fromDate = this.navParams.get('fromDate');
    this.noOfDays = this.navParams.get('noOfDays');
    this.agingAmount = this.navParams.get('agingAmount');

    this.invoicesListing = this.navParams.get('invoicesListing');
    this.updateInvoicesDetailsFromInvoiceListing();

    // let invoiceListingApiEndpoint: string = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_CUST_DTLS
    //   + ConstantsProvider.URL_SEPARATOR + this.customer.customerDetails.cardCode
    //   + ConstantsProvider.URL_SEPARATOR + "invoices?due-date=" + this.fromDate + "&no-of-days=" + this.noOfDays;

    // console.log('invoiceListingApiEndpoint = ' + invoiceListingApiEndpoint);

    // this.restService.getDetails(invoiceListingApiEndpoint)
    //   .subscribe(
    //     (response) => {
    //       this.invoicesListing = response.response;
    //       console.log('Response = ' + JSON.stringify(this.invoicesListing));

    //       this.updateInvoicesDetailsFromInvoiceListing();
    //     }
    //   );
  }

  updateInvoicesDetailsFromInvoiceListing() {
    // let indexToSplice: any = null;

    // this.invoicesListing.forEach(
    //   (invoice) => {
    //     console.log('Invoice Date = ' + JSON.stringify(invoice));
    //     if (invoice.type != 'OB')
    //       this.totalInvoiceBalance = this.totalInvoiceBalance + Number.parseFloat(invoice.grossTotal);
    //     else {
    //       this.openingBalanceInvoice = invoice;
    //       indexToSplice = this.invoicesListing.indexOf(invoice);
    //     }
    //   }
    // );

    // console.log('indexToSplice = ' + indexToSplice + ', openingBalanceInvoice = '
    //   + JSON.stringify(this.openingBalanceInvoice) + ', totalInvoiceBalance = ' + this.totalInvoiceBalance);

    // if (indexToSplice != null)
    //   this.invoicesListing.splice(indexToSplice, 1);

    this.invoicesListing.forEach(
      (invoice) => {
        this.totalInvoiceBalance = this.totalInvoiceBalance + Number.parseFloat(invoice.grossTotal);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicesListingPage');
  }

  showInvoiceDetails(invoice) {

    console.log('showInvoiceDetails InvoiceListingPage');
    console.log('invoice.invoiceItemsList = ' + invoice.invoiceItemsList);

    if (invoice.type == 'A/R Inv') {
      this.navCtrl.push(InvoiceDetailsPage, {
        customer: this.customer,
        fromDate: this.fromDate,
        invoice: invoice
      });
    } else {
      let mssgToDisplay = 'This is an ' + invoice.type + ' type Entry and does not have any order items associated with it.';

      const alert = this.alertCtrl.create({
        title: 'General Entry',
        subTitle: mssgToDisplay,
        buttons: ['OK']
      });
      alert.present();
    }
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

                // let invoiceIdsToSpliceLedgerArr: any[] = [];
                // this.ledgerInvoiceList.forEach(
                //   (ledgerInvoice) => {

                //     console.log('Ledger Invoice Type = ' + ledgerInvoice.type);

                //     if (ledgerInvoice.type == 'OB') {
                //       this.ledgerOpeningBalance = ledgerInvoice.grossTotal;
                //       invoiceIdsToSpliceLedgerArr.push(ledgerInvoice.invoiceNo);
                //     } else if (ledgerInvoice.type == 'A/R Inv') {
                //       this.totalLedgerInvoiceBalance = this.totalLedgerInvoiceBalance
                //         + Number.parseFloat(ledgerInvoice.grossTotal);
                //     } else if (ledgerInvoice.type != 'A/R Inv') {
                //       invoiceIdsToSpliceLedgerArr.push(ledgerInvoice.invoiceNo);
                //     }
                //   }
                // );

                // console.log('invoiceIdsToSpliceLedger = ' + JSON.stringify(invoiceIdsToSpliceLedgerArr));
                // invoiceIdsToSpliceLedgerArr.forEach(
                //   (invoiceIdsToSpliceLedger) => {
                //     console.log('Splicing Invoice no = ' + invoiceIdsToSpliceLedger);
                //     if (invoiceIdsToSpliceLedger != null) {

                //       this.ledgerInvoiceList.forEach(
                //         (ledgerInvoiceInCheck) => {
                //           if (ledgerInvoiceInCheck.invoiceNo == invoiceIdsToSpliceLedger) {
                //             this.ledgerInvoiceList.splice(this.ledgerInvoiceList.indexOf(ledgerInvoiceInCheck), 1);
                //           }
                //         }
                //       );
                //     }
                //   }
                // );

                this.ledgerInvoiceList.forEach(
                  (ledgerInvoice) => {

                    console.log('Ledger Invoice Type = ' + ledgerInvoice.type);

                    if (ledgerInvoice.type == 'OB') {
                      this.ledgerOpeningBalance = ledgerInvoice.grossTotal;
                    } else {
                      this.totalLedgerInvoiceBalance = this.totalLedgerInvoiceBalance
                        + Number.parseFloat(ledgerInvoice.grossTotal);
                    }
                  }
                );

                console.log('Ledger Invoice Final List = ' + JSON.stringify(this.ledgerInvoiceList));

                this.showLedgerShareOptions();
              }
            );
        }
      }
    )
  }

  showLedgerShareOptions() {

    const alert = this.alertCtrl.create({
      title: 'Show Ledger',
      subTitle: 'Do you want to Share the ledger?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Ok clicked');

            // this.downloadLedgerReport();
            this.createLedgerPdfAndShare();
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

  createAgingPDFAndShare() {

    if (null != this.invoicesListing && this.invoicesListing.length > 0) {
      console.log('shareAgingReport InvoiceListingPage');

      let body: any[] = [];

      // body.push(['Date', 'Type', 'Invoice No.', 'Overdue By Days', 'Status', 'Amount']);
      body.push(['Date', 'Type', 'Due Date', 'Invoice No.', 'Overdue By Days', 'Amount']);

      this.invoicesListing.forEach(
        (invoice) => {
          body.push([
            new DatePipe(ConstantsProvider.APP_DATE_LOCALE).transform(invoice.invoiceDate, ConstantsProvider.REPORTS_DATE_FORMAT),
            invoice.type, invoice.dueDate, invoice.invoiceNo,
            (invoice.dueDateInDays + '').indexOf("-") > -1 ? (invoice.dueDateInDays + '').replace("-", "") : '-' + invoice.dueDateInDays,
            invoice.grossTotal]);
          // invoice.isPaid == 'O' ? 'Open' : 'Close', invoice.grossTotal]);
        }
      );

      body.push(['', '', '', '', 'Total', this.totalInvoiceBalance]);

      let agingPeriod = '';

      if (this.noOfDays != '-360') {
        agingPeriod = '>' + (Number.parseInt(this.noOfDays.replace('-', '')) - 30) + ' Days';
      } else if (this.noOfDays == '-360') {
        agingPeriod = '121+ Days';
      }

      let datePeriod = new DatePipe(ConstantsProvider.APP_DATE_LOCALE).transform(this.fromDate, ConstantsProvider.REPORTS_DATE_FORMAT)
        + ' | ' + agingPeriod;

      let docDefinition = this.commonUtility.getDocDefination('Aging Report', datePeriod,
        '', this.customer.customerDetails.cardName, body);

      this.pdfObj = pdfMake.createPdf(docDefinition);

      this.downloadPdf('JBSAgingReport_' + this.customer.customerDetails.cardName + '.pdf');
    } else {
      this.commonUtility.presentToast('No Aging Records Found', 5000);
    }
  }

  createLedgerPdfAndShare() {
    // alert('Creating Ledger PDF And Sharing');

    let body: any[] = [];

    // body.push(['Date', 'Due Date', 'Type', 'Invoice No.', 'Status', 'Balance']);
    // body.push(['', '', 'Opening Balance', '', '', this.ledgerOpeningBalance]);
    body.push(['Date', 'Due Date', 'Type', 'Invoice No.', 'Balance']);
    body.push(['', '', 'Opening Balance', '', this.ledgerOpeningBalance]);

    this.ledgerInvoiceList.forEach(
      (ledgerInvoice) => {
        if (ledgerInvoice.type != 'OB') {
          body.push([new DatePipe('en-US').transform(ledgerInvoice.invoiceDate),
          new DatePipe('en-US').transform(ledgerInvoice.dueDate), ledgerInvoice.type,
          ledgerInvoice.invoiceNo == '0' ? '' : ledgerInvoice.invoiceNo,
          // ledgerInvoice.invoiceNo == '0' ? '' : ledgerInvoice.invoiceNo , ledgerInvoice.isPaid == 'O' ? 'Open' : 'Close',
          ledgerInvoice.grossTotal]);
        }
      }
    );

    // body.push(['', '', '', '', 'Total', this.totalLedgerInvoiceBalance]);
    body.push(['', '', '', 'Total', this.totalLedgerInvoiceBalance]);

    // alert(JSON.stringify(body));

    /*    let docDefinition = this.commonUtility.getDocDefination('Ledger Report', '01 Apr 19 - 31 Mar 20',
          this.invoicesListing[0].invoiceItemsList[0].partyCity, this.customer.customerDetails.cardName, body);*/

    let docDefinition = this.commonUtility.getDocDefination('Ledger Report', '01 Apr 19 - 31 Mar 20',
      '', this.customer.customerDetails.cardName, body);

    this.pdfObj = pdfMake.createPdf(docDefinition);

    this.downloadPdf('JBSLedgerReport_' + this.customer.customerDetails.cardName + '.pdf');
  }

  downloadPdf(fileName) {

    this.pdfObj.getBuffer((buffer) => {

      var blob = new Blob([buffer], { type: 'application/pdf' });

      // Save the PDF to the data Directory of our App
      this.file.writeFile(this.file.dataDirectory, fileName, blob, { replace: true }).then(fileEntry => {

        // Open the PDf with the correct OS tools
        // this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf');
        this.pdf = this.file.dataDirectory + fileName;

        this.share();
      })
    });
  }

  share() {
    //alert('Sharing Message');

    this.socialSharing.share(this.shareMessage, this.shareSubject, this.pdf, null).then(() => {
      // alert('Successfully Shared The File');
    }).catch((e) => {
      alert('Error : ' + JSON.stringify(e));
    });
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
