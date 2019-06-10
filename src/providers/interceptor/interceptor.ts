import { AlertController, Events } from 'ionic-angular';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { CommonUtilityProvider } from "../common-utility/common-utility";
import { ConstantsProvider } from "../constants/constants";
import { DatabaseProvider } from '../database/database';


/*
  Generated class for the InterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class HttpResponseError {
    headers: {
        normalizedNames: any,
        lazyUpdate: any,
        headers: any
    };
    status: number;
    statusText: string;
    url: string;
    ok: boolean;
    name: string;
    message: string;
    error: {
        error: string,
        errorDescription: string
        apiVersion: string
    };
}


@Injectable()
export class InterceptorProvider implements HttpInterceptor {

    httpResponseError: HttpResponseError;

    constructor(
        private alertCtrl: AlertController,
        private http: HttpClient,
        private commonUtility: CommonUtilityProvider,
        public events: Events,
        private databaseProvider: DatabaseProvider) { }

    // Intercepts all HTTP requests!
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('Interceptor Called');
        
        let token = localStorage.getItem('token');
        console.log('Token = ' + token);
        
        let clonedReq = this.addToken(request, token);
        
        return next.handle(clonedReq)
            .catch((error) => {
                let title = 'Error';
                let message = 'Server Error Occured';
                let errorStatus = error.status;
                console.log('Error = ' + JSON.stringify(error));
                console.log('Error Status = ' + errorStatus);

                if (errorStatus == 0) {
                    message = 'Cannot make server calls now. Please exit and open the app again.';
                } else if (errorStatus == 400) {
                    //TODO: Remove hard-coded string
                    if (error.error.error_description.toLowerCase() == 'bad credentials') {
                        message = 'Invalid Username/Password';
                    } else {
                        message = 'Invalid Request Format';
                    }
                } else if (errorStatus == 401) {
                    return this.refreshTokenAndRetryRequest(next, request);
                } else if (errorStatus == 402) {
                    message = error.error.responseMessage.message;
                }

                let alert = this.alertCtrl.create({
                    title: title,
                    message: message,
                    buttons: ['OK']
                });
                alert.present();

                // Pass the error to the caller of the function
                return _throw(error);
            })
    }

    // Adds the token to your headers if it exists
    private addToken(request: HttpRequest<any>, token: any) {
        if (token) {
            console.log('Adding Token - ' + token);
            let clone: HttpRequest<any>;
            clone = request.clone({
                setHeaders: {
                    Accept: `application/json`,
                    'Content-Type': `application/json`,
                    Authorization: `Bearer ${token}`
                }
            });
            return clone;
        }

        console.log('Returning Request Without Token');
        return request;
    }

    private makeRefreshTokenCall(refreshTokenUrl, headers) {
        return this.http.post(refreshTokenUrl, '', { headers: headers })
            .map(response => response)
            .catch((err: Response) => {
                console.log("RefreshToken Error - " + JSON.stringify(err));
                console.log('Publishing unauthorized:requestError event');
                this.events.publish("unauthorized:requestError");
                return _throw(err);
            })
    }

    refreshTokenAndRetryRequest(next: HttpHandler, request: HttpRequest<any>) {

        let refreshToken = localStorage.getItem('refresh-token');
        this.commonUtility.clearStorage();

        if (refreshToken) {
            let headers = this.commonUtility.createBasicAuthHeaderOptions();
            let refreshTokenUrl = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_OAUTH
                + '?grant_type=refresh_token&refresh_token=' + refreshToken;
            
            return this.makeRefreshTokenCall(refreshTokenUrl, headers)
                .switchMap((response: any) => {
                    if (response.access_token) {
                        this.commonUtility.setTokenInStorage(response);
                        // this.databaseProvider.setTokenInDb(response);
                        let clonedReq = this.addToken(request, response.access_token);
                        return next.handle(clonedReq);
                    }
                })
                .catch(error => {
                    // If there is an exception calling 'refreshToken', bad news so logout.
                    console.log('Refresh Token Error Occured');
                    this.events.publish("unauthorized:requestError");
                    return Observable.throw(error);
                })
        } else {
            console.log('No Refresh Token');
            this.events.publish("unauthorized:requestError");
            return Observable.throw({error: 'No Refresh Token'});
        }
    }

}
