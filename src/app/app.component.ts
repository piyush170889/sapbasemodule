import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'Firebase';

import { LoginPage } from '../pages/login/login';
import { CommonUtilityProvider } from '../providers/common-utility/common-utility';
import { ConstantsProvider } from '../providers/constants/constants';
import { AuthorizatonSettingsPage } from '../pages/authorizaton-settings/authorizaton-settings';
import { SettingsPage } from '../pages/settings/settings';
import { AdminUsersPage } from '../pages/admin-users/admin-users';
import { CustomerMgmtPage } from '../pages/customer-mgmt/customer-mgmt';
import { OrderMgmtPage } from '../pages/order-mgmt/order-mgmt';
import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { DatabaseProvider } from '../providers/database/database';
import { SQLiteObject } from '@ionic-native/sqlite';

const config = {
    apiKey: 'AIzaSyAwE6RUI2st4uTM40fotjuPJVRJNfuayko',
    authDomain: 'geotracker-86b5d.firebaseapp.com',
    databaseURL: 'https://geotracker-86b5d.firebaseio.com/',
    projectId: 'geotracker-86b5d',
    storageBucket: 'gs://geotracker-86b5d.appspot.com',
};


@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild(Nav) nav: Nav;

    rootPage: any;
    pages: Array<{ title: string, component: any }> = [];
    swVersion: string = ConstantsProvider.SW_VER;


    constructor(public platform: Platform, statusBar: StatusBar,
        splashScreen: SplashScreen,
        private commonUtility: CommonUtilityProvider,
        private events: Events,
        private diagnostic: Diagnostic,
        private locationTracker: LocationTrackerProvider,
        private databaseProvider: DatabaseProvider
    ) {
        // console.log('Refresh Token = ' + localStorage.getItem('refresh-token'));
        this.rootPage = localStorage.getItem('refresh-token') == null ? LoginPage : AuthorizatonSettingsPage;

        // this.pages.push(
        // { title: 'TestPage', component: TestPage }
        // );
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.backgroundColorByHexString('#457492');
            splashScreen.hide();

            // Intialize Database
            console.log('Intializing DB');
            this.databaseProvider.intializeDatabase();

            // setTimeout(
            //     () => {
            //         this.databaseProvider.getRefreshToken()
            //             .subscribe(
            //                 (res: any) => {
            //                     let refreshToken: any = null;
            //                     console.log('Refresh Token Fetch Response = ' + JSON.stringify(res));

            //                     if (res.rows.length > 0)
            //                         refreshToken = JSON.parse(res.rows.item(0).data);

            //                     console.log('Refresh Token = ' + refreshToken);
            //                     this.rootPage = refreshToken == null ? LoginPage : AuthorizatonSettingsPage;
            //                 },
            //                 (err) => {
            //                     console.log(JSON.stringify(err));
            //                 }
            //             );
            //     }, 1000);

            /* let getUserData = localStorage.getItem('roles');
            if (getUserData) {
                console.log('User Data : ', getUserData);
                if (JSON.parse(getUserData).indexOf(ConstantsProvider.ROLE_SALES) > -1) {
                    this.trackUserLocation();
                }
            } */
        });
        firebase.initializeApp(config);
        console.log('Subscribing unauthorized:requestError event');
        this.events.subscribe("unauthorized:requestError",
            () => {
                this.commonUtility.clearStorage();
                this.nav.setRoot(LoginPage);
            });

        this.events.subscribe("rolesUpdated",
            () => {
                console.log('Subscribed Event rolesUpdated called');
                this.getSideMenuOptionsByRole();

                // if (this.commonUtility.hasRole(ConstantsProvider.ROLE_SALES))
                //   this.updateCurrentLocation();
            });

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

    // updateCurrentLocation() {

    //   setTimeout(() => {
    //     this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true })
    //       .then((resp) => {
    //         alert('Latitude = ' + resp.coords.latitude + ', Longitude = ' + resp.coords.longitude);
    //         console.log('Latitude = ' + resp.coords.latitude + ', Longitude = ' + resp.coords.longitude);

    //         let mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
    //       });
    //   }, 5000)
    // }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        // this.nav.setRoot(page.component);
        // if (page.title === "Logout" && this.commonUtility.hasRole(ConstantsProvider.ROLE_SALES)) {
        //     this.locationTracker.stopTracking();
        // }
        this.nav.setRoot(page.component);
    }

    getSideMenuOptionsByRole() {
        this.pages = [];

        this.databaseProvider.initializeSqlLiteDb().then((db: SQLiteObject) => {
            db.executeSql('SELECT data FROM metadata WHERE configname=?',
                ['roles'])
                .then(
                    res => {
                        let rolesArray: any[] = null;

                        if (res.rows.length > 0) {
                            let rowData: any = res.rows.item(0).data;
                            rolesArray = JSON.parse(rowData);
                            console.log('rolesArray = ' + JSON.stringify(rolesArray));
                        }

                        if (rolesArray.indexOf(ConstantsProvider.ROLE_ADMIN) > -1) {
                            console.log('Admin Role Matched');
                            this.pages.push(
                                { title: 'Customer Management', component: CustomerMgmtPage },
                                { title: 'Orders', component: OrderMgmtPage },
                                { title: 'Users Mgmt', component: AdminUsersPage },
                                { title: 'Settings', component: SettingsPage },
                            );
                        } else if (rolesArray.indexOf(ConstantsProvider.ROLE_SALES) > -1) {
                            console.log('ROLE_SALES Matched');
                            this.pages.push(
                                { title: 'Customer Management', component: CustomerMgmtPage },
                                { title: 'Orders', component: OrderMgmtPage },
                                { title: 'Settings', component: SettingsPage }
                            );
                        } else {
                            console.log('No Roles Matched');
                            this.events.publish("unauthorized:requestError");
                        }

                        this.pages.push(
                            { title: 'Logout', component: LoginPage },
                        );
                    }
                )
        });

        // if (this.commonUtility.hasRole(ConstantsProvider.ROLE_ADMIN)) {
        //     console.log('Admin Role Matched');
        //     this.pages.push(
        //         // { title: 'Tag Mgmt', component: TagMgmtPage },
        //         { title: 'Customer Management', component: CustomerMgmtPage },
        //         { title: 'Orders', component: OrderMgmtPage },
        //         { title: 'Users Mgmt', component: AdminUsersPage },
        //         { title: 'Settings', component: SettingsPage },
        //     );
        // } else if (this.commonUtility.hasRole(ConstantsProvider.ROLE_SALES)) {
        //     console.log('ROLE_SALES Matched');
        //     this.pages.push(
        //         { title: 'Customer Management', component: CustomerMgmtPage },
        //         { title: 'Orders', component: OrderMgmtPage },
        //         { title: 'Settings', component: SettingsPage }
        //     );
        // } else {
        //     console.log('No Roles Matched');
        //     this.events.publish("unauthorized:requestError");
        // }

        // this.pages.push(
        //     { title: 'Logout', component: LoginPage },
        //     // { title: 'TestPage', component: TestPage }
        // );
    }
}

