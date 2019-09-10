import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { ConstantsProvider } from '../../providers/constants/constants';
import { RestserviceProvider } from '../../providers/restservice/restservice';

/**
 * Generated class for the GeneratePinReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-generate-pin-review',
  templateUrl: 'generate-pin-review.html',
})
export class GeneratePinReviewPage {

  customer: any = {
    customerDetails: {}
  };
  isCellularAvailable: boolean = false;
  isPhone1Available: boolean = false;
  isPhone2Available: boolean = false;
  contactNo: string = '';

  constructor(
    private navCtrl: NavController,
    public navParams: NavParams,
    private commonUtility: CommonUtilityProvider,
    private restService: RestserviceProvider
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeneratePinReviewPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter GeneratePinReviewPage');

    this.customer = this.navParams.get('customer');
    this.isCellularAvailable = this.customer.customerDetails.cellular != null
      && this.customer.customerDetails.cellular != '' ? true : false;
    this.isPhone1Available = this.customer.customerDetails.phone1 != null
      && this.customer.customerDetails.phone1 != '' ? true : false;
    this.isPhone2Available = this.customer.customerDetails.phone2 != null
      && this.customer.customerDetails.phone2 != '' ? true : false;
  }

  generatePinOnManualNo() {

    this.generatePin(this.contactNo);
  }

  generatePin(contactNo) {

    if (contactNo == null || contactNo == '' || contactNo.length != 10) {
      this.commonUtility.presentErrorToast('Please provide a valid contact number');
    } else {
      if (this.commonUtility.isNetworkAvailable()) {

        let generatePinApiEndPoint: string = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_CUST_DTLS
          + ConstantsProvider.URL_SEPARATOR + this.customer.customerDetails.cardCode
          + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_GENERATE_PIN
          + ConstantsProvider.URL_SEPARATOR + contactNo;

        this.restService.getDetails(generatePinApiEndPoint)
          .subscribe(
            (res) => {
              console.log('Response = ' + JSON.stringify(res.response));
              let generatePinRes = res.response;

              this.customer.customerDetails.pin = generatePinRes.customersPin;
              console.log('customerDetails Pin = ' + this.customer.customerDetails.pin +
                ", generatePinRes customersPin = " + generatePinRes.customersPin);

              this.commonUtility.saveCustomerRecord(this.customer);

              this.navCtrl.pop();

              this.commonUtility.presentToast('PIN generated succesfully and sent to registered mobile No.', 5000);
            }
          )
      }
    }
  }

}
