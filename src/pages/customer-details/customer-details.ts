import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, PopoverController } from 'ionic-angular';
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
import { InvoiceDetailsPage } from '../invoice-details/invoice-details';
import { InvoiceListingSettingsPopoverPage } from '../invoice-listing-settings-popover/invoice-listing-settings-popover';
import { AgingFilterPopoverPage } from '../aging-filter-popover/aging-filter-popover';
import { PopoverSortFiltersPage } from '../popover-sort-filters/popover-sort-filters';

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
  isModalData: boolean = false;
  ledgerInvoiceList: any[] = [];
  ledgerOpeningBalance: number = 0;
  totalLedgerInvoiceBalance: number = 0;
  pdfObj = null;
  pdf: any;
  customerAllInvoicesList: any[] = [];
  originalCustomerAllInvoicesList: any[] = [];
  tillDate: any = new DatePipe(ConstantsProvider.APP_DATE_LOCALE).transform(new Date().toISOString(), 'yyyy-MM-dd');
  displayCriteria: any = '0';
  totalInvoiceBalance: number = 0;
  originalCustomerBalance: number = 0;
  currentSortOrder: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private commonUtility: CommonUtilityProvider,
    private view: ViewController,
    private restService: RestserviceProvider,
    private popOverController: PopoverController,
    private alertCtrl: AlertController,
    public file: File,
    public fileOpener: FileOpener,
    public socialSharing: SocialSharing) {

    this.customer = this.navParams.get('customer');
    this.isModalData = this.navParams.get('isModalData') == undefined || this.navParams.get('isModalData') == null || this.navParams.get('isModalData') == '' ? false : this.navParams.get('isModalData');

    console.log('customer = ' + JSON.stringify(this.customer) + '\n Till Date = ' + this.tillDate);

    this.originalCustomerBalance = Number.parseFloat(this.customer.customerDetails.balance);
    console.log('Original Customer Balance = ' + this.originalCustomerBalance);


    let customerAllInvoicesApiEndpoint = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_CUST_DTLS
      + ConstantsProvider.URL_SEPARATOR + this.customer.customerDetails.cardCode
      + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_CUST_ALL_INVOICES
      + '?till-date=' + this.tillDate;

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
    // let ledgerBalanceApiEndpoint = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_CUST_DTLS
    //   + ConstantsProvider.URL_SEPARATOR + this.customer.customerDetails.cardCode
    //   + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_LEDGER_REPORT_NEW;

    // console.log('ledgerBalanceApiEndpoint = ' + ledgerBalanceApiEndpoint);

    // this.restService.getDetails(ledgerBalanceApiEndpoint)
    //   .subscribe(
    //     (response) => {
    //       console.log('Response = ' + JSON.stringify(response.response));

    //       this.ledgerInvoiceList = response.response;

    //       this.ledgerInvoiceList.forEach(
    //         (ledgerInvoice) => {
    //           this.totalLedgerInvoiceBalance = this.totalLedgerInvoiceBalance
    //             + Number.parseFloat(ledgerInvoice.balance);
    //         }
    //       );

    //       console.log('Ledger Invoice Final List = ' + JSON.stringify(this.ledgerInvoiceList));

    //       this.showLedgerShareOptions();
    //     }
    //   );

    let sortedList: any[] = [];
    this.totalLedgerInvoiceBalance = 0;

    this.originalCustomerAllInvoicesList.forEach(
      (invoice: any) => {

        if (invoice.invoiceDate >= '2019-04-01') {
          console.log("Pass: " + JSON.stringify('Invoice no = ' + invoice.invoiceNo));
          sortedList.push(invoice);
          this.totalLedgerInvoiceBalance = this.totalLedgerInvoiceBalance
            + Number.parseFloat(invoice.grossTotal);
        }
      });

    this.ledgerInvoiceList = [];
    this.ledgerInvoiceList = sortedList;

    console.log('Ledger Invoice Final List = ' + JSON.stringify(this.ledgerInvoiceList));

    this.createLedgerPdfAndShare();
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
          new DatePipe(ConstantsProvider.APP_DATE_LOCALE).transform(ledgerInvoice.invoiceDate, 'dd MMM yyyy'),
          ledgerInvoice.transId, ledgerInvoice.type,
          ledgerInvoice.credit == 0 ? '' : ledgerInvoice.credit,
          ledgerInvoice.debit == 0 ? '' : ledgerInvoice.debit,
          ledgerInvoice.cumulativeBalance, ledgerInvoice.grossTotal]);
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


  showInvoiceDetails(invoice) {

    console.log('showInvoiceDetails InvoiceListingPage');
    console.log('invoice.invoiceItemsList = ' + invoice.invoiceItemsList);

    if (invoice.type == 'IN') {
      this.navCtrl.push(InvoiceDetailsPage, {
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

  presentPopover(event: any) {

    const popOver = this.popOverController.create(InvoiceListingSettingsPopoverPage, {
      customer: this.customer
    });
    popOver.present({
      ev: event
    });

    popOver.onDidDismiss(
      (data) => {
        if (data && data.showLedger) {
          this.shareLedger();
        }
      }
    );
  }

  presentPopoverAging(event: any) {

    const popOver = this.popOverController.create(AgingFilterPopoverPage, {
      agingperiod: this.displayCriteria
    });
    popOver.present({
      ev: event
    });

    popOver.onDidDismiss(
      (data) => {
        if (data && data.showAging) {
          let selectedAgingPeriod: number = Number.parseInt(data.agingPeriod);
          let customerBalance: number = 0;

          let dateToCompare: Date = new Date(this.tillDate);
          console.log('Active Date = ' + dateToCompare.toISOString() + ', selectedAgingPeriod = ' + selectedAgingPeriod);
          dateToCompare.setDate(dateToCompare.getDate() - selectedAgingPeriod);
          console.log('Date Back by selectedAGingPeriod Days = ' + dateToCompare.toISOString());

          let dateToCompareFormatted: any = new DatePipe(ConstantsProvider.APP_DATE_LOCALE).transform(dateToCompare.toISOString(), 'yyyy-MM-dd');
          console.log('dateToCompareFormatted = ' + dateToCompareFormatted);

          if (selectedAgingPeriod == 0) {
            this.customerAllInvoicesList = this.originalCustomerAllInvoicesList;
            console.log('Original Cust balance = ' + this.originalCustomerBalance);
            customerBalance = this.originalCustomerBalance;
          } else {
            let sortedList: any[] = [];

            this.originalCustomerAllInvoicesList.forEach(
              (invoice: any) => {

                if (invoice.invoiceDate < dateToCompareFormatted) {
                  console.log("Pass: " + JSON.stringify('Invoice no = ' + invoice.invoiceNo));
                  sortedList.push(invoice);
                  customerBalance = customerBalance + Number.parseFloat(invoice.grossTotal);
                }
              });

            this.customerAllInvoicesList = sortedList;
          }

          this.customer.customerDetails.balance = customerBalance;
          console.log('Customer Updated balance = ' + customerBalance);

          this.displayCriteria = selectedAgingPeriod;
        }
      }
    );
  }

  presentPopoverDataSorting(event: any) {

    const popOver = this.popOverController.create(PopoverSortFiltersPage, {
      sortOrder: this.currentSortOrder
    });

    popOver.present({
      ev: event
    });

    popOver.onDidDismiss(
      (data) => {
        if (data && data.sortData) {
          let selectedSortOrder: number = Number.parseInt(data.sortOrder);
          console.log('selectedSortOrder = ' + selectedSortOrder);

          switch (selectedSortOrder) {

            // 1 = Amount (Low - High)
            case 1:
              this.customerAllInvoicesList.sort(
                (a, b) => a.grossTotal <= b.grossTotal ? -1 : 1
              );
              this.currentSortOrder = selectedSortOrder;
              break;

            // 2 = Amount (High - Low) 
            case 2:
              this.customerAllInvoicesList.sort(
                (a, b) => a.grossTotal >= b.grossTotal ? -1 : 1
              );
              this.currentSortOrder = selectedSortOrder;
              break;

            // 3 = Due Days (Low - High)
            case 3:
              this.customerAllInvoicesList.sort(
                (a, b) => a.dueDateInDays <= b.dueDateInDays ? -1 : 1
              );
              this.currentSortOrder = selectedSortOrder;
              break;

            // 4 = Due Days (High - Low)
            case 4:
              this.customerAllInvoicesList.sort(
                (a, b) => a.dueDateInDays >= b.dueDateInDays ? -1 : 1
              );
              this.currentSortOrder = selectedSortOrder;
              break;

            default:
              break;
          }
        }
      });
  }

  createAgingPDFAndShare() {

    if (null != this.customerAllInvoicesList && this.customerAllInvoicesList.length > 0) {
      console.log('shareAgingReport InvoiceListingPage');

      let body: any[] = [];

      body.push(['Date', 'Type', 'Due Date', 'Invoice No.', 'Overdue By Days', 'Amount']);

      this.totalInvoiceBalance = 0;
      this.customerAllInvoicesList.forEach(
        (invoice) => {
          if (invoice.grossTotal != 0) {
            body.push([
              new DatePipe(ConstantsProvider.APP_DATE_LOCALE).transform(invoice.invoiceDate, ConstantsProvider.REPORTS_DATE_FORMAT),
              invoice.type,
              new DatePipe(ConstantsProvider.APP_DATE_LOCALE).transform(invoice.dueDate, ConstantsProvider.REPORTS_DATE_FORMAT),
              invoice.invoiceNo,
              (invoice.dueDateInDays + '').indexOf("-") > -1 ? (invoice.dueDateInDays + '').replace("-", "") : '-' + invoice.dueDateInDays,
              invoice.grossTotal]);

            this.totalInvoiceBalance = this.totalInvoiceBalance + Number.parseFloat(invoice.grossTotal);
          }
        }
      );

      body.push(['', '', '', '', 'Total', this.totalInvoiceBalance]);

      let agingPeriod = '>' + this.displayCriteria;
      let datePeriod = new DatePipe(ConstantsProvider.APP_DATE_LOCALE).transform(this.tillDate, ConstantsProvider.REPORTS_DATE_FORMAT)
        + ' | ' + agingPeriod;

      let docDefinition = this.commonUtility.getDocDefination('Aging Report', datePeriod,
        '', this.customer.customerDetails.cardName, body);

      this.pdfObj = pdfMake.createPdf(docDefinition);

      this.downloadPdf('JBSAgingReport_' + this.customer.customerDetails.cardName + '.pdf');
    } else {
      this.commonUtility.presentToast('No Aging Records Found', 5000);
    }
  }
}
