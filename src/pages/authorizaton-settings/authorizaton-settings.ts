import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform } from 'ionic-angular';
import { ConstantsProvider } from '../../providers/constants/constants';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { HttpClient } from '@angular/common/http';
import { Diagnostic } from '@ionic-native/diagnostic';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
    selector: 'page-authorizaton-settings',
    templateUrl: 'authorizaton-settings.html',
})
export class AuthorizatonSettingsPage {
    // export class AuthorizatonSettingsPage extends BaseComponent {

    rolesArray: any = [];
    userDetails: any = null;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public commonUtility: CommonUtilityProvider,
        public http: HttpClient,
        private events: Events,
        public diagnostic: Diagnostic,
        public platform: Platform,
        private databaseProvider: DatabaseProvider
    ) {

        //Get RolesArray And UserDetails From Storage
        this.databaseProvider.getItem(ConstantsProvider.CONFIG_NM_ROLES)
            .then(
                res => {
                    console.log('roles DB Call Response = ' + JSON.stringify(res));
                    if (undefined == res || 'undefined' == res)
                        this.navCtrl.setRoot('LoginPage');
                    else {
                        if (res.rows.length > 0) {
                            let rowData: any = res.rows.item(0).data;
                            this.rolesArray = null != rowData ? JSON.parse(rowData) : null;
                        } else
                            this.rolesArray = null;

                        this.databaseProvider.getItem(ConstantsProvider.CONFIG_NM_USER_DTLS)
                            .then(
                                res => {
                                    if (res.rows.length > 0) {
                                        let rowData: any = res.rows.item(0).data;
                                        this.userDetails = null != rowData ? JSON.parse(rowData) : null;
                                    } else
                                        this.userDetails = null;

                                    console.log('this.rolesArray = ' + JSON.stringify(this.rolesArray));

                                    if (null != this.userDetails && null != this.rolesArray) {

                                        if (this.userDetails.isPasswordChanged == 0) {
                                            if (this.rolesArray.indexOf(ConstantsProvider.ROLE_SALES) > -1) {
                                                // this.trackUserLocation();
                                                this.navCtrl.setRoot('CustomerMgmtPage');
                                            } else if (this.rolesArray.indexOf(ConstantsProvider.ROLE_ADMIN) > -1) {
                                                this.navCtrl.setRoot('CustomerMgmtPage');
                                            }
                                        } else {
                                            this.navCtrl.setRoot('ChangePasswordPage', {
                                                isForceChange: true
                                            });
                                        }

                                        this.events.publish("rolesUpdated");
                                    } else {
                                        this.navCtrl.setRoot('LoginPage');
                                    }
                                });
                    }
                }
            )
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AuthorizatonSettingsPage');
    }

    ionViewWillEnter() {
        console.log('ionViewWillEnter AuthorizationSettingsPage');

        // Intialize Database
        console.log('Intializing DB');
        this.databaseProvider.intializeDatabase();
    }
}
