import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

/**
 * Generated class for the InvoiceDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-invoice-details',
  templateUrl: 'invoice-details.html',
})
export class InvoiceDetailsPage {

  customer: any;
  fromDate: string;
  invoice: any = {};
  pdfObj = null;
  pdf: any;
  totalTax: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public file: File,
    public fileOpener: FileOpener,
    public socialSharing: SocialSharing) {

    this.customer = this.navParams.get('customer');
    this.fromDate = this.navParams.get('fromDate');
    this.invoice = this.navParams.get('invoice');

    this.totalTax = Number.parseFloat(this.invoice.invoiceItemsList[0].cgstTax)
      + Number.parseFloat(this.invoice.invoiceItemsList[0].sgstTax);
      console.log('total Tax: ' + this.totalTax);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceDetailsPage');
  }

  downloadReport() {

    console.log('downloadReport InvoiceDetailsPage');

    var page = document.getElementById('pdfDiv');
    cordova.plugins.printer.print(page, 'Aging_Report.pdf');
  }

  isNull(term: any) {

    return term == null ? '' : term;
  }

  createPdfAndShare() {
    alert('Creating PDF And Sharing');

    let sellerAddress = 'JAGTAP BUILDING SOLUTIONS \n Asthavinayak Soc, Opp Bharat Jyoti Stop,'
      + '\n Bibwewadi , Pune - 411037 ' + '\n Tel No. : (O) 24216162, 9822610611 \n Phone no. : 02024216162 ' +
      ' \n Pin code : 411037 \n GSTIN : 27AFJPJ8271L1ZV \n E-Mail : jagtapbsolutions@gmail.com';

    let buyerAddress: string = 'Buyer \n ' + this.customer.customerDetails.cardName + '\n ' + this.isNull(this.invoice.invoiceItemsList[0].partyCity) +
      '\n GSTIN/UIN : ' + this.isNull(this.invoice.invoiceItemsList[0].partyGstinNo)
      + '\n State Name: ' + this.isNull(this.invoice.invoiceItemsList[0].stateName)
      + '\n Code: ' + this.isNull(this.invoice.invoiceItemsList[0].stateCode)
      + '\n Place of supply : ' + this.isNull(this.invoice.invoiceItemsList[0].stateCode)
      + '\n Email : ' + '\n Contact : ';


    let bodyContent: any[] = [];
    let i: number = 1;

    bodyContent.push(['Sr No.', 'Description Of Goods', 'HSN/SAC', 'Quantity', 'Rate', 'Per', 'Disc%', 'Amount']);
    this.invoice.invoiceItemsList.forEach(
      (invoiceItem) => {
        bodyContent.push([i, this.isNull(invoiceItem.itemName), invoiceItem.hsnSac, invoiceItem.qty, invoiceItem.ratePerBag,
          'bags', '', invoiceItem.total]);
        ++i;
      });
    bodyContent.push(['', 'CGST@' + this.invoice.invoiceItemsList[0].cgst + '%', '', '', '', '%', '', this.invoice.invoiceItemsList[0].cgstTax]);
    bodyContent.push(['', 'SGST@' + this.invoice.invoiceItemsList[0].sgst + '%', '', '', '', '%', '', this.invoice.invoiceItemsList[0].sgstTax]);
    bodyContent.push(['', 'Round Off', '', '', '', '%', '', this.invoice.invoiceItemsList[0].roundDif]);
    bodyContent.push(['', 'Total', '', this.invoice.invoiceItemsList[0].qty, '', '', '', this.invoice.grossTotal]);

    // let bodyContent: any[] = getTestBodyContent();

    console.log('bodyContent = ' + JSON.stringify(bodyContent));

    var docDefinition = {
      content: [
        { text: 'TAX INVOICE', style: 'header' },
        {
          table: {
            body: [
              [sellerAddress,
                {
                  table: {
                    body: [
                      ['Invoice No. \n ' + this.invoice.invoiceNo, 'Dates \n ' + new DatePipe('en-US').transform(this.invoice.invoiceDate, 'dd MMM yy')],
                      ['Delivery Note \n ', 'Mode/Payment Terms \n ' + (this.invoice.dueDateInDays + '').replace('-', '')],
                      ['Suppliers Ref \n ' + this.invoice.invoiceNo, 'Other References \n '],
                      ['Buyers Order No. \n ', 'Dated \n ']
                    ]
                  }
                }],
              [buyerAddress, {
                table: {
                  body: [
                    ['Despatch Doc No. \n ', 'Delivery Note Date \n '],
                    ['Despatch Through \n ', 'Destinations \n '],
                    [{ text: 'Terms Of Payment \n ', colSpan: 2 }]
                  ]
                }
              }],
              [
                {
                  colSpan: 2,
                  table: {
                    body: bodyContent,
                  }
                }
              ],
              [
                { colSpan: 2, text: 'Amount Chargable (In Words) \n ' }
              ]
            ]
          }
        },
        {

          table: {
            body: [
              ['HSN/SAC', 'Taxable Value', {
                table: {
                  body: [
                    [{ text: 'Central Tax', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}],
                    [{ text: 'Rate', style: 'tableHeader', alignment: 'center' }, { text: 'Amount', style: 'tableHeader', alignment: 'center' }]
                  ]
                }
              }, {
                  table: {
                    body: [
                      [{ text: 'State Tax', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}],
                      [{ text: 'Rate', style: 'tableHeader', alignment: 'center' }, { text: 'Amount', style: 'tableHeader', alignment: 'center' }]
                    ]
                  }
                },
                {
                  text: 'Total Tax'
                }
              ],
              [this.invoice.invoiceItemsList[0].hsnSac, this.invoice.invoiceItemsList[0].total, {
                table: {
                  body: [
                    [{ text: this.invoice.invoiceItemsList[0].cgst + '%', style: 'tableHeader', alignment: 'center' }, { text: this.invoice.invoiceItemsList[0].cgstTax, style: 'tableHeader', alignment: 'center' }]
                  ]
                }
              }, {
                table: {
                  body: [
                    [{ text: this.invoice.invoiceItemsList[0].sgst + '%', style: 'tableHeader', alignment: 'center' },
                    { text: this.invoice.invoiceItemsList[0].sgstTax, style: 'tableHeader', alignment: 'center' }]
                  ]
                }
              },
              {
                text: (Number.parseFloat(this.invoice.invoiceItemsList[0].cgstTax) + Number.parseFloat(this.invoice.invoiceItemsList[0].sgstTax))
              }
              ],
              ['Total', this.invoice.invoiceItemsList[0].total, {
                table: {
                  body: [
                    [{ text: '', style: 'tableHeader', alignment: 'center' }, { text: this.invoice.invoiceItemsList[0].cgstTax, style: 'tableHeader', alignment: 'center' }]
                  ]
                }
              }, {
                  table: {
                    body: [
                      [{ text: '', style: 'tableHeader', alignment: 'center' }, { text: this.invoice.invoiceItemsList[0].sgstTax, style: 'tableHeader', alignment: 'center' }]
                    ]
                  }
                },
                {
                  text: Number.parseFloat(this.invoice.invoiceItemsList[0].cgstTax) + Number.parseFloat(this.invoice.invoiceItemsList[0].sgstTax)
                }
              ],
              [{ colSpan: 5, text: 'Tax Amount (In Words) \n ' }]
            ]
          }
        },
        {

          table: {
            body: [
              [{ text: 'Company PAN: AFJPJ8271L \n Declaration: \n We Declare That The Invoice shows the actual price of the goods described and that all particulars are true and correct', colSpan: 3 }, {}, {},
              { text: 'Company LBT No. :  \n for JAGTAP BUILDING SOLUTIONS \n\n\n\n Auhtorised Signatory', colSpan: 2 }, {}]
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }

    console.log('Creating PDF');
    this.pdfObj = pdfMake.createPdf(docDefinition);

    console.log('Created PDF');
    this.downloadPdf();
  }


  downloadPdf() {
    this.pdfObj.getBuffer((buffer) => {
      var blob = new Blob([buffer], { type: 'application/pdf' });

      // Save the PDF to the data Directory of our App
      this.file.writeFile(this.file.dataDirectory, 'JBSInvoice_' + this.customer.customerDetails.cardName + '.pdf', blob, { replace: true }).then(fileEntry => {
        // Open the PDf with the correct OS tools
        // this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        this.pdf = this.file.dataDirectory + 'JBSInvoice_' + this.customer.customerDetails.cardName + '.pdf';

        this.share();
      })
    });
  }

  share() {
    //alert('Sharing Message');

    this.socialSharing.share("", "", this.pdf, null).then(() => {
      alert('Successfully Shared The File');
    }).catch((e) => {
      alert('Error : ' + JSON.stringify(e));
    });
  }

  getTestBodyContent() {

    return [
      ['Sr No.', 'Description Of Goods', 'HSN/SAC', 'Quantity', 'Rate', 'Per', 'Disc%', 'Amount'],
      ['1', 'Test Item', '258794', '100', '276.25', 'bags', '0%', '27625'],
      ['2', 'Test Item', '258794', '100', '276.25', 'bags', '0%', '27625'],
      ['', 'CGST@14%', '', '', '', '%', '', '27625'],
      ['', 'SGST@14%', '', '', '', '%', '', '27625'],
      ['', 'Round Off', '', '', '', '%', '', '-0.01'],
      ['', 'Total', '', '200', '', '', '', '56420'],
    ]
  }
}
