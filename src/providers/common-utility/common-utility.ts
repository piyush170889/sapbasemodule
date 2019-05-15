import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController, Events } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import { Network } from "@ionic-native/network";
import { ConstantsProvider } from '../constants/constants';
import { DatePipe } from '@angular/common';
import { CallNumber } from '@ionic-native/call-number';

@Injectable()
export class CommonUtilityProvider {

    isNetworkAvailableFlag: boolean = true;

    constructor(
        private toastCtrl: ToastController,
        private alertCtrl: AlertController,
        public events: Events,
        private loadingCtrl: LoadingController,
        private network: Network,
        private callNumberNative: CallNumber
    ) {
        console.log('Hello CommonUtilityProvider Provider');
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
              enableBackdropDismiss: false ,
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

    callNumber(numberToCall: any, bypassAppChooser: boolean) {
        // this.callNumberNative.isCallSupported()
        //     .then(function (response) {
        //         if (response == true) {
        //             this.callNumberNative.callNumber(numberToCall, bypassAppChooser);
        //         }
        //         else {
        //             this.presentErrorToast('No Calling Service Available');
        //         }
        //     });
        this.callNumberNative.callNumber(numberToCall, bypassAppChooser);
    }

    hasRoleInArray(rolesArray: string[], role: string): any {

        // console.log('rolesArray = ' + JSON.stringify(rolesArray));
        let isRolePresent: boolean = false;

        if (null != rolesArray && rolesArray.length != 0) {
            let rolesArrayLength = rolesArray.length;
            for (let j = 0; j < rolesArrayLength; j++) {
                if (role == rolesArray[j]) {
                    isRolePresent = true;
                }
            }
        }

        return isRolePresent;
    }

    createLoader(message: string = "Please wait...") { // Optional Parameter
        return this.loadingCtrl.create({
            content: message
        });
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

    createBasicAuthHeaderOptions() {

        let headers = new HttpHeaders({
            "Authorization": "Basic " + ConstantsProvider.BASIC_AUTH_TOKEN
        });

        console.log("Login Header Options - " + JSON.stringify(headers.get("Authorization")));
        return headers;
    }

    public clearStorage() {
        localStorage.clear();
    }

    public setTokenInStorage(data: any) {
        console.log('Access Token = ' + data.access_token);
        console.log('Refresh Token = ' + data.refresh_token);

        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refresh-token', data.refresh_token);
        localStorage.setItem('isLoggedIn', '1');
    }

    public hasRole(...rolesToCheck) {
        console.log('rolesToCheck = ' + rolesToCheck);
        let rolesArray = JSON.parse(localStorage.getItem('roles'));
        console.log('rolesArray = ' + JSON.stringify(rolesArray));

        let isRolePresent: boolean = false;

        if (null != rolesArray && rolesArray.length != 0) {
            let rolesToCheckLength = rolesToCheck.length;
            let rolesArrayLength = rolesArray.length;
            for (let i = 0; i < rolesToCheckLength; i++) {
                let roleInCheck = rolesToCheck[i];
                console.log('roleInCheck = ' + roleInCheck);
                for (let j = 0; j < rolesArrayLength; j++) {
                    if (roleInCheck == rolesArray[j]) {
                        isRolePresent = true;
                    }
                }
            }
        } else {
            this.events.publish("unauthorized:requestError");
        }

        return isRolePresent;
    }

    public getDocDefination(reportyType, datePeriod, custCity, custName, body) {
        let description = {
            content: [
                { text: 'JAGTAP BUILDING SOLUTIONS', style: 'header' },
                { text: 'Asthavinayak Soc, Opp Bharat Jyoti Stop' },
                { text: 'Bibwewadi , Pune - 411037' },
                { text: 'Tel No. : (O) 24216162, 9822610611' },
                { text: 'Phone no. : 02024216162' },
                { text: 'Pin code : 411037' },
                { text: 'GSTIN : 27AFJPJ8271L1ZV' },
                { text: 'E-Mail : jagtapbsolutions@gmail.com' },
                { text: custName, style: 'subheader' },
                { text: custCity },
                { text: reportyType, style: 'subheader' },
                { text: datePeriod, style: 'story' },
                { text: 'Report Date: ' + new DatePipe('en-US').transform(new Date().toISOString(), 'dd MMM yy'), style: 'story' },
                {
                    table: {
                        body: body
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                },
                cardname: {
                    margin: [5, 0, 5, 0]
                },
                subheader: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 15, 0, 0],
                    alignment: 'center'
                },
                story: {
                    italic: true,
                    alignment: 'center',
                    width: '50%',
                }
            }
        }

        return description;
    }

    public getDocDefinationPendingInvoices(reportyType, datePeriod, custCity, custName, body, totalPendingAmount) {
        let description = {
            content: [
                { text: 'Hello,' },
                {
                    text: 'This is a reminder that your account balance of ' + totalPendingAmount + ' was overdue as of ' + datePeriod + '.'
                        + ' Please find the Receivable for your reference. If you have any queries regarding this account, please contact ' +
                        'our office as soon as possible.'
                },
                { text: custName, style: 'subheader' },
                { text: custCity },
                { text: reportyType, style: 'subheader' },
                { text: datePeriod, style: 'story' },
                { text: 'Report Date: ' + new DatePipe('en-US').transform(new Date().toISOString(), 'dd MMM yy'), style: 'story' },
                {
                    table: {
                        body: body
                    }
                },
                { text: 'Regards,', style: 'greetings' },
                { text: 'JAGTAP BUILDING SOLUTIONS', style: 'header' },
                { text: 'Asthavinayak Soc, Opp Bharat Jyoti Stop' },
                { text: 'Bibwewadi , Pune - 411037' },
                { text: 'Tel No. : (O) 24216162, 9822610611' },
                { text: 'Phone no. : 02024216162' },
                { text: 'Pin code : 411037' },
                { text: 'GSTIN : 27AFJPJ8271L1ZV' },
                { text: 'E-Mail : jagtapbsolutions@gmail.com' },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                },
                cardname: {
                    margin: [5, 0, 5, 0]
                },
                subheader: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 15, 0, 0],
                    alignment: 'center'
                },
                greetings: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 15, 0, 15]
                },
                story: {
                    italic: true,
                    alignment: 'center',
                    width: '50%',
                }
            }
        }

        return description;
    }

    getCurrentDate(format: string) {

        console.log('format = ' + format);
        let transformedDate: string = new DatePipe('en-US').transform(new Date().toISOString(), format);
        console.log('transformedDate = ' + transformedDate);

        return transformedDate;
    }
}