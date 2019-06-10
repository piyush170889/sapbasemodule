import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController, Events } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import { Network } from "@ionic-native/network";
import { ConstantsProvider } from '../constants/constants';
import { DatePipe } from '@angular/common';
import { CallNumber } from '@ionic-native/call-number';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';

declare var cordova: any;

@Injectable()
export class CommonUtilityProvider {

    isNetworkAvailableFlag: boolean = true;
    imgPath: string = '';
    isAsynchTaskCompleted: boolean = false;

    constructor(
        private toastCtrl: ToastController,
        private alertCtrl: AlertController,
        public events: Events,
        private loadingCtrl: LoadingController,
        private network: Network,
        private callNumberNative: CallNumber,
        private databaseProvider: DatabaseProvider,
        public fileOpener: FileOpener) {

        console.log('Hello CommonUtilityProvider Provider');
        this.imgPath = cordova.file.applicationDirectory + 'www/' + ConstantsProvider.CONFIG_DS_IMG_PATH;
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
        // this.databaseProvider.clearDatabase();
    }

    public setTokenInStorage(data: any) {

        console.log('Access Token = ' + data.access_token);
        console.log('Refresh Token = ' + data.refresh_token);

        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refresh-token', data.refresh_token);
        localStorage.setItem('isLoggedIn', '1');
    }

    public hasRole(...rolesToCheck): boolean {

        console.log('rolesToCheck = ' + rolesToCheck);

        // let rolesArray = JSON.parse(localStorage.getItem('roles'));

        let isRolePresent: boolean = false;
        this.isAsynchTaskCompleted = false;

        // this.databaseProvider.getItem('roles')
        this.getRolesFromDb()
            .then(
                res => {
                    console.log('Roles Fetch Res = ' + JSON.stringify(res));
                    let rolesArray: any[] = null;
                    if (res.rows.length > 0) {
                        let rowData: any = res.rows.item(0).data;
                        rolesArray = JSON.parse(rowData);
                        console.log('rolesArray = ' + JSON.stringify(rolesArray));
                    }


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

                    this.isAsynchTaskCompleted = true;
                    // return isRolePresent;
                },
                err => {
                    console.log(JSON.stringify(err));
                    this.isAsynchTaskCompleted = true;
                    // return isRolePresent;
                }
            );

        console.log('Returning Now');

        return isRolePresent;
    }

    public getDocDefination(reportyType, datePeriod, custCity, custName, body) {

        let description = {
            content: [
                { text: 'JAGTAP BUILDING SOLUTIONS', style: 'header' },
                { text: 'Asthavinayak Soc, Opp Bharat Jyoti Stop', alignment: 'center' },
                { text: 'Bibwewadi , Pune - 411037', alignment: 'center' },
                { text: 'Tel No. : (O) 24216162, 9822610611', alignment: 'center' },
                { text: 'Phone no. : 02024216162', alignment: 'center' },
                { text: 'Pin code : 411037', alignment: 'center' },
                { text: 'GSTIN : 27AFJPJ8271L1ZV', alignment: 'center' },
                { text: 'E-Mail : jagtapbsolutions@gmail.com', alignment: 'center' },
                { text: custName, style: 'subheader' },
                // { text: custCity },
                { text: reportyType, style: 'subheader' },
                { text: '' },
                { text: datePeriod, style: 'story' },
                { text: 'Report Date: ' + new DatePipe('en-US').transform(new Date().toISOString(), 'dd MMM yy'), style: 'story' },
                { text: '' },
                {
                    table: {
                        widths: '*',
                        body: body
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center'
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

        // const ROOT_DIRECTORY = this.file.dataDirectory;
        // const downloadFolderName = 'tempJBSDownload';
        // const imageName = 'stamp.jpg';

        // //Create a folder in memory location
        // this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
        //     .then((entries) => {

        //         //Copy our asset/img/FreakyJolly.jpg to folder we created
        //         this.file.copyFile(this.file.applicationDirectory + "www/assets/imgs/", imageName,
        //             ROOT_DIRECTORY + downloadFolderName + '//', imageName)
        //             .then((entries) => {
        //                 this.imgPath = ROOT_DIRECTORY + downloadFolderName + "/" + imageName;

        //                 let description = {
        //                     content: [
        //                         { text: 'JAGTAP BUILDING SOLUTIONS', style: 'header' },
        //                         { text: 'Asthavinayak Soc, Opp Bharat Jyoti Stop', alignment: 'center' },
        //                         { text: 'Bibwewadi , Pune - 411037', alignment: 'center' },
        //                         { text: 'Tel No. : (O) 24216162, 9822610611', alignment: 'center' },
        //                         { text: 'Phone no. : 02024216162', alignment: 'center' },
        //                         { text: 'Pin code : 411037', alignment: 'center' },
        //                         { text: 'GSTIN : 27AFJPJ8271L1ZV', alignment: 'center' },
        //                         { text: 'E-Mail : jagtapbsolutions@gmail.com', alignment: 'center' },
        //                         { text: custName, style: 'subheader' },
        //                         // { text: custCity },
        //                         { text: reportyType, style: 'subheader' },
        //                         { text: '' },
        //                         { text: datePeriod, style: 'story' },
        //                         { text: 'Report Date: ' + new DatePipe('en-US').transform(new Date().toISOString(), 'dd MMM yy'), style: 'story' },
        //                         { text: '' },
        //                         {
        //                             table: {
        //                                 widths: '*',
        //                                 body: body
        //                             }
        //                         },
        //                         { image: this.imgPath, alignment: 'right' }
        //                     ],
        //                     styles: {
        //                         header: {
        //                             fontSize: 18,
        //                             bold: true,
        //                             alignment: 'center'
        //                         },
        //                         cardname: {
        //                             margin: [5, 0, 5, 0]
        //                         },
        //                         subheader: {
        //                             fontSize: 14,
        //                             bold: true,
        //                             margin: [0, 15, 0, 0],
        //                             alignment: 'center'
        //                         },
        //                         story: {
        //                             italic: true,
        //                             alignment: 'center',
        //                             width: '50%',
        //                         }
        //                     }
        //                 }
        //                 return description;
        //             })
        //             .catch((error) => {
        //                 alert('error ' + JSON.stringify(error));
        //             });
        //     })
        //     .catch((error) => {
        //         alert('error ' + JSON.stringify(error));
        //     });

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


    calculateDiffInDays(startDate: Date, endDate: Date) {
        //Get 1 day in milliseconds
        var one_day = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        var date1_ms = startDate.getTime();
        var date2_ms = endDate.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;

        // Convert back to days and return
        let diff = Math.round(difference_ms / one_day);

        console.log('diff = ' + diff);
        return diff;
    }

    calculateDiffInMins(startDate: Date, endDate: Date) {
        //Get 1 day in milliseconds
        var one_day = 1000 * 60;

        // Convert both dates to milliseconds
        var date1_ms = startDate.getTime();
        var date2_ms = endDate.getTime();

        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;

        // Convert back to days and return
        let diff = Math.round(difference_ms / one_day);

        console.log('diff In Mins = ' + diff);
        return diff;
    }

    async getRolesFromDb() {

        console.log('Rnning');

        return await this.databaseProvider.initializeSqlLiteDb().then((db: SQLiteObject) => {
            return db.executeSql('SELECT data FROM metadata WHERE configname=?',
                ['roles']);
        });
    }
}