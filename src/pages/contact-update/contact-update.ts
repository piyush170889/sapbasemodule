import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { ConstantsProvider } from '../../providers/constants/constants';

/**
 * Generated class for the ContactUpdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-update',
  templateUrl: 'contact-update.html',
})
export class ContactUpdatePage {

  isContactSubmitted: boolean = false;
  contactUpdateFormGroup: FormGroup;
  customer: any;
  custCntcNum: string;
  deviceInfo: string = 'STATIC_DATA';
  referrer: any = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private view: ViewController,
    private restService: RestserviceProvider,
    private commonUtility: CommonUtilityProvider) {

    this.customer = this.navParams.get('customer');
    this.custCntcNum = this.customer.custCntcNum;

    this.referrer = this.navParams.get('referrer');
    console.log('referrer = ' + this.referrer);

    switch (this.referrer) {

      case 'CustomerContactUpdate':
        break;

      default:
        break;
    }
    this.contactUpdateFormGroup = this.formBuilder.group(
      {
        contactNumber: [this.custCntcNum, Validators.required],
        otp: ['', Validators.required]
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUpdatePage');
  }

  updateContactAndSendOtp() {

    console.log('updateContactAndSendOtp called');

    if (this.commonUtility.isNetworkAvailable()) {

      let udpatedContactNumber: string = this.contactUpdateFormGroup.controls['contactNumber'].value;

      if (udpatedContactNumber == this.custCntcNum)
        this.commonUtility.presentErrorToast('Please submit the contact No. to update');
      else {
        this.sendOtp('OTP sent successfully to updated contact number', udpatedContactNumber);
      }
    }
  }

  sendOtp(mssg: string, contactNumber: string) {
    let sendOtpData: any = {
      cellnumber: contactNumber,
      deviceInfo: this.deviceInfo
    };

    let sendOtpUrl: string = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_SEND_OTP;
    this.restService.postDetails(sendOtpUrl, sendOtpData)
      .subscribe(
        () => {
          this.isContactSubmitted = true;
          this.commonUtility.presentToast(mssg, 3000);
        }
      );
  }

  updateContact() {

    console.log('updateContact called');

    if (this.commonUtility.isNetworkAvailable()) {

      let otpSubmitted = this.contactUpdateFormGroup.controls['otp'].value;
      let udpatedContactNumber: string = this.contactUpdateFormGroup.controls['contactNumber'].value;

      console.log('conatctNum = ' + udpatedContactNumber + ', otp = ' + otpSubmitted + ', custId = '
        + this.customer.custDtlsId);

      let verifyOtpData: any = {
        cellnumber: udpatedContactNumber,
        deviceInfo: this.deviceInfo,
        otp: otpSubmitted
      };

      let verifyOtpUrl: string = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_CUST_DTLS
        + ConstantsProvider.URL_SEPARATOR + this.customer.custDtlsId
        + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_VERIFY_OTP;

      this.restService.postDetails(verifyOtpUrl, verifyOtpData)
        .subscribe(
          () => {
            this.isContactSubmitted = true;

            switch (this.referrer) {

              case 'CustomerContactUpdate':
                this.commonUtility.presentToast('Contact Number Updated Successfully', 3000);
                break;

              default:
                break;
            }


            let modalData: any = {
              contactNumber: udpatedContactNumber,
              isAdded: true
            }

            this.view.dismiss(modalData);
          }
        );
    }
  }

  dismissModal() {
    const modalData = {
      isAdded: false
    };
    this.view.dismiss(modalData);
  }

}
