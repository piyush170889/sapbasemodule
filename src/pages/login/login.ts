import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, Platform } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { AuthorizatonSettingsPage } from '../authorizaton-settings/authorizaton-settings';
import { Diagnostic } from '@ionic-native/diagnostic';
import { ConstantsProvider } from '../../providers/constants/constants';
import { DatabaseProvider } from '../../providers/database/database';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Page } from 'ionic-angular/umd/navigation/nav-util';

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
        private diagnostic: Diagnostic,
        private databaseProvider: DatabaseProvider
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
                                // this.navCtrl.setRoot(AuthorizatonSettingsPage);

                                let userRolesApiEndpoint = ConstantsProvider.API_BASE_URL +
                                    ConstantsProvider.API_ENDPOINT_ROLES;

                                this.restService.getDetails(userRolesApiEndpoint)
                                    .subscribe(
                                        (response) => {
                                            console.log(JSON.stringify(response));

                                            //Extract REquired Data
                                            let rolesArray = response.response.roles;
                                            let userDetails = response.response.userDetails;

                                            //Set Data in LocalStorage
                                            localStorage.setItem('roles', JSON.stringify(rolesArray));
                                            localStorage.setItem('isRolesUpdated', '1');
                                            localStorage.setItem('userDetails', JSON.stringify(userDetails));

                                            this.syncCustomerData(AuthorizatonSettingsPage);
                                        }
                                    );
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

    syncCustomerData(componentToNavigate: Page) {

        let customersDetailsApiEndpoint = ConstantsProvider.API_BASE_URL
            + ConstantsProvider.API_ENDPOINT_CUST_DTLS + ConstantsProvider.URL_SEPARATOR
            + ConstantsProvider.API_ENDPOINT_SYNC;

        this.restService.getDetails(customersDetailsApiEndpoint)
            .subscribe(
                (response) => {
                    console.log('Customers Data = ' + JSON.stringify(response.response));
                    let customersDetailsList: any[] = response.response;

                    this.databaseProvider.initializeSqlLiteDb().then((db: SQLiteObject) => {

                        db.executeSql('SELECT data from metadata where configname=?',
                            [ConstantsProvider.CONFIG_NM_CUST_DATA])
                            .then(
                                res => {
                                    if (res.rows.length > 0) {
                                        this.updateCustomerDetailsFromApi(customersDetailsList,
                                            componentToNavigate);
                                    } else {
                                        db.executeSql('INSERT INTO metadata(configname, data) VALUES(?,?)',
                                            [ConstantsProvider.CONFIG_NM_CUST_DATA, ''])
                                            .then(res => {
                                                console.log('Inserted Empty Customer Record');
                                                this.updateCustomerDetailsFromApi(customersDetailsList,
                                                    componentToNavigate);
                                            })
                                            .catch(e => console.log(JSON.stringify(e)));
                                    }
                                }
                            );
                    })
                        .catch(e => {
                            console.log(JSON.stringify(e))
                        })
                }
            );
    }

    updateCustomerDetailsFromApi(customersDetailsList: any[], componentToNavigate: Page) {

        this.databaseProvider.initializeSqlLiteDb().then((db: SQLiteObject) => {
            db.executeSql('UPDATE metadata set data=? WHERE configname=?', [JSON.stringify(customersDetailsList),
            ConstantsProvider.CONFIG_NM_CUST_DATA])
                .then(
                    res => {
                        console.log('Updated Customer Record');

                        db.executeSql('SELECT data from metadata where configname=?',
                            [ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS])
                            .then(
                                res => {
                                    if (res.rows.length > 0) {
                                        this.updateLastUpdatedTs(componentToNavigate);
                                    } else {
                                        db.executeSql('INSERT INTO metadata(configname, data) VALUES(?,?)',
                                            [ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS, ''])
                                            .then(res => {
                                                console.log('Inserted Empty Customer Record');
                                                this.updateLastUpdatedTs(componentToNavigate);
                                            })
                                            .catch(e => console.log(JSON.stringify(e)));
                                    }
                                }
                            );
                    }
                )
                .catch(e => {
                    console.log(JSON.stringify(e))
                });
        })
            .catch(e => {
                console.log(JSON.stringify(e))
            })
    }

    updateLastUpdatedTs(componentToNavigate: Page) {
        this.databaseProvider.initializeSqlLiteDb().then((db: SQLiteObject) => {
            db.executeSql('UPDATE metadata set data=? WHERE configname=?', [new Date().toISOString(),
            ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS])
                .then(
                    res => {
                        console.log('Updated Last Updated Ts');
                        this.navCtrl.setRoot(componentToNavigate);
                    }
                )
                .catch(e => {
                    console.log(JSON.stringify(e))
                })
        })
            .catch(e => {
                console.log(JSON.stringify(e))
            })
    }
}
