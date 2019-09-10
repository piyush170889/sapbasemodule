import { Injectable, NgZone } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { RestserviceProvider } from '../restservice/restservice';
import { ConstantsProvider } from '../constants/constants';
import { ToastController, Events } from 'ionic-angular';
import * as moment from 'moment-timezone';
import { BackgroundGeolocation, BackgroundGeolocationLocationProvider, BackgroundGeolocationEvents, ServiceStatus, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { HttpClient } from '@angular/common/http';
import { Network } from '@ionic-native/network';
import { Observable } from 'rxjs';
import { DatabaseProvider } from '../database/database';


@Injectable()
export class LocationTrackerProvider {
    public watch: any;
    public lat: number = 0;
    public lng: number = 0;
    momentjs: any = moment;
    lastUpdateTime: Date;
    minFrequency = 60 * 1000;

    constructor(
        public zone: NgZone,
        public geolocation: Geolocation,
        public restService: RestserviceProvider,
        public toastCtrl: ToastController,
        private backgroundGeolocation: BackgroundGeolocation,
        private http: HttpClient,
        private network: Network,
        private databaseProvider: DatabaseProvider,
        private events: Events
    ) {
        this.lastUpdateTime = new Date();
    }

    public startTracking() {

        this.backgroundGeolocation.configure({
            locationProvider: BackgroundGeolocationLocationProvider.ACTIVITY_PROVIDER,
            desiredAccuracy: 100,   //Change to ENUM from BackgroundGeolocationAccuracy
            stationaryRadius: 10,
            debug: false,
            distanceFilter: 10,
            stopOnTerminate: false,
            interval: 1000,
            fastestInterval: 1000,
            activitiesInterval: 1000,
            // notificationsEnabled: false,
            notificationTitle: 'JBS',
            notificationText: ''
        });

        this.backgroundGeolocation.on(BackgroundGeolocationEvents.location)
            .subscribe(
                (response: BackgroundGeolocationResponse) => {
                    console.log('Current Location Response = ' + JSON.stringify(response));
                    this.updateLocationToServerForeground(response.latitude, response.longitude);
                }
            );

        this.backgroundGeolocation.on(BackgroundGeolocationEvents.stationary)
            .subscribe(
                (response: any) => {
                    console.log('Stationary Response = ' + JSON.stringify(response));
                    this.updateLocationToServerBackground(response.latitude, response.longitude);
                }
            );

        this.backgroundGeolocation.on(BackgroundGeolocationEvents.error)
            .subscribe(
                (response: any) => {
                    console.log('Error Response = ' + JSON.stringify(response));
                }
            );

        this.backgroundGeolocation.on(BackgroundGeolocationEvents.background)
            .subscribe(
                (response) => {
                    console.log('[INFO] App is in background');
                    // you can also reconfigure service (changes will be applied immediately)
                    // this.backgroundGeolocation.configure({ debug: true });
                }
            );


        this.backgroundGeolocation.on(BackgroundGeolocationEvents.foreground)
            .subscribe(
                (response) => {
                    console.log('Foreground Response = ' + JSON.stringify(response));
                    console.log('[INFO] App is in foreground');
                    this.backgroundGeolocation.configure({ debug: false });
                }
            );

        this.backgroundGeolocation.on(BackgroundGeolocationEvents.start)
            .subscribe(
                (response) => {
                    console.log('Start Response = ' + JSON.stringify(response));
                    console.log('[INFO] BackgroundGeolocation service has been started');
                }
            );


        this.backgroundGeolocation.on(BackgroundGeolocationEvents.stop)
            .subscribe(
                (response) => {
                    console.log('[INFO] BackgroundGeolocation service has been stopped');
                    console.log('Stop Response = ' + JSON.stringify(response));
                }
            );

        this.backgroundGeolocation.checkStatus().then(
            (serviceStatus: ServiceStatus) => {
                console.log('[INFO] BackgroundGeolocation service is running', serviceStatus.isRunning);
                console.log('[INFO] BackgroundGeolocation services enabled', serviceStatus.locationServicesEnabled);
                console.log('[INFO] BackgroundGeolocation auth status: ' + serviceStatus.authorization);

                // you don't need to check status before start (this is just the example)
                if (!serviceStatus.isRunning) {
                    this.backgroundGeolocation.start(); //triggers start on start event
                }
            }
        )

        //Background Geolocation Configs
        this.backgroundGeolocation.getConfig().then(
            (config: any) => {
                console.log('Background Geolocation Configs = ' + JSON.stringify(config));
            }
        );

        // Background tracking
        let options = {
            enableHighAccuracy: false,
            timeout: 10000
        };

        this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined)
            .subscribe((position: Geoposition) => {

                let now: Date = new Date();

                console.log('Watch Position Calling run on zone');
                console.log('this.lastUpdateTime = ' + this.momentjs(this.lastUpdateTime).format('HHmmss')
                    + ', Now = ' + this.momentjs(now).format('HHmmss'))

                if (this.lastUpdateTime && (now.getTime() - this.lastUpdateTime.getTime() > this.minFrequency)) {
                    this.lastUpdateTime = now;
                    this.zone.run(() => {
                        this.updateLocationToServerForeground(position.coords.latitude, position.coords.longitude);
                    });
                }
            });
    }


    updateLocationToServerForeground(latitude: any, longitude: any) {

        console.log('Sending Location In Foreground');
        this.updateLocation(latitude, longitude);
    }

    public updateLocationToServerBackground(latitude, longitude) {

        console.log('Sending Location In Background');
        this.updateLocation(latitude, longitude);
    }

    updateLocation(latitude, longitude) {


        this.databaseProvider.getItem('userDetails')
            .then(
                res => {
                    if (res.rows.length > 0) {
                        let rowData: any = res.rows.item(0).data;
                        let userDetails = null != rowData ? JSON.parse(rowData) : null;

                        if (userDetails) {
                            console.log('Logged In Username = ' + userDetails.username);
                            this.lat = latitude;
                            this.lng = longitude;

                            let body: any = {
                                imei: userDetails.username,
                                latitude: this.lat,
                                longitude: this.lng,
                                utcDt: this.momentjs(new Date()).format('DDMMYY'),
                                utcTm: this.momentjs(new Date()).format('HHmmss'),
                            };

                            this.putLocationDetails(ConstantsProvider.API_BASE_URL
                                + ConstantsProvider.LOCATION_TRACKING_URL, body).subscribe((response: any) => {
                                    console.log('After Location send to server Foreground : ', response);
                                });
                        } else {
                            console.log('Publishing unauthorized:requestError event');
                            this.events.publish("unauthorized:requestError");
                        }
                    } else {
                        console.log('Publishing unauthorized:requestError event');
                        this.events.publish("unauthorized:requestError");
                    }
                });
    }

    public stopTracking() {

        console.log('Logging Background = ' + JSON.stringify(typeof this.backgroundGeolocation));

        try {
            this.backgroundGeolocation.stop(); //triggers start on start event
            this.watch.unsubscribe();
        } catch (e) {
            console.log('e = ' + JSON.stringify(e));
        }
    }


    putLocationDetails(url: string, data: any) {

        console.log('Put URL -> ' + url);
        console.log('Put Data -> ' + JSON.stringify(data));

        if (this.network.type != "unknown" && this.network.type != "none" && this.network.type != undefined) {

            return this.http.put(url, data)
                .map(response => {
                    return response;
                })
                .catch((err: any) => {
                    console.log("Error - " + JSON.stringify(err));
                    return Observable.throw(err);
                });
        }
    }

}
