import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import * as firebase from 'Firebase';
import { CommonUtilityProvider } from '../providers/common-utility/common-utility';
import { ConstantsProvider } from '../providers/constants/constants';
// import { AuthorizatonSettingsPage } from '../pages/authorizaton-settings/authorizaton-settings';
// import { SettingsPage } from '../pages/settings/settings';
// import { AdminUsersPage } from '../pages/admin-users/admin-users';
// import { CustomerMgmtPage } from '../pages/customer-mgmt/customer-mgmt';
// import { OrderMgmtPage } from '../pages/order-mgmt/order-mgmt';
// import { Diagnostic } from '@ionic-native/diagnostic';
// import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { DatabaseProvider } from '../providers/database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
// import { VisitHistoryPage } from '../pages/visit-history/visit-history';
// import { TestPage } from '../pages/test/test';
// import { LocationsPage } from '../pages/locations/locations';
// import { SummaryReportPage } from '../pages/summary-report/summary-report';
// import { VehicleListPage } from '../pages/vehicle-list/vehicle-list';

// const config = {
//     apiKey: 'AIzaSyAwE6RUI2st4uTM40fotjuPJVRJNfuayko',
//     authDomain: 'geotracker-86b5d.firebaseapp.com',
//     databaseURL: 'https://geotracker-86b5d.firebaseio.com/',
//     projectId: 'geotracker-86b5d',
//     storageBucket: 'gs://geotracker-86b5d.appspot.com',
// };


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
        private databaseProvider: DatabaseProvider,
    ) {
        this.rootPage = localStorage.getItem('refresh-token') == null ? 'LoginPage' : 'AuthorizatonSettingsPage';

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.backgroundColorByHexString('#457492');
            splashScreen.hide();

        });

        console.log('Subscribing unauthorized:requestError event');
        this.events.subscribe("unauthorized:requestError",
            () => {
                this.commonUtility.clearStorage();
                this.nav.setRoot('LoginPage');
            });

        this.events.subscribe("rolesUpdated",
            () => {
                console.log('Subscribed Event rolesUpdated called');
                this.getSideMenuOptionsByRole();

                // if (this.commonUtility.hasRole(ConstantsProvider.ROLE_SALES))
                //   this.updateCurrentLocation();
            });

    }


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
                                { title: 'Customer Management', component: 'CustomerMgmtPage' },
                                { title: 'Orders', component: 'OrderMgmtPage' },
                                { title: 'Users Mgmt', component: 'AdminUsersPage' },
                                { title: 'Visits', component: 'VisitHistoryPage' },
                                { title: 'Locations', component: 'LocationsPage' },
                                { title: 'Summary Report', component: 'SummaryReportPage' },
                                { title: 'Settings', component: 'SettingsPage' },
                            );
                        } else if (rolesArray.indexOf(ConstantsProvider.ROLE_SALES) > -1) {
                            console.log('ROLE_SALES Matched');
                            this.pages.push(
                                { title: 'Customer Management', component: 'CustomerMgmtPage' },
                                { title: 'Visits', component: 'VisitHistoryPage' },
                                { title: 'Locations', component: 'LocationsPage' },
                                { title: 'Orders', component: 'OrderMgmtPage' },
                                { title: 'Summary Report', component: 'SummaryReportPage' },
                                { title: 'Settings', component: 'SettingsPage' }
                            );
                        } else {
                            console.log('No Roles Matched');
                            this.events.publish("unauthorized:requestError");
                        }

                        this.pages.push(
                            { title: 'Logout', component: 'LoginPage' },
                        );
                    }
                )
        });
    }
}

