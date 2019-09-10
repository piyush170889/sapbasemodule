import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { ConstantsProvider } from '../../providers/constants/constants';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the VerifyPinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify-pin',
  templateUrl: 'verify-pin.html',
})
export class VerifyPinPage {

  customer: any = {
    customerDetails: {}
  };
  invoice: any;
  signature: any = '';
  fromDate: any = '';
  pinEntered: any = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private commonUtility: CommonUtilityProvider,
    private restService: RestserviceProvider,
    private network: Network
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyPinPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter VerifyPinPage');

    this.customer = this.navParams.get('customer');
    this.invoice = this.navParams.get('invoice');
    this.signature = this.navParams.get('signature');
    this.fromDate = this.navParams.get('fromDate');
  }

  verifyPin() {

    if (this.pinEntered == null || this.pinEntered == '') {
      this.commonUtility.presentErrorToast('Please Enter Valid PIN');
    } else {
      console.log('customer pin = ' + JSON.stringify(this.customer.customerDetails.pin));

      if (this.network.type == "unknown" || this.network.type == "none" || this.network.type == undefined) {
        if (undefined == this.customer.customerDetails.pin
          || null == this.customer.customerDetails.pin
          || this.customer.customerDetails.pin == '') {
          this.commonUtility.presentToast('Please Generate A PIN first to authorize access. Click the generate PIN button', 5000);
        } else {
          if (this.pinEntered == this.customer.customerDetails.pin)
            this.navigateToSignaturePad();
          else
            this.commonUtility.presentToast('Please enter a valid PIN', 5000);
        }
      } else {
        let verifyPinBody = {
          cardCode: this.customer.customerDetails.cardCode,
          customersPin: this.pinEntered
        };

        let verifyPinBodyApiEndpoint = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_CUST_DTLS
          + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_VERIFY_PIN;

        this.restService.postDetails(verifyPinBodyApiEndpoint, verifyPinBody)
          .subscribe(
            (res) => {
              console.log('Response = ' + JSON.stringify(res));
              this.navigateToSignaturePad();
            }
          );

      }
    }
  }

  navigateToSignaturePad() {
    this.navCtrl.pop();
    this.navCtrl.push('SignaturepadPage', {
      invoice: this.invoice,
      customer: this.customer,
      signature: this.signature,
      fromDate: this.fromDate
    });
  }

  generatePin() {

    console.log('generatePin VerifyPinPage');

    this.navCtrl.push('GeneratePinReviewPage', {
      customer: this.customer
    });

    // if (this.commonUtility.isNetworkAvailable()) {

    //   let generatePinApiEndPoint: string = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_CUST_DTLS
    //     + ConstantsProvider.URL_SEPARATOR + this.customer.customerDetails.cardCode
    //     + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_GENERATE_PIN;

    //   this.restService.getDetails(generatePinApiEndPoint)
    //     .subscribe(
    //       (res) => {
    //         console.log('Response = ' + JSON.stringify(res.response));
    //         let generatePinRes = res.response;

    //         this.customer.customerDetails.pin = generatePinRes.customersPin;
    //         console.log('customerDetails Pin = ' + this.customer.customerDetails.pin +
    //           ", generatePinRes customersPin = " + generatePinRes.customersPin);

    //         this.commonUtility.presentToast('PIN Generated Succesfully And Sent to registered mobile No.', 5000);

    //         this.commonUtility.saveCustomerRecord(this.customer);
    //       }
    //     )
    // }
  }

}
