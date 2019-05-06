import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, AlertController, PopoverController } from 'ionic-angular';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { ConstantsProvider } from '../../providers/constants/constants';
import { InvoicesListingPage } from '../invoices-listing/invoices-listing';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { CustomerDetailsPage } from '../customer-details/customer-details';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';
import { InvoiceListingSettingsPopoverPage } from '../invoice-listing-settings-popover/invoice-listing-settings-popover';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  ledgerOpeningBalance: any = 0;
  ledgerClosingBalance: any = 0;
  totalLedgerInvoiceBalance: number = 0;
  totalInvoiceBalance: number = 0;
  ledgerInvoiceList: any[] = [];
  openingBalanceInvoice: any = null;
  agingAmount: any = 0;
  pdfObj = null;
  pdf: any;

  firstQInvoicesList: any[] = [];
  secondQInvoicesList: any[] = [];
  thirdQInvoicesList: any[] = [];
  fourthQInvoicesList: any[] = [];
  otherQInvoicesList: any[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private popOverController: PopoverController,
    private restService: RestserviceProvider,
    private commonUtility: CommonUtilityProvider,
    private modal: ModalController,
    private alertCtrl: AlertController,
    public file: File,
    public fileOpener: FileOpener,
    public socialSharing: SocialSharing) {

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
          this.agingReportDetails = response.response.agingDetails;

          this.firstQInvoicesList = response.response.firstQInvoicesList;
          this.secondQInvoicesList = response.response.secondQInvoicesList;
          this.thirdQInvoicesList = response.response.thirdQInvoicesList;
          this.fourthQInvoicesList = response.response.fourthQInvoicesList;
          this.otherQInvoicesList = response.response.otherQInvoicesList;
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
    let invoicesListToPass: any[] = [];

    switch (noOfDays) {

      case '-30':
        console.log('Here in ' + noOfDays);
        agingAmount = this.agingReportDetails.firstQ;
        invoicesListToPass = this.firstQInvoicesList;
        break;

      case '-60':
        agingAmount = this.agingReportDetails.secondQ;
        invoicesListToPass = this.secondQInvoicesList;
        break;

      case '-90':
        agingAmount = this.agingReportDetails.thirdQ;
        invoicesListToPass = this.thirdQInvoicesList;
        break;

      case '-120':
        agingAmount = this.agingReportDetails.fourthQ;
        invoicesListToPass = this.fourthQInvoicesList;
        break;

      case '-365':
        agingAmount = this.agingReportDetails.otherQ;
        invoicesListToPass = this.otherQInvoicesList;
        break;

    }

    console.log('fromDate = ' + this.fromDate + ', noOfDays = ' + noOfDays + ", agingAmount = " + agingAmount
      + ', invoicesListToPass = ' + JSON.stringify(invoicesListToPass));

    if (invoicesListToPass.length > 0) {
      this.navCtrl.push(InvoicesListingPage, {
        customer: this.customer,
        fromDate: this.fromDate,
        noOfDays: noOfDays,
        agingAmount: agingAmount,
        invoicesListing: invoicesListToPass
      });
    } else {
      this.commonUtility.presentErrorToast('No Aging Details Present To Show');
    }

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
                    }

                    this.totalLedgerInvoiceBalance = this.totalLedgerInvoiceBalance
                      + Number.parseFloat(ledgerInvoice.grossTotal);
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

    this.socialSharing.share('', '', this.pdf, null).then(() => {
      // alert('Successfully Shared The File');
    }).catch((e) => {
      alert('Error : ' + JSON.stringify(e));
    });
  }
}
