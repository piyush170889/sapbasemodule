import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { ConstantsProvider } from '../../providers/constants/constants';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


/**
 * Generated class for the PendingInvoicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pending-invoices',
  templateUrl: 'pending-invoices.html',
})
export class PendingInvoicesPage {

  fromDate: any;
  toDate: any;
  customer: any;
  pendingInvoicesList: any[] = [];
  pdfObj = null;
  pdf: any;
  openingBalance: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restService: RestserviceProvider,
    private commonUtility: CommonUtilityProvider,
    public file: File,
    public fileOpener: FileOpener,
    public socialSharing: SocialSharing) {

    this.fromDate = this.navParams.get('fromDate');
    this.toDate = this.navParams.get('toDate');
    this.customer = this.navParams.get('customer');

    let pendingInvoicesApiEndpoint: string = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_CUST_DTLS
      + ConstantsProvider.URL_SEPARATOR + this.customer.customerDetails.cardCode
      + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_PENDING_INVOICES
      + '?from-date=' + this.fromDate + '&to-date=' + this.toDate;

    this.restService.getDetails(pendingInvoicesApiEndpoint)
      .subscribe(
        (response) => {
          console.log('Pending Invoices = ' + JSON.stringify(response.response));

          this.pendingInvoicesList = response.response;

          let indexToSplice = null;

          this.pendingInvoicesList.forEach(
            (pendingInvoice) => {
              if (undefined != pendingInvoice.ob && pendingInvoice.ob != null && pendingInvoice.ob > 0) {
                this.openingBalance = Number.parseFloat(pendingInvoice.ob);
                indexToSplice = this.pendingInvoicesList.indexOf(pendingInvoice);
              }
            });

          console.log('indexToSplice = ' + indexToSplice);
          if (null != indexToSplice)
            this.pendingInvoicesList.splice(indexToSplice, 1);
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingInvoicesPage');
  }

  showInvoiceDetails(invoice: any) {
    console.log('showInvoiceDetails');
  }

  createPendingInvoicesPDFAndShare() {

    console.log('createPendingInvoicesPDFAndShare PendingInvoicesPage');

    let body: any[] = [];

    body.push(['Date', 'Ref No.', 'Credit Days', 'Billing Overdue Days', 'Opening Amt.',
      'Pending Amt.', 'Due On', 'Overdue By Days']);

    let openingAmountTotal: number = 0;
    let pendingAmountTotal: number = 0;

    body.push(['', '', '', 'Opening Balance', this.openingBalance, '', '', '']);
    this.pendingInvoicesList.forEach(
      (pendingInvoice) => {
        body.push([new DatePipe('en-US').transform(pendingInvoice.invDate, 'dd-MMM-yyyy'),
        pendingInvoice.refNo, pendingInvoice.dueDateOrCreditDays, pendingInvoice.overDueForBilling,
        pendingInvoice.openingAmount, pendingInvoice.pendingAmount,
        new DatePipe('en-US').transform(pendingInvoice.dueOn, 'dd-MMM-yyyy'), pendingInvoice.overDueDays]);

        openingAmountTotal = openingAmountTotal + Number.parseFloat(pendingInvoice.openingAmount);
        pendingAmountTotal = pendingAmountTotal + Number.parseFloat(pendingInvoice.pendingAmount);
      }
    );

    body.push(['', '', '', '', openingAmountTotal, pendingAmountTotal,
      '', '']);


    let docDefinition = this.commonUtility.getDocDefinationPendingInvoices('Pending Invoices Report',
      new DatePipe('en-US').transform(this.fromDate, 'dd-MMM-yyyy') + ' To '
      + new DatePipe('en-US').transform(this.toDate, 'dd-MMM-yyyy'), '',
      this.customer.customerDetails.cardName, body, pendingAmountTotal);

    this.pdfObj = pdfMake.createPdf(docDefinition);

    this.downloadPdf('JBSPendingInvoicesReport_' + this.customer.customerDetails.cardName + '.pdf');
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

  callCust(custContactNumber: any) {

    console.log('Calling Customer on : ' + custContactNumber);
    this.commonUtility.callNumber(custContactNumber, true);
  }

}
