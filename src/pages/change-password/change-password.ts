import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { ConstantsProvider } from '../../providers/constants/constants';
import { LoginPage } from '../login/login';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  isForceChange: boolean = false;
  newPassword: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private restService: RestserviceProvider,
    private commonUtility: CommonUtilityProvider) {
    this.isForceChange = this.navParams.get('isForceChange');
  }

  changePassword() {

    console.log('newPassword = ' + this.newPassword);
    let changePasswordUrl = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_USERS +
      ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_CHANGE_PASS;

    let changePasswordData: any = {
      password: this.newPassword
    }

    this.restService.postDetails(changePasswordUrl, changePasswordData)
      .subscribe(
        () => {
          this.commonUtility.presentToast('Password Changed SuccessFully', 5000);

          setTimeout(() => {
            this.navCtrl.setRoot(LoginPage);
          }, 2000);
        }
      )

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

}
