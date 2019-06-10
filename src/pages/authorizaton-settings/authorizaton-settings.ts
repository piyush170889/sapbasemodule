import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform } from 'ionic-angular';
import { ConstantsProvider } from '../../providers/constants/constants';
import { BaseComponent } from '../../custom/base-component';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { HttpClient } from '@angular/common/http';
import { ChangePasswordPage } from '../change-password/change-password';
import { CustomerMgmtPage } from '../customer-mgmt/customer-mgmt';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { DatabaseProvider } from '../../providers/database/database';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
    selector: 'page-authorizaton-settings',
    templateUrl: 'authorizaton-settings.html',
})
export class AuthorizatonSettingsPage {
    // export class AuthorizatonSettingsPage extends BaseComponent {

    rolesArray: any = [];
    userDetails: any = null;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public commonUtility: CommonUtilityProvider,
        public http: HttpClient,
        private events: Events,
        public diagnostic: Diagnostic,
        public platform: Platform,
        public locationTracker: LocationTrackerProvider,
        private databaseProvider: DatabaseProvider
    ) {
        // private geolocation: Geolocation) {

        // super(ConstantsProvider.API_ENDPOINT_ROLES, commonUtility, http, null);
        // this.getAll()
        //     .subscribe(
        //         (response) => {
        //             console.log(JSON.stringify(response));
        //             this.rolesArray = response.response.roles;
        //             this.userDetails = response.response.userDetails
        //             localStorage.setItem('roles', JSON.stringify(this.rolesArray));
        //             localStorage.setItem('isRolesUpdated', '1');
        //             localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
        //             console.log('this.rolesArray = ' + JSON.stringify(this.rolesArray));
        //             if (this.userDetails.isPasswordChanged == 0) {
        //                 if (this.rolesArray.indexOf(ConstantsProvider.ROLE_SALES) > -1) {
        //                     // this.trackUserLocation();
        //                     // this.navCtrl.setRoot(CustomerMgmtPage);
        //                     this.databaseProvider.syncCustomerDataInBackground();
        //                     this.navCtrl.setRoot(CustomerMgmtPage);
        //                 } else if (this.rolesArray.indexOf(ConstantsProvider.ROLE_ADMIN) > -1) {
        //                     // this.navCtrl.setRoot(CustomerMgmtPage);
        //                     this.databaseProvider.syncCustomerDataInBackground();
        //                     this.navCtrl.setRoot(CustomerMgmtPage);
        //                 }
        //             } else {
        //                 this.navCtrl.setRoot(ChangePasswordPage, {
        //                     isForceChange: true
        //                 });
        //             }
        //             this.events.publish("rolesUpdated");
        //         }
        //     );

        //Get RolesArray And UserDetails From Storage
        this.databaseProvider.getItem('roles')
            .then(
                res => {
                    console.log('roles DB Call Response = ' + JSON.stringify(res));
                    if (res.rows.length > 0) {
                        let rowData: any = res.rows.item(0).data;
                        this.rolesArray = null != rowData ? JSON.parse(rowData) : null;
                    } else
                        this.rolesArray = null;

                    this.databaseProvider.getItem('userDetails')
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
                                            this.navCtrl.setRoot(CustomerMgmtPage);
                                        } else if (this.rolesArray.indexOf(ConstantsProvider.ROLE_ADMIN) > -1) {
                                            this.navCtrl.setRoot(CustomerMgmtPage);
                                        }
                                    } else {
                                        this.navCtrl.setRoot(ChangePasswordPage, {
                                            isForceChange: true
                                        });
                                    }

                                    this.events.publish("rolesUpdated");
                                } else {
                                    this.navCtrl.setRoot(LoginPage);
                                }
                            });
                }
            )

        // this.rolesArray = null != localStorage.getItem('roles') ? JSON.parse(localStorage.getItem('roles')) : null;
        // this.userDetails = null != localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : null;


    }

    public trackUserLocation(): void {
        // Location Tracking
        this.platform.ready().then(() => {
            this.diagnostic.isLocationEnabled().then((available) => {
                if (available) {
                    this.locationTracker.startTracking();
                } else {
                    this.diagnostic.switchToLocationSettings();
                }
            });
        });
        // End of Location Tracking
    };


    ionViewDidLoad() {
        console.log('ionViewDidLoad AuthorizatonSettingsPage');
    }

}
