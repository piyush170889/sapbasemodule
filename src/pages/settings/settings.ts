import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { ChangePasswordPage } from '../change-password/change-password';
import { ConstantsProvider } from '../../providers/constants/constants';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  verifyPasswordUrl: string = ConstantsProvider.API_BASE_URL
    + ConstantsProvider.API_ENDPOINT_VERIFY_PSSWD;

  isAdmin: boolean = false;
  doEnableNfc: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private restService: RestserviceProvider,
    private alertCtrl: AlertController,
    private commonUtility: CommonUtilityProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  naviagteToChangePassword() {

    const confirm = this.alertCtrl.create({
      title: 'Reset Customer',
      message: 'To proceed please enter your password',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Proceed',
          handler: (data) => {
            console.log('Password Entered : ' + data.password);
            let dataTopass = {
              password: data.password
            }
            this.restService.postDetails(this.verifyPasswordUrl, dataTopass)
              .subscribe(
                () => {
                  this.navCtrl.push(ChangePasswordPage, {
                    isForceChange: false
                  });
                }
              );
          }
        }
      ]
    });

    confirm.present();
  }

}
