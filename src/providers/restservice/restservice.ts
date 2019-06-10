import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CommonUtilityProvider } from "../common-utility/common-utility";
import { Loading, Events, LoadingController, ToastController, AlertController } from "ionic-angular";
import { ConstantsProvider } from "../constants/constants";
import { Network } from '@ionic-native/network';
// import { DatabaseProvider } from '../database/database';

/*
  Generated class for the RestserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class RestserviceProvider {

    loader: Loading;

    constructor(private http: HttpClient,
        public events: Events,
        private loadingCtrl: LoadingController,
        private network: Network,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController
    ) {
        console.log('Hello RestserviceProvider Provider');
    }

    doLoginRequest(userName, password) {

        // let header = this.commonUtility.createBasicAuthHeaderOptions();
        let header = this.createBasicAuthHeaderOptions();
        var loginUrl = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_OAUTH
            + '?username=' + userName + '&password=' + password + '&grant_type=password';

        return this.http.post(loginUrl, '', { headers: header })
            .map((response) => {
                console.log("In login" + JSON.stringify(response));
                this.setTokenInStorage(response);
                // this.commonUtility.setTokenInStorage(response);

                // TODO: Update Logic For Synchronous Execution
                // this.databaseProvider.setTokenInDb(response);

                return true;
            })
            .catch((err: Response) => {
                let loginDetails = err;
                console.log("login Error - " + JSON.stringify(loginDetails));
                return Observable.throw(loginDetails);
            });
    }


    getDetails(url: string) {
        console.log('Get URL -> ' + url);
        if (this.isNetworkAvailable()) {
            // if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.createLoader();
            // this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.get(url)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    // this.commonUtility.presentErrorToast(err);
                    this.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    getDetailsWithoutLoader(url: string) {
        console.log('Get URL -> ' + url);
        if (this.isNetworkAvailable()) {
            // if (this.commonUtility.isNetworkAvailable()) {
            return this.http.get(url)
                .map(response => {
                    return response;
                })
                .catch((err: Response) => {
                    console.log("Error - " + JSON.stringify(err));
                    this.presentErrorToast(err);
                    // this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    postDetails(url: string, data: any) {

        console.log('Post URL -> ' + url);
        console.log('Post Data -> ' + JSON.stringify(data));

        if (this.isNetworkAvailable()) {
            // if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.createLoader();
            // this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.post(url, data)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.presentErrorToast(err);
                    // this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    putDetails(url: string, data: any) {
        console.log('Put URL -> ' + url);
        console.log('Put Data -> ' + JSON.stringify(data));
        // if (this.commonUtility.isNetworkAvailable()) {
        if (this.isNetworkAvailable()) {
            this.loader = this.createLoader();
            // this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.put(url, data)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.presentErrorToast(err);
                    // this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    putLocationDetails(url: string, data: any) {
        console.log('Put URL -> ' + url);
        console.log('Put Data -> ' + JSON.stringify(data));
        if (this.isNetworkAvailable()) {
            // if (this.commonUtility.isNetworkAvailable()) {
            // this.loader = this.commonUtility.createLoader();
            // this.loader.present();
            return this.http.put(url, data)
                .map(response => {
                    // this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    // this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    // this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    deleteDetails(url: string, data: any) {

        console.log('Delete URL -> ' + url);
        console.log('Delete Data -> ' + JSON.stringify(data));

        if (this.isNetworkAvailable()) {
            // if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.createLoader();
            // this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.delete(url, data)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.presentErrorToast(err);
                    // this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    /* HELPER METHODS */
    public setTokenInStorage(data: any) {

        console.log('Access Token = ' + data.access_token);
        console.log('Refresh Token = ' + data.refresh_token);

        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refresh-token', data.refresh_token);
        localStorage.setItem('isLoggedIn', '1');
    }


    // isNetworkAvailable() {

    //     if (!this.isNetworkAvailableFlag) {
    //         let alert = this.alertCtrl.create({
    //             subTitle: 'No Internet Connection',
    //             enableBackdropDismiss: false,
    //             buttons: [
    //                 {
    //                     text: 'OK',
    //                     handler: () => {
    //                         this.isNetworkAvailable();
    //                     }
    //                 }
    //             ]
    //         });
    //         alert.present();
    //     }

    //     return this.isNetworkAvailableFlag;
    // }


    isNetworkAvailable() {
        if (this.network.type == "unknown" || this.network.type == "none" || this.network.type == undefined) {
            let alert = this.alertCtrl.create({
                subTitle: 'No Internet Connection',
                enableBackdropDismiss: false,
                buttons: [
                    {
                        text: 'OK',
                        handler: () => {
                            this.isNetworkAvailable();
                        }
                    }
                ]
            });
            alert.present();
            return false;
        } else {
            return true;
        }

    }

    createBasicAuthHeaderOptions() {

        let headers = new HttpHeaders({
            "Authorization": "Basic " + ConstantsProvider.BASIC_AUTH_TOKEN
        });

        console.log("Login Header Options - " + JSON.stringify(headers.get("Authorization")));
        return headers;
    }

    presentToast(messageContent, messageDuration) {

        const toast = this.toastCtrl.create({
            message: messageContent,
            duration: messageDuration
        });

        toast.present();
    }

    presentErrorToast(error) {
        const toast = this.toastCtrl.create({
            message: error,
            duration: 5000
        });

        toast.present();
    }

    createLoader(message: string = "Please wait...") { // Optional Parameter
        return this.loadingCtrl.create({
            content: message
        });
    }

}
