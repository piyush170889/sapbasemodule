import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform } from 'ionic-angular';
import { ConstantsProvider } from '../../providers/constants/constants';
import { BaseComponent } from '../../custom/base-component';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { HttpClient } from '@angular/common/http';
import { ChangePasswordPage } from '../change-password/change-password';
import { CustomerMgmtPage } from '../customer-mgmt/customer-mgmt';
import { AdminUsersPage } from '../admin-users/admin-users';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { DatabaseProvider } from '../../providers/database/database';
import { LoginPage } from '../login/login';

// declare var google: any;

@IonicPage()
@Component({
    selector: 'page-authorizaton-settings',
    templateUrl: 'authorizaton-settings.html',
})
export class AuthorizatonSettingsPage {
    // export class AuthorizatonSettingsPage extends BaseComponent {

    rolesArray: any = [];
    userDetails: any;

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

        this.rolesArray = null != localStorage.getItem('roles') ? JSON.parse(localStorage.getItem('roles')) : null;
        this.userDetails = null != localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails')) : null;

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
