import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
// import SlidingMarker from 'marker-animate-unobtrusive';
import { ConstantsProvider } from '../../providers/constants/constants';
import { RestserviceProvider } from '../../providers/restservice/restservice';


/**
 * Generated class for the TrackingHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-tracking-history',
  templateUrl: 'tracking-history.html',
})
export class TrackingHistoryPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any = null;
  image = 'assets/imgs/loc-marker.png';
  markers: any = [];
  marker: any = null;
  static DEFAULT_MARKER_ANIMATE_DURATION: number = 2000;
  time: any;
  polyLine: any;
  polyOptions: any = {
    strokeColor: '#4986E7',
    strokeOpacity: 1.0,
    strokeWeight: 2,
    geodesic: true,
  };
  latLongList: any = [];
  min: any = 0;
  minTime: any;
  maxTime: any;
  max: any;
  rangeVal: any = 0;
  distanceTravelled: string;
  trackDate: any;
  adminUser: any;
  adminUserName: string;
  currentDate: string = new Date().toISOString();


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform,
    public restService: RestserviceProvider) {

    this.trackDate = this.navParams.get('trackDate');
    this.adminUser = this.navParams.get('adminUser');

    this.adminUserName = this.adminUser.userDtl.firstName + ' ' + this.adminUser.userDtl.lastName;

    this.getTrackingHistoryForTheDay();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingHistoryPage');
  }


  getTrackingHistoryUrl(): string {

    return ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_USERS 
    + ConstantsProvider.URL_SEPARATOR + this.adminUser.contactNum 
    // + ConstantsProvider.URL_SEPARATOR + this.adminUser.userDtl.userDtlsId 
    + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_TRACKING_HISTORY + this.trackDate;

    // return '';
  }

  getTrackingHistoryForTheDay() {

    let trackingHistoryUrl: string = this.getTrackingHistoryUrl();
    console.log('trackingHistoryUrl = ' + trackingHistoryUrl);

    this.restService.getDetails(trackingHistoryUrl)
      .subscribe(
        (response) => {
          this.distanceTravelled = response.response.distanceTravelled;
          this.latLongList = response.response.trackingData;

          if (this.latLongList.length > 0) {
            this.max = this.latLongList.length - 1;
            this.minTime = this.latLongList[0].time;
            this.maxTime = this.latLongList[this.max].time;
            this.time = this.latLongList[0].time;

            this.initializeAll();
          } 

          console.log("Time - " + this.time + ', Min Time = ' + this.minTime
            + ', maxTime = ' + this.maxTime + ', min = ' + this.min + ', max = ' + this.max);
        }
      );


    // TODO: Remove This
    // TEST DATA
    // let response = {
    //   response: this.fillDummyData()
    // }

    // this.distanceTravelled = response.response.distanceTravelled;
    // this.latLongList = response.response.trackingData;

    // if (this.latLongList.length > 0) {
    //   this.max = this.latLongList.length - 1;
    //   this.minTime = this.latLongList[0].time;
    //   this.maxTime = this.latLongList[this.max].time;
    //   this.time = this.latLongList[0].time;

    //   this.initializeAll();
    // }

    // console.log("Time - " + this.time + ', Min Time = ' + this.minTime
    //   + ', maxTime = ' + this.maxTime + ', min = ' + this.min + ', max = ' + this.max);

  }

  initializeAll() {

    this.platform.ready().then(() => {
      if (this.map != null) {
        let locationOnMap = new google.maps.LatLng(this.latLongList[0].latitude, this.latLongList[0].longitude);
        if (this.marker != null) {
          console.log('map bounds result = ' + this.map.getBounds().contains(locationOnMap));
          this.marker.setPosition(locationOnMap);
          if (!this.map.getBounds().contains(locationOnMap)) {
            console.log('Location not within Boundary. Centering Map with new location');
            this.map.setCenter(locationOnMap);
          }
        } else {
          console.log('No Marker found. Adding new one');
          this.addMarker(locationOnMap, this.image);
        }
        console.log('Added marker On Map');
      } else {
        console.log('Initializing Map');
        this.initMap(this.latLongList[0].latitude, this.latLongList[0].longitude);
        console.log('Initialized Map');
      }
      console.log('Completed On Value ');
    });
  }


  initMap(latitude, longitude) {

    let locationOnMap = new google.maps.LatLng(latitude, longitude);

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 10,
      center: locationOnMap,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    this.addMarker(locationOnMap, this.image);

    //Initialize Polyline
    this.polyLine = new google.maps.Polyline(this.polyOptions);
    this.polyLine.setMap(this.map);
    let path = this.polyLine.getPath();
    path.push(locationOnMap);
  }


  addMarker(location, image) {
    //Create New Marker on Map
    // this.marker = new SlidingMarker({
      this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      // title: "I'm sliding marker",
      // label: 'I am test label',
      icon: image,
      // easing: "easeOutExpo"
    });
    
    // this.marker.setDuration(TrackingHistoryPage.DEFAULT_MARKER_ANIMATE_DURATION);
    // marker.setEasing('linear');
  }


  updatePath() {

    console.log('updatePath() called');

    //Step 1: Redraw polyline from start point to current point through all intermediate points
    let path = this.polyLine.getPath();
    let pathLength: number = path.length;
    let rangeValToCompare = Number.parseInt(this.rangeVal.toString()) + 1;
    console.log('this.rangeVal = ' + this.rangeVal + 'pathLength = ' + pathLength
      + ', rangeValToCompare = ' + rangeValToCompare);

    if (pathLength != rangeValToCompare) {

      if (pathLength < rangeValToCompare) {
        for (let i = pathLength; i <= this.rangeVal; i++) {
          let latitude: any = this.latLongList[i].latitude;
          let longitude: any = this.latLongList[i].longitude;
          console.log('Latitude = ' + latitude + ', longitude = ' + longitude);
          let locationOnMap = new google.maps.LatLng(latitude, longitude);
          path.setAt(i, locationOnMap);
        }
      } else {
        for (let i = rangeValToCompare; i < pathLength; i++) {
          path.removeAt(i);
        }
      }

      let currentLatLongSelected: any = this.latLongList[this.rangeVal];
      let markerLocation = new google.maps.LatLng(currentLatLongSelected.latitude, currentLatLongSelected.longitude);
      this.time = currentLatLongSelected.time;
      //Step 2: Set Marker Position to the latest
      this.marker.setPosition(markerLocation);

      if (!this.map.getBounds().contains(markerLocation)) {
        console.log('Location not within Boundary. Centering Map with new location');
        this.map.setCenter(markerLocation);
      }
    }
  }


  updatePath1() {

    //Step 1: Redraw polyline from start point to current point through all intermediate points
    let path = this.polyLine.getPath();
    let pathLength: number = path.length;
    let rangeValToCompare = Number.parseInt(this.rangeVal.toString()) + 1;
    console.log('this.rangeVal = ' + this.rangeVal + 'pathLength = ' + pathLength
      + ', rangeValToCompare = ' + rangeValToCompare);

    if (pathLength != rangeValToCompare) {

      if (pathLength < rangeValToCompare) {
        for (let i = pathLength; i <= this.rangeVal; i++) {
          let latitude: any = this.latLongList[i].latitude;
          let longitude: any = this.latLongList[i].longitude;
          console.log('Latitude = ' + latitude + ', longitude = ' + longitude);
          let locationOnMap = new google.maps.LatLng(latitude, longitude);
          path.setAt(i, locationOnMap);
        }
      } else {
        for (let i = rangeValToCompare; i < pathLength; i++) {
          path.removeAt(i);
        }
      }

      let currentLatLongSelected: any = this.latLongList[this.rangeVal];
      let markerLocation = new google.maps.LatLng(currentLatLongSelected.latitude, currentLatLongSelected.longitude);
      this.time = currentLatLongSelected.time;
      //Step 2: Set Marker Position to the latest
      this.marker.setPosition(markerLocation);

      if (!this.map.getBounds().contains(markerLocation)) {
        console.log('Location not within Boundary. Centering Map with new location');
        this.map.setCenter(markerLocation);
      }
    }

    //Set the Path Stroke Color
    // var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7' });

    //Loop and Draw Path Route between the Points on MAP
    // for (var i = 0; i < lat_lng.length; i++) {
    //   if ((i + 1) < lat_lng.length) {
    //     let src = lat_lng[i];
    //     var des = lat_lng[i + 1];
    //     path.push(src);
    //     poly.setPath(path);
    //     service.route({
    //       origin: src,
    //       destination: des,
    //       travelMode: google.maps.DirectionsTravelMode.DRIVING
    //     }, function (result, status) {
    //       if (status == google.maps.DirectionsStatus.OK) {
    //         for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
    //           path.push(result.routes[0].overview_path[i]);
    //         }
    //       }
    //     });
    //   }
    // }
    // }
  }


  getTrackingData() {

    console.log('getTrackingData() called');
    console.log('trackDate = ' + this.trackDate);
    this.getTrackingHistoryForTheDay();
  }

  fillDummyData() {

    let response: any = {
      "trackingDate": "2018-12-07",
      "distanceTravelled": "96.9",
      "trackingData": [
        {
          "time": "12:00 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183003"
        },
        {
          "time": "12:00 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183040"
        },
        {
          "time": "12:01 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183100"
        },
        {
          "time": "12:01 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183110"
        },
        {
          "time": "12:01 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183120"
        },
        {
          "time": "12:01 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183134"
        },
        {
          "time": "12:01 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183146"
        },
        {
          "time": "12:01 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183157"
        },
        {
          "time": "12:02 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183209"
        },
        {
          "time": "12:02 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183219"
        },
        {
          "time": "12:02 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183231"
        },
        {
          "time": "12:02 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183245"
        },
        {
          "time": "12:02 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183255"
        },
        {
          "time": "12:03 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183305"
        },
        {
          "time": "12:03 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183321"
        },
        {
          "time": "12:03 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183330"
        },
        {
          "time": "12:03 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183343"
        },
        {
          "time": "12:03 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183353"
        },
        {
          "time": "12:04 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183409"
        },
        {
          "time": "12:04 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183420"
        },
        {
          "time": "12:04 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183431"
        },
        {
          "time": "12:04 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183442"
        },
        {
          "time": "12:04 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183452"
        },
        {
          "time": "12:05 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183513"
        },
        {
          "time": "12:05 AM",
          "address": "",
          "ignition": "0",
          "latitude": 18.104732,
          "longitude": 73.989112,
          "utcDate": "061218",
          "utcTime": "183523"
        }
      ]
    }

    return response;
  }
}
