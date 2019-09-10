import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import * as moment from 'moment-timezone';
import { ConstantsProvider } from '../../providers/constants/constants';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { DatabaseProvider } from '../../providers/database/database';


/**
 * Generated class for the SignaturepadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signaturepad',
  templateUrl: 'signaturepad.html',
})
export class SignaturepadPage {

  signature = '';
  isDrawing = false;
  momentjs: any = moment;
  customer: any = {
    customerDetails: {}
  };
  fromDate: any = '';

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  invoiceNo: string = '';
  invoice: any = {};

  private signaturePadOptions: Object = { // Check out https://github.com/szimek/signature_pad
    'minWidth': 2,
    'canvasWidth': 400,
    'canvasHeight': 500,
    'backgroundColor': '#f6fbff',
    'penColor': '#666a73'
  };

  constructor(
    private navCtrl: NavController,
    private restService: RestserviceProvider,
    private navParams: NavParams,
    private commonUtility: CommonUtilityProvider,
    private databaseProvider: DatabaseProvider
  ) {

  }

  ionViewDidEnter() {

    console.log('ionViewDidEnter SignaturePad');
    this.signaturePad.clear();

    this.invoice = this.navParams.get('invoice');
    this.invoiceNo = this.invoice.invoiceNo;
    this.customer = this.navParams.get('customer');
    this.signature = this.navParams.get('signature');
    this.fromDate = this.navParams.get('fromDate');

    console.log('Invoice No. = ' + this.invoiceNo + ', Signature = ' + this.signature);
  }

  drawComplete() {
    this.isDrawing = false;
  }

  drawStart() {
    this.isDrawing = true;
  }

  savePad() {

    let signatureToSave: any = this.signaturePad.toDataURL();
    console.log('Signature to Save = ' + signatureToSave);

    if (!this.commonUtility.isNetworkPresent()) {

      let invoiceAcknowledgementOfflineData: any = {
        invoiceNo: this.invoice.invoiceNo,
        signature: signatureToSave,
        invoice: this.invoice
      }

      this.databaseProvider.getItem(ConstantsProvider.CONFIG_NM_ACK_INV_OFFLINE)
        .then(
          (res) => {

            let acknowledgementInvList: any[] = [];

            if (res.rows.length > 0)
              acknowledgementInvList = JSON.parse(res.rows.item(0).data);

            acknowledgementInvList.push(invoiceAcknowledgementOfflineData);

            this.databaseProvider.setItem(ConstantsProvider.CONFIG_NM_ACK_INV_OFFLINE, JSON.stringify(acknowledgementInvList));

            this.updateInvoiceDetailsAndReturn(signatureToSave);
          }
        )
        .catch((e) => {
          console.log('Error = ' + JSON.stringify(e));
        });
    } else {
      let invoiceAcknowledgementApiEndpoint: string = ConstantsProvider.API_BASE_URL
        + ConstantsProvider.API_ENDPOINT_CUST_DTLS + ConstantsProvider.URL_SEPARATOR + this.invoiceNo
        + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_INVOICE_ACKNOWLEDGEMENT;


      let data: any = {
        signature: signatureToSave
      }

      console.log('invoiceAcknowledgementApiEndpoint = ' + invoiceAcknowledgementApiEndpoint
        + ', Data = ' + JSON.stringify(data));

      this.restService.postDetails(invoiceAcknowledgementApiEndpoint, data)
        .subscribe(
          (response) => {

            console.log('Response = ' + JSON.stringify(response));

            this.updateInvoiceDetailsAndReturn(signatureToSave);
          },
          (err) => {
            console.log('Error = ' + JSON.stringify(err));
            this.commonUtility.presentErrorToast('Could Not Save Acknowledgement. Please try again');
          }
        )
      // this.signature = this.signaturePad.toDataURL();
    }
  }

  updateInvoiceDetailsAndReturn(signatureToSave: any) {
    this.invoice.signature = signatureToSave;

    this.commonUtility.replaceCustomerInvoice(this.customer, this.invoice);

    this.signaturePad.clear();

    this.navCtrl.pop();
    this.navCtrl.pop();

    this.navCtrl.push('InvoiceDetailsPage', {
      customer: this.customer,
      fromDate: this.fromDate,
      invoice: this.invoice
    });
  }

  clearPad() {
    this.signaturePad.clear();
  }

}
