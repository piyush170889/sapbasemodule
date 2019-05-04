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
            stationaryRadius: 50,
            distanceFilter: 50,
            notificationTitle: 'Background tracking',
            notificationText: 'enabled',
            debug: false,
            interval: 100,
            fastestInterval: 500,
            activitiesInterval: 100,
            /*  url: 'http://192.168.81.15:3000/location',
             httpHeaders: {
                 'X-FOO': 'bar'
             },
             // customize post properties
             postTemplate: {
                 lat: '@latitude',
                 lon: '@longitude',
                 foo: 'bar' // you can also add your own properties
             } */
        });

        BackgroundGeolocation.on('location', function (location) {
            // handle your locations here
            console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
            // Update inside of Angular's zone
            this.zone.run(() => {
                this.lat = location.latitude;
                this.lng = location.longitude;

                this.updateLocationToServerBackground(this.lat, this.lng);
            });

            // to perform long running operation on iOS
            // you need to create background task
            BackgroundGeolocation.startTask(function (taskKey) {
                // execute long running task
                // eg. ajax post location
                // IMPORTANT: task has to be ended by endTask
                // BackgroundGeolocation.endTask(taskKey);
            });
        });

        BackgroundGeolocation.on('stationary', function (stationaryLocation) {
            // handle stationary locations here
            console.log('stationaryLocation BackgroundGeolocation:  ' + stationaryLocation.latitude + ',' + stationaryLocation.longitude);
            this.updateLocationToServerBackground(stationaryLocation.latitude, stationaryLocation.longitude);
        });

        BackgroundGeolocation.on('error', function (error) {
            console.log('[ERROR] BackgroundGeolocation error:', error.code, error.message);
        });

        BackgroundGeolocation.on('background', function () {
            console.log('[INFO] App is in background');
            // you can also reconfigure service (changes will be applied immediately)
            BackgroundGeolocation.configure({ debug: true });
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
                console.log('After Location send to server : ', response);

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
        // let userDetails: any = JSON.parse(localStorage.getItem('userDetails') == undefined || localStorage.getItem('userDetails') == null ? '{}' : localStorage.getItem('userDetails'));
        let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));

        let body: any = {
            "imei": userDetails.userDtl.userDtlsId,
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
