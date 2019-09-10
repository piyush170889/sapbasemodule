import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Modal, ModalController } from 'ionic-angular';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import * as moment from 'moment-timezone';
import { ConstantsProvider } from '../../providers/constants/constants';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { SocialSharing } from '@ionic-native/social-sharing';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


declare var cordova: any;
pdfMake.vfs = pdfFonts.pdfMake.vfs;

/**
 * Generated class for the LedgerListingDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ledger-listing-details',
  templateUrl: 'ledger-listing-details.html',
})
export class LedgerListingDetailsPage {

  momentjs: any = moment;

  totalLedgerBalanceDue: number = 0;
  ledgerInvoiceList: any[] = [];
  originalLedgerInvoiceList: any[] = [];
  customer: any = {
    customerDetails: {}
  };
  totalDebitBalance: number = 0;
  totalCreditBalance: number = 0;
  fromDate: string = '2019-04-01';
  tillDate: string = '2020-03-31';
  currDate: string = new Date().toISOString();
  imgPath: string = '';
  currentSortOrder: number = 0;
  pdfObj = null;
  pdf: any;


  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    public commonUtility: CommonUtilityProvider,
    public file: File,
    public fileOpener: FileOpener,
    private socialSharing: SocialSharing,
    private alertCtrl: AlertController,
    private modalController: ModalController) {

    this.imgPath = cordova.file.applicationDirectory + 'www/' + ConstantsProvider.CONFIG_DS_IMG_PATH;
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LedgerListingDetailsPage');

    // this.ledgerInvoiceList = this.navParams.get('ledgerInvoiceList');
    // this.originalLedgerInvoiceList = this.navParams.get('ledgerInvoiceList');
    // console.log('this.originalLedgerInvoiceList = ' + JSON.stringify(this.originalLedgerInvoiceList));

    // this.customer = this.navParams.get('customer');

    // this.updateLedgerList();
  }

  ionViewDidEnter() {

    this.ledgerInvoiceList = this.navParams.get('ledgerInvoiceList');
    this.originalLedgerInvoiceList = this.navParams.get('ledgerInvoiceList');

    this.customer = this.navParams.get('customer');

    this.updateLedgerList();
  }

  updateLedgerList() {

    this.totalCreditBalance = 0;
    this.totalDebitBalance = 0;

    let sortedList: any[] = [];

    if (null != this.originalLedgerInvoiceList && this.originalLedgerInvoiceList.length > 0) {
      this.originalLedgerInvoiceList.forEach(
        (invoice: any) => {

          let formattedInvoiceDate = this.momentjs(invoice.invoiceDate).format('YYYY-MM-DD');
          console.log('Invoice no = ' + invoice.invoiceNo + ', invoiceDate = ' + formattedInvoiceDate
            + ', fromDate = ' + this.fromDate + ', tillDate = ' + this.tillDate);

          if (formattedInvoiceDate >= this.fromDate && formattedInvoiceDate <= this.tillDate) {

            console.log("Pass: " + JSON.stringify('Invoice no = ' + invoice.invoiceNo) + ", grossTotal = " + invoice.grossTotal);

            sortedList.push(invoice);
            this.totalDebitBalance = this.totalDebitBalance + Number.parseFloat(invoice.debit);
            this.totalCreditBalance = this.totalCreditBalance + Number.parseFloat(invoice.credit);
          }
        });
    }

    this.ledgerInvoiceList = [];
    this.ledgerInvoiceList = sortedList;
    this.totalLedgerBalanceDue = Number.parseFloat((this.totalDebitBalance - this.totalCreditBalance).toFixed(2));
  }


  downloadLedgerReport() {

    console.log('downloadLedgerReport InvoiceListingPage');

    this.updateLedgerList();

    setTimeout(
      () => {
        var page = document.getElementById('pdfDivLedger');
        cordova.plugins.printer.print(page, 'Ledger_Report.pdf');
      }, 2000
    );
  }


  createLedgerPdfAndShare() {
    // alert('Creating Ledger PDF And Sharing');

    this.updateLedgerList();

    let body: any[] = [];

    body.push(['Post. Date', 'Trans.', 'Source', 'Debit', 'Credit']);
    // body.push(['Post. Date', 'Trans.', 'Ref2', 'Source', 'Debit', 'Credit']);

    this.ledgerInvoiceList.forEach(
      (ledgerInvoice) => {

        let transId = ledgerInvoice.invoiceNo;

        if (ledgerInvoice.type == 'RC')
          transId = ledgerInvoice.originNo;
        else if (ledgerInvoice.type == 'OB')
          transId = ledgerInvoice.transId;

        body.push([
          this.momentjs(
            ledgerInvoice.invoiceDate).format('DD MMM YYYY'),
          transId,
          // ledgerInvoice.ref2,
          ledgerInvoice.type,
          ledgerInvoice.debit == 0 ? '' : ledgerInvoice.debit,
          ledgerInvoice.credit == 0 ? '' : ledgerInvoice.credit]);
        // ledgerInvoice.cumulativeBalance, ledgerInvoice.grossTotal]);
      }
    );

    // body.push(['', '', '', { text: 'Total', bold: true }, { text: this.totalDebitBalance.toFixed(2), bold: true }, { text: this.totalCreditBalance.toFixed(2), bold: true }]);
    // body.push(['', '', '', { text: 'Total Due Balance', bold: true }, { text: (this.totalDebitBalance - this.totalCreditBalance).toFixed(2), colSpan: 2, bold: true }]);
    body.push(['', '', { text: 'Total', bold: true }, { text: this.totalDebitBalance.toFixed(2), bold: true }, { text: this.totalCreditBalance.toFixed(2), bold: true }]);
    body.push(['', '', { text: 'Total Due Balance', bold: true }, { text: (this.totalDebitBalance - this.totalCreditBalance).toFixed(2), colSpan: 2, bold: true }]);

    let docDefinition = this.commonUtility.getDocDefination('Ledger Report',
      this.momentjs(this.fromDate).format('DD MMM YYYY') + ' - ' + this.momentjs(this.tillDate).format('DD MMM YYYY'),
      '', this.customer.customerDetails.cardName, body);

    this.pdfObj = pdfMake.createPdf(docDefinition);

    this.downloadPdf('JBSLedgerReport_' + this.customer.customerDetails.cardName + '.pdf');
  }


  downloadPdf(fileName) {

    console.log('Getting Buffer');
    this.pdfObj.getBuffer((buffer) => {

      var blob = new Blob([buffer], { type: 'application/pdf' });

      // Save the PDF to the data Directory of our App
      console.log('Saving PDF, Data Directory = ' + this.file.dataDirectory + ', fileName = ' + fileName);
      this.file.writeFile(this.file.dataDirectory, fileName, blob, { replace: true }).then(fileEntry => {

        // Open the PDf with the correct OS tools
        // this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf');
        console.log('PDF Assigning');
        this.pdf = this.file.dataDirectory + fileName;

        console.log('Sharing PDF');
        this.share();
      })
        .catch(e => {
          console.log('Error = ' + JSON.stringify(e));
        })
    });
  }

  share() {
    //alert('Sharing Message');
    this.socialSharing.share("", "", this.pdf, null).then(() => {
      console.log('Shared PDF');
      // alert('Successfully Shared The File');
    }).catch((e) => {
      alert('Error : ' + JSON.stringify(e));
    });
  }


  showInvoiceDetails(invoice) {

    console.log('showInvoiceDetails CustomerDetailsPage');
    // console.log('invoice.invoiceItemsList = ' + invoice.invoiceItemsList);

    if (invoice.type == 'IN') {
      console.log('Navigating to Invoice Deatils Page')
      this.navCtrl.push('InvoiceDetailsPage', {
        customer: this.customer,
        fromDate: this.tillDate,
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

  openLedgerDateSelectionCriteria() {

    console.log('openLedgerDateSelectionCriteria Clicked');

    let ledgerDateSelectionModal: Modal = this.modalController.create('LedgerDateSelectionPage', {
      fromDate: this.fromDate,
      tillDate: this.tillDate
    });

    ledgerDateSelectionModal.present();

    ledgerDateSelectionModal.onDidDismiss(
      (ledgerDateSelectionData: any) => {

        if (ledgerDateSelectionData.isAdded) {

          this.fromDate = ledgerDateSelectionData.fromDate;
          this.tillDate = ledgerDateSelectionData.tillDate;

          this.updateLedgerList();
        }
      }
    )
  }
}
