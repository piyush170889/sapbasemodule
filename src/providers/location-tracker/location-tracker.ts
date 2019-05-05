import { Injectable, NgZone } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { RestserviceProvider } from '../restservice/restservice';
import { ConstantsProvider } from '../constants/constants';
import { DatePipe } from '@angular/common';
import { ToastController } from 'ionic-angular';

declare var BackgroundGeolocation: any;

@Injectable()
export class LocationTrackerProvider {
    public watch: any;
    public lat: number = 0;
    public lng: number = 0;

    constructor(
        public zone: NgZone,
        public geolocation: Geolocation,
        public restService: RestserviceProvider,
        public toastCtrl: ToastController
    ) {

    }

    public startTracking() {
        BackgroundGeolocation.configure({
            locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 10,
            distanceFilter: 10,
            debug: false,
            interval: 100,
            startOnBoot: true,
            notificationsEnabled: false,
            stopOnTerminate: true,
            fastestInterval: 100,
            activitiesInterval: 100,
            url: ConstantsProvider.API_BASE_URL + ConstantsProvider.LOCATION_TRACKING_URL,
            syncUrl: ConstantsProvider.API_BASE_URL + ConstantsProvider.LOCATION_TRACKING_URL,
            httpHeaders: {
                'Content-Type': 'application/json',
            },
            // customize post properties
            postTemplate: {
                "imei": "PiyushBack",
                "latitude": this.lat,
                "longitude": this.lng,
                "utcDt": '030619',
                "utcTm": '030619',
            }
        });

        let container = this;
        BackgroundGeolocation.on('location', function (location: any) {
            // handle your locations here
            console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
            // this.updateLocationToServerBackground(location.latitude, location.longitude);
            // Update inside of Angular's zone
            /* this.zone.run(() => {
                this.lat = location.latitude;
                this.lng = location.longitude;
                this.updateLocationToServerBackground(this.lat, this.lng);
            }); */

            // to perform long running operation on iOS
            // you need to create background task
            BackgroundGeolocation.startTask(function (taskKey: any) {
                // execute long running task
                // eg. ajax post location
                // IMPORTANT: task has to be ended by endTask      
                this.lat = location.latitude;
                this.lng = location.longitude;
                container.updateLocationToServerBackground(location.latitude, location.longitude);
                setTimeout(() => {
                    BackgroundGeolocation.endTask(taskKey);
                }, 2000);
            });
        });

        BackgroundGeolocation.on('stationary', function (stationaryLocation) {
            // handle stationary locations here
            console.log('stationaryLocation BackgroundGeolocation:  ' + stationaryLocation.latitude + ',' + stationaryLocation.longitude);
            this.lat = stationaryLocation.latitude;
            this.lng = stationaryLocation.longitude;
            container.updateLocationToServerBackground(stationaryLocation.latitude, stationaryLocation.longitude);
            // this.updateLocationToServerBackground(stationaryLocation.latitude, stationaryLocation.longitude);
        });

        BackgroundGeolocation.on('error', function (error) {
            console.log('[ERROR] BackgroundGeolocation error:', error.code, error.message);
        });

        BackgroundGeolocation.on('background', function () {
            console.log('[INFO] App is in background');
            // you can also reconfigure service (changes will be applied immediately)
            BackgroundGeolocation.configure({
                locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
                desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
                stationaryRadius: 10,
                distanceFilter: 10,
                debug: false,
                interval: 100,
                notificationsEnabled: false,
                stopOnTerminate: true,
                batchSync: true,       // <-- Set true to sync locations to server in a single HTTP request.
                autoSync: true,         // <-- Set true to sync each location to server as it arrives.
                fastestInterval: 100,
                activitiesInterval: 100,
                url: ConstantsProvider.API_BASE_URL + ConstantsProvider.LOCATION_TRACKING_URL,
                syncUrl: ConstantsProvider.API_BASE_URL + ConstantsProvider.LOCATION_TRACKING_URL,
                httpHeaders: {
                    'Content-Type': 'application/json',
                },
                // customize post properties
                postTemplate: {
                    "imei": "PiyushBackByIme",
                    "latitude": this.lat,
                    "longitude": this.lng,
                    "utcDt": '030619',
                    "utcTm": '030619',
                }
            });
        });

        BackgroundGeolocation.on('foreground', function () {
            console.log('[INFO] App is in foreground');
            BackgroundGeolocation.configure({ debug: false });
        });

        BackgroundGeolocation.on('start', function () {
            console.log('[INFO] BackgroundGeolocation service has been started');
        });

        BackgroundGeolocation.on('stop', function () {
            console.log('[INFO] BackgroundGeolocation service has been stopped');
        });

        BackgroundGeolocation.checkStatus(function (status) {
            console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
            console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
            console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

            // you don't need to check status before start (this is just the example)
            if (!status.isRunning) {
                BackgroundGeolocation.start(); //triggers start on start event
            }
        });

        // Background tracking
        let options = {
            frequency: 15000,
            enableHighAccuracy: false
        };

        this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined)
            .subscribe((position: Geoposition) => {
                console.log(position);

                this.zone.run(() => {
                    this.updateLocationToServerForeground(position.coords.latitude, position.coords.longitude);
                });
            });
    }

    updateLocationToServerBackground(latitude, longitude) {
        this.lat = latitude;
        this.lng = longitude;
        let body: any = {
            "imei": "PiyushBack",
            "latitude": this.lat,
            "longitude": this.lng,
            "utcDt": '030619',
            "utcTm": '030619',
        };
        this.restService.putLocationDetails(ConstantsProvider.API_BASE_URL
            + ConstantsProvider.LOCATION_TRACKING_URL, body).subscribe((response: any) => {
                console.log('After Location send to server in background mode : ', response);
                // const toast = this.toastCtrl.create({
                //     message: 'Updated Location',
                //     duration: 2000
                // });
                // toast.present();
            });
    }


    updateLocationToServerForeground(latitude, longitude) {

        this.lat = latitude;
        this.lng = longitude;
        let body: any = {
            "imei": "PiyushFront",
            "latitude": this.lat,
            "longitude": this.lng,
            "utcDt": new DatePipe('en-US').transform(new Date(), 'ddMMyy'),
            "utcTm": new DatePipe('en-US').transform(new Date(), 'HHmmss'),
        };

        // alert('Sending Location To Server From Foreground');

        this.restService.putLocationDetails(ConstantsProvider.API_BASE_URL
            + ConstantsProvider.LOCATION_TRACKING_URL, body).subscribe((response: any) => {
                console.log('After Location send to server : ', response);

                // const toast = this.toastCtrl.create({
                //     message: 'Updated Location',
                //     duration: 2000
                // });

                // toast.present();
            });
    }

    public stopTracking() {
        console.log('Logging Background');
        console.log(JSON.stringify(typeof BackgroundGeolocation));
        if ("undefined" != typeof BackgroundGeolocation) {
            BackgroundGeolocation.stop(); //triggers start on start event
            this.watch.unsubscribe();
        }
    }
}
