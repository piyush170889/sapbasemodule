import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { AuthorizatonSettingsPage } from '../authorizaton-settings/authorizaton-settings';
import { Diagnostic } from '@ionic-native/diagnostic';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    private credentials: FormGroup;
    tagId: string = '';
    loader: Loading;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public formBuilder: FormBuilder,
        public commonUtility: CommonUtilityProvider,
        public restService: RestserviceProvider,
        private platform: Platform,
        private diagnostic: Diagnostic
    ) {
        this.commonUtility.clearStorage();
        this.credentials = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    /*doLogin() {
        this.platform.ready().then(() => {
            this.diagnostic.isLocationEnabled().then((available) => {
                if (available) {
                    if (this.commonUtility.isNetworkAvailable()) {
                        this.loader = this.commonUtility.createLoader();
                        this.loader.present().then(
                            () => {
                                let inputUsername = this.credentials.controls['username'].value;
                                let inputPassword = this.credentials.controls['password'].value;

                                console.log("Username From Ctrl - " + inputUsername + ", Password From Ctrl - " + inputPassword);

                                this.restService.doLoginRequest(inputUsername, inputPassword)
                                    .subscribe((response) => {
                                        this.loader.dismiss();
                                        if (response) {
                                            this.navCtrl.setRoot(AuthorizatonSettingsPage);
                                        } else {
                                            console.log('An server error occurred.');
                                        }
                                    }, (err) => {
                                        this.loader.dismiss();
                                        console.log(err)
                                    });

                            });
                    }
                } else {
                    this.diagnostic.switchToLocationSettings();
                }
            });
        });
    }*/

    doLogin() {
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present().then(
                () => {
                    let inputUsername = this.credentials.controls['username'].value;
                    let inputPassword = this.credentials.controls['password'].value;

                    console.log("Username From Ctrl - " + inputUsername + ", Password From Ctrl - " + inputPassword);

                    this.restService.doLoginRequest(inputUsername, inputPassword)
                        .subscribe((response) => {
                            this.loader.dismiss();
                            if (response) {
                                this.navCtrl.setRoot(AuthorizatonSettingsPage);
                            } else {
                                console.log('An server error occurred.');
                            }
                        }, (err) => {
                            this.loader.dismiss();
                            console.log(err)
                        });

                });
        }
    }
}
