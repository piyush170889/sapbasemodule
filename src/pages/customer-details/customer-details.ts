import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, PopoverController, Modal, ModalController } from 'ionic-angular';
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
import { ModalLedgerOptionsPage } from '../modal-ledger-options/modal-ledger-options';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

/**
 * Generated class for the CustomerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any;

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
  customerBalance: number = 0;
  totalDebitBalance: number = 0;
  totalCreditBalance: number = 0;
  currDate: any = new Date().toISOString();
  agingReportList: any[] = [];
  agingPeriod: any = '';
  datePeriod: any = '';


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private commonUtility: CommonUtilityProvider,
    private view: ViewController,
    private restService: RestserviceProvider,
    private popOverController: PopoverController,
    private alertCtrl: AlertController,
    public file: File,
    public fileOpener: FileOpener,
    private socialSharing: SocialSharing,
    private modalController: ModalController) {


    this.customer = this.navParams.get('customer');
    this.isModalData = this.navParams.get('isModalData') == undefined || this.navParams.get('isModalData') == null || this.navParams.get('isModalData') == '' ? false : this.navParams.get('isModalData');

    console.log('customer = ' + JSON.stringify(this.customer) + '\n Till Date = ' + this.tillDate);

    this.originalCustomerBalance = Number.parseFloat(this.customer.customerDetails.balance);
    console.log('Original Customer Balance = ' + this.originalCustomerBalance);

    this.customerAllInvoicesList = this.customer.customerInvoicesList;
    this.originalCustomerAllInvoicesList = this.customer.customerInvoicesList;

    this.setCustomerBalanceAndDueDateInDays();
    this.updateLedgerList();

    // let customerAllInvoicesApiEndpoint = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_CUST_DTLS
    //   + ConstantsProvider.URL_SEPARATOR + this.customer.customerDetails.cardCode
    //   + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_CUST_ALL_INVOICES
    //   + '?till-date=' + this.tillDate;

    // this.restService.getDetails(customerAllInvoicesApiEndpoint)
    //   .subscribe(
    //     (response) => {
    //       console.log('Customer ALl Invoices = ' + JSON.stringify(response.response));

    //       this.customerAllInvoicesList = response.response;
    //       this.originalCustomerAllInvoicesList = response.response;

    //       this.setCustomerBalanceAndDueDateInDays();
    //       this.updateLedgerList();
    //     }
    //   );

  }

  setCustomerBalanceAndDueDateInDays() {

    this.customerBalance = 0;
    // let todaysDate: Date = new Date();

    this.customerAllInvoicesList.forEach(
      (invoice: any) => {

        if (invoice.type == 'IN' || invoice.type == 'OB' || invoice.type == 'JE') {
          console.log('invoice.grossTotal = ' + invoice.grossTotal);
          this.customerBalance = this.customerBalance + Number.parseFloat(invoice.grossTotal);
        }
        // this.commonUtility.calculateDiff(new Date(invoice.invoiceDate), todaysDate)
      });
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

    // this.updateLedgerList();
    console.log('Ledger Invoice Final List = ' + JSON.stringify(this.ledgerInvoiceList));

    this.createLedgerPdfAndShare();
  }

  updateLedgerList() {

    this.totalCreditBalance = 0;
    this.totalDebitBalance = 0;

    let sortedList: any[] = [];
    this.totalLedgerInvoiceBalance = 0;

    this.originalCustomerAllInvoicesList.forEach(
      (invoice: any) => {

        if (invoice.invoiceDate >= '2019-04-01') {
          console.log("Pass: " + JSON.stringify('Invoice no = ' + invoice.invoiceNo));
          sortedList.push(invoice);
          this.totalDebitBalance = this.totalDebitBalance + Number.parseFloat(invoice.debit);
          this.totalCreditBalance = this.totalCreditBalance + Number.parseFloat(invoice.credit);
        }
      });

    this.ledgerInvoiceList = [];
    this.ledgerInvoiceList = sortedList;
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

    // body.push(['Post. Date', 'Trans.', 'Source', 'Debit', 'Credit.', 'Cumulative Balance', 'Balance']);
    body.push(['Post. Date', 'Trans.', 'Ref2', 'Source', 'Debit', 'Credit']);

    this.ledgerInvoiceList.forEach(
      (ledgerInvoice) => {

        body.push([
          new DatePipe(ConstantsProvider.APP_DATE_LOCALE).transform(ledgerInvoice.invoiceDate, 'dd MMM yyyy'),
          ledgerInvoice.transId, ledgerInvoice.ref2, ledgerInvoice.type,
          ledgerInvoice.debit == 0 ? '' : ledgerInvoice.debit,
          ledgerInvoice.credit == 0 ? '' : ledgerInvoice.credit]);
        // ledgerInvoice.cumulativeBalance, ledgerInvoice.grossTotal]);
      }
    );

    body.push(['', '', '', { text: 'Total', bold: true }, { text: this.totalDebitBalance, bold: true }, { text: this.totalCreditBalance, bold: true }]);
    body.push(['', '', '', { text: 'Total Due Balance', bold: true }, { text: (this.totalDebitBalance - this.totalCreditBalance), colSpan: 2, bold: true }]);

    let docDefinition = this.commonUtility.getDocDefination('Ledger Report', '01 Apr 19 - 31 Mar 20',
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
          // this.shareLedger();

          let modal: Modal = this.modalController.create(ModalLedgerOptionsPage);
          modal.present();

          modal.onDidDismiss(
            (data) => {
              if (data.isAdded) {
                console.log('selected option = ' + data.optionSelected);
                this.updateLedgerList();

                if (data.optionSelected == 'Share') {
                  this.shareLedger();
                } else if (data.optionSelected == 'Print') {
                  this.downloadLedgerReport();
                }
              } else
                console.log('Nothing Selected');
            }
          )
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

          if (selectedAgingPeriod == 0) {
            this.customerAllInvoicesList = this.originalCustomerAllInvoicesList;
          } else {

            let dateToCompare: Date = new Date(this.tillDate);
            console.log('Active Date = ' + dateToCompare.toISOString() + ', selectedAgingPeriod = ' + selectedAgingPeriod);

            dateToCompare.setDate(dateToCompare.getDate() - selectedAgingPeriod);
            console.log('Date Back by selectedAGingPeriod Days = ' + dateToCompare.toISOString());

            let dateToCompareFormatted: any = new DatePipe(ConstantsProvider.APP_DATE_LOCALE).transform(dateToCompare.toISOString(), 'yyyy-MM-dd');
            console.log('dateToCompareFormatted = ' + dateToCompareFormatted);

            let sortedList: any[] = [];

            this.originalCustomerAllInvoicesList.forEach(
              (invoice: any) => {

                if (invoice.invoiceDate < dateToCompareFormatted) {
                  sortedList.push(invoice);

                  // if (invoice.type == 'IN' || invoice.type == 'OB')
                  //   customerBalance = customerBalance + Number.parseFloat(invoice.grossTotal);

                  // console.log("Pass: " + 'Invoice no = ' + invoice.invoiceNo +
                  //   ', Amount = ' + invoice.grossTotal);
                }
              });

            this.customerAllInvoicesList = sortedList;
          }

          // this.customer.customerDetails.balance = customerBalance;
          // console.log('Customer Updated balance = ' + customerBalance);

          this.setCustomerBalanceAndDueDateInDays();
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

      body.push(['Date', 'Type', 'Invoice No.', 'Amount', 'Due Date', 'Overdue By Days']);

      this.totalInvoiceBalance = 0;
      let todaysDate: Date = new Date();

      this.customerAllInvoicesList.forEach(
        (invoice) => {
          if ((invoice.type == 'JE' || invoice.type == 'IN' || invoice.type == 'OB')) {

            let goAhead: boolean = true;

            if (invoice.type == 'IN' && invoice.isPaid != 'O')
              goAhead = false;

            if (goAhead) {
              body.push([
                new DatePipe(ConstantsProvider.APP_DATE_LOCALE).transform(invoice.invoiceDate, ConstantsProvider.REPORTS_DATE_FORMAT),
                invoice.type,
                invoice.invoiceNo,
                invoice.grossTotal,
                new DatePipe(ConstantsProvider.APP_DATE_LOCALE).transform(invoice.dueDate, ConstantsProvider.REPORTS_DATE_FORMAT),
                // (invoice.dueDateInDays + '').indexOf("-") > -1 ? (invoice.dueDateInDays + '').replace("-", "") : '-' + invoice.dueDateInDays,
                this.commonUtility.calculateDiffInDays(new Date(invoice.invoiceDate), todaysDate)
              ]);
            }

            this.totalInvoiceBalance = this.totalInvoiceBalance + Number.parseFloat(invoice.grossTotal);
          }
        }
      );

      body.push(['', '', 'Total', this.totalInvoiceBalance, '', '']);

      let agingPeriod = '>' + this.displayCriteria;
      let datePeriod = new DatePipe(ConstantsProvider.APP_DATE_LOCALE).transform(this.tillDate, ConstantsProvider.REPORTS_DATE_FORMAT)
        + ' | ' + agingPeriod;

      let docDefinition = this.commonUtility.getDocDefination('Overdue Report', datePeriod,
        '', this.customer.customerDetails.cardName, body);

      console.log('Creating PDF');
      this.pdfObj = pdfMake.createPdf(docDefinition);
      console.log('Created PDF');

      console.log('Downloading PDF');
      this.downloadPdf('JBSOverdueReport_' + this.customer.customerDetails.cardName + '.pdf');
      console.log('Downloaded PDF');
    } else {
      this.commonUtility.presentToast('No Aging Records Found', 5000);
    }
  }

  downloadLedgerReport() {

    console.log('downloadReport InvoiceListingPage');
    // this.updateLedgerList();

    var page = document.getElementById('pdfDivLedger');
    cordova.plugins.printer.print(page, 'Ledger_Report.pdf');
  }

  downloadAgingReport() {

    this.totalInvoiceBalance = 0;
    let todaysDate: Date = new Date();
    this.agingReportList = [];

    let i = 1;
    this.customerAllInvoicesList.forEach(
      (invoice) => {
        console.log('i = ' + i);
        i++;
        if ((invoice.type == 'JE' || invoice.type == 'IN' || invoice.type == 'OB')) {

          let goAhead: boolean = true;

          if (invoice.type == 'IN' && invoice.isPaid != 'O')
            goAhead = false;

          if (goAhead) {
            this.agingReportList.push({
              invoiceDate: new DatePipe(ConstantsProvider.APP_DATE_LOCALE).transform(invoice.invoiceDate, ConstantsProvider.REPORTS_DATE_FORMAT),
              type: invoice.type,
              invoiceNo: invoice.invoiceNo,
              grossTotal: invoice.grossTotal,
              dueDate: new DatePipe(ConstantsProvider.APP_DATE_LOCALE).transform(invoice.dueDate, ConstantsProvider.REPORTS_DATE_FORMAT),
              overduedays: this.commonUtility.calculateDiffInDays(new Date(invoice.invoiceDate), todaysDate)
            });
          }

          this.totalInvoiceBalance = this.totalInvoiceBalance + Number.parseFloat(invoice.grossTotal);
        }
      }
    );

    console.log('final i = ' + i);

    this.agingReportList.push({
      invoiceDate: '', type: '', invoiceNo: 'Total', grossTotal: this.totalInvoiceBalance,
      dueDate: '', overduedays: ''
    });

    this.agingPeriod = '>' + this.displayCriteria;
    this.datePeriod = new DatePipe(ConstantsProvider.APP_DATE_LOCALE).transform(this.tillDate, ConstantsProvider.REPORTS_DATE_FORMAT)
      + ' | ' + this.agingPeriod;

    console.log('agingReportList = ' + JSON.stringify(this.agingReportList));

    setTimeout(() => {
      var page = document.getElementById('pdfDivAging');
      cordova.plugins.printer.print(page, 'Overdue_Report.pdf');
    }, 2000);
  }

}
