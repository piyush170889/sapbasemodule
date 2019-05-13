import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { AgingReportFiltersPage } from '../aging-report-filters/aging-report-filters';
import { OrderMgmtPage } from '../order-mgmt/order-mgmt';
import { DatePipe } from '@angular/common';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { ConstantsProvider } from '../../providers/constants/constants';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { PendingInvoicesFilterPage } from '../pending-invoices-filter/pending-invoices-filter';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

/**
 * Generated class for the CustomerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-details',
  templateUrl: 'customer-details.html',
})
export class CustomerDetailsPage {

  customer: any;
  date: any;
  time: any;
  isModalData: boolean = false;
  ledgerInvoiceList: any[] = [];
  ledgerOpeningBalance: number = 0;
  totalLedgerInvoiceBalance: number = 0;
  pdfObj = null;
  pdf: any;
  customerAllInvoicesList: any[] = [];
  originalCustomerAllInvoicesList: any[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private commonUtility: CommonUtilityProvider,
    private view: ViewController,
    private restService: RestserviceProvider,
    private alertCtrl: AlertController,
    public file: File,
    public fileOpener: FileOpener,
    public socialSharing: SocialSharing) {

    this.customer = this.navParams.get('customer');
    this.isModalData = this.navParams.get('isModalData') == undefined || this.navParams.get('isModalData') == null || this.navParams.get('isModalData') == '' ? false : this.navParams.get('isModalData');

    console.log('customer = ' + JSON.stringify(this.customer));
    this.date = new DatePipe('en-US').transform(new Date(), 'ddMMyy');
    this.time = new DatePipe('en-US').transform(new Date(), 'HHmmss');

    let customerAllInvoicesApiEndpoint = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_CUST_DTLS
      + ConstantsProvider.URL_SEPARATOR + this.customer.customerDetails.cardCode
      + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_CUST_ALL_INVOICES
      + '?till-date=' + new DatePipe(ConstantsProvider.LOCALE_US).transform(new Date().toISOString(), 'yyyy-MM-dd');

    this.restService.getDetails(customerAllInvoicesApiEndpoint)
      .subscribe(
        (response) => {
          console.log('Customer ALl Invoices = ' + JSON.stringify(response.response));

          this.customerAllInvoicesList = response.response;
          this.originalCustomerAllInvoicesList = response.response;
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDetailsPage');
  }

  dismissModal() {
    const modalData = {
      isAdded: false
    };
    this.view.dismiss(modalData);
  }

  showAgingReport() {

    console.log('showAgingReport CustomerDetailsPage');

    if (this.commonUtility.isNetworkAvailable()) {
      this.navCtrl.push(AgingReportFiltersPage, {
        customer: this.customer
      });
    }
  }

  showOrders() {

    console.log('showOrders CustomerDetailsPage');
    // this.commonUtility.presentToast('Not Yet Implemented', 5000);
    this.navCtrl.push(OrderMgmtPage, {
      customer: this.customer
    });
  }

  callCust(custContactNumber: any) {

    console.log('Calling Customer on : ' + custContactNumber);
    this.commonUtility.callNumber(custContactNumber, true);
  }

  shareLedger() {
    let ledgerBalanceApiEndpoint = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_CUST_DTLS
      + ConstantsProvider.URL_SEPARATOR + this.customer.customerDetails.cardCode
      + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_LEDGER_REPORT_NEW;

    console.log('ledgerBalanceApiEndpoint = ' + ledgerBalanceApiEndpoint);

    this.restService.getDetails(ledgerBalanceApiEndpoint)
      .subscribe(
        (response) => {
          console.log('Response = ' + JSON.stringify(response.response));

          this.ledgerInvoiceList = response.response;

          this.ledgerInvoiceList.forEach(
            (ledgerInvoice) => {

              // console.log('Ledger Invoice Type = ' + ledgerInvoice.type);

              // if (ledgerInvoice.type == 'OB') {
              //   this.ledgerOpeningBalance = ledgerInvoice.grossTotal;
              // }

              // this.totalLedgerInvoiceBalance = this.totalLedgerInvoiceBalance
              //   + Number.parseFloat(ledgerInvoice.grossTotal);
              this.totalLedgerInvoiceBalance = this.totalLedgerInvoiceBalance
                + Number.parseFloat(ledgerInvoice.balance);
            }
          );

          console.log('Ledger Invoice Final List = ' + JSON.stringify(this.ledgerInvoiceList));

          this.showLedgerShareOptions();
        }
      );
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
    body.push(['Post. Date', 'Trans.', 'Source', 'Credit.', 'Debit', 'Cumulative Balance', 'Balance']);
    // body.push(['', '', 'Opening Balance', '', this.ledgerOpeningBalance]);

    this.ledgerInvoiceList.forEach(
      (ledgerInvoice) => {
        // if (ledgerInvoice.type != 'OB') {
        //   body.push([new DatePipe('en-US').transform(ledgerInvoice.invoiceDate),
        //   new DatePipe('en-US').transform(ledgerInvoice.dueDate), ledgerInvoice.type,
        //   ledgerInvoice.invoiceNo == '0' ? '' : ledgerInvoice.invoiceNo,
        //   // ledgerInvoice.invoiceNo == '0' ? '' : ledgerInvoice.invoiceNo , ledgerInvoice.isPaid == 'O' ? 'Open' : 'Close',
        //   ledgerInvoice.grossTotal]);
        // }
        body.push([
          new DatePipe(ConstantsProvider.LOCALE_US).transform(ledgerInvoice.postingDate, 'dd MMM yyyy'),
          ledgerInvoice.transId, ledgerInvoice.origin,
          ledgerInvoice.credit == 0 ? '' : ledgerInvoice.credit,
          ledgerInvoice.debit == 0 ? '' : ledgerInvoice.debit,
          ledgerInvoice.cumulativeBalance, ledgerInvoice.balance]);
      }
    );

    // body.push(['', '', '', '', 'Total', this.totalLedgerInvoiceBalance]);
    body.push(['', '', '', '', '', 'Total', this.totalLedgerInvoiceBalance]);

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

    this.socialSharing.share("", "", this.pdf, null).then(() => {
      // alert('Successfully Shared The File');
    }).catch((e) => {
      alert('Error : ' + JSON.stringify(e));
    });
  }

  showPendingInvoicesFilter() {

    console.log('showPendingInvoicesFilter CustomerDetails');

    this.navCtrl.push(PendingInvoicesFilterPage, {
      customer: this.customer
    });
  }
}
