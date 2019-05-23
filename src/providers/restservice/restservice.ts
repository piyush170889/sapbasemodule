import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { CommonUtilityProvider } from "../common-utility/common-utility";
import { Loading } from "ionic-angular";
import { ConstantsProvider } from "../constants/constants";

/*
  Generated class for the RestserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class RestserviceProvider {

    loader: Loading;

    constructor(private http: HttpClient,
        public commonUtility: CommonUtilityProvider) {
        console.log('Hello RestserviceProvider Provider');
    }

    doLoginRequest(userName, password) {

        let header = this.commonUtility.createBasicAuthHeaderOptions();
        var loginUrl = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_OAUTH
            + '?username=' + userName + '&password=' + password + '&grant_type=password';

        return this.http.post(loginUrl, '', { headers: header })
            .map((response) => {
                console.log("In login" + JSON.stringify(response));
                this.commonUtility.setTokenInStorage(response);
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
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.get(url)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    getDetailsWithoutLoader(url: string) {
        console.log('Get URL -> ' + url);
        if (this.commonUtility.isNetworkAvailable()) {
            return this.http.get(url)
                .map(response => {
                    return response;
                })
                .catch((err: Response) => {
                    console.log("Error - " + JSON.stringify(err));
                    this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    postDetails(url: string, data: any) {

        console.log('Post URL -> ' + url);
        console.log('Post Data -> ' + JSON.stringify(data));

        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.post(url, data)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    putDetails(url: string, data: any) {
        console.log('Put URL -> ' + url);
        console.log('Put Data -> ' + JSON.stringify(data));
        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.put(url, data)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

    putLocationDetails(url: string, data: any) {
        console.log('Put URL -> ' + url);
        console.log('Put Data -> ' + JSON.stringify(data));
        if (this.commonUtility.isNetworkAvailable()) {
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

        if (this.commonUtility.isNetworkAvailable()) {
            this.loader = this.commonUtility.createLoader();
            this.loader.present();
            return this.http.delete(url, data)
                .map(response => {
                    this.loader.dismiss();
                    return response;
                })
                .catch((err: Response) => {
                    this.loader.dismiss();
                    console.log("Error - " + JSON.stringify(err));
                    this.commonUtility.presentErrorToast(err);
                    return Observable.throw(err);
                });
        }
    }

}
