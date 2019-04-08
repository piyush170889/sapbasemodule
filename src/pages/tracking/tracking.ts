import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import * as firebase from 'Firebase';
import SlidingMarker from 'marker-animate-unobtrusive';
import { GeocoderProvider } from "../../providers/geocoder/geocoder";

/**
 * Generated class for the TrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 declare var google: any;

@IonicPage()
@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html',
})
export class TrackingPage {

  latitude: any = '0';
  longitude: any = '0';
  index: number = 1;
  firebaseId: string;
  nodeName: string = 'aaditInfra/';
  @ViewChild('map') mapElement: ElementRef;
  map: any = null;
  image = 'assets/imgs/loc-marker.png';
  markers: any = [];
  marker: any = null;
  oldPosition: any;
  static DEFAULT_MARKER_ANIMATE_DURATION: number = 2000;
  lastUpdatedTs: any;
  address: any;
  adminUser: any;
  adminUserName: string = '';

  ref: firebase.database.Reference;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public geocoderProvider: GeocoderProvider
  ) {

    this.firebaseId = this.navParams.get('firebaseId');
    // this.firebaseId = '-LPQ6hb8cXTSUnwz7ejX';
    this.adminUser = this.navParams.get('adminUser');

    this.adminUserName = this.adminUser.userDtl.firstName + ' ' + this.adminUser.userDtl.lastName;
    console.log('Admin User Name = ' + this.adminUserName  
    + ", firebaseId = " + this.firebaseId);

    this.ref = firebase.database().ref(this.nodeName + this.firebaseId);

    platform.ready().then(() => {

      this.ref.on('value', resp => {
        console.log('Getting Value From FCM');
        let data = resp.val();
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.lastUpdatedTs = data.updatedTs;

        if (null != this.latitude && '0' != this.latitude && '' != this.latitude && null != this.longitude
          && '' != this.longitude && '0' != this.longitude) {
          this.geocoderProvider.reverseGeocode(this.latitude, this.longitude)
            .subscribe(
            (response) => {
              this.address = response;
            }
            );
        } else {
          this.address = 'Address Not Available';
        }

        // this.address = 'Address Not Available';

        console.log(this.index + " : " + " Latitude = " + data.latitude + ", Longitude = " + data.longitude
          + ", Key = " + resp.key + ", Updated Ts - " + this.lastUpdatedTs);

        if (this.map != null) {
          let locationOnMap = new google.maps.LatLng(this.latitude, this.longitude);
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
          this.initMap(this.latitude, this.longitude);
          console.log('Initialized Map');
        }
        console.log('Completed On Value ');
      });

    });
  }

  initMap(latitude, longitude) {

    let locationOnMap = new google.maps.LatLng(latitude, longitude);

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 14,
      center: locationOnMap,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    this.addMarker(locationOnMap, this.image);
  }

  addMarker(location, image) {
    //Create New Marker on Map
    this.marker = new SlidingMarker({
      position: location,
      map: this.map,
      // title: "I'm sliding marker",
      // label: 'I am test label',
      icon: image,
      easing: "easeOutExpo"
    });
    this.marker.setDuration(TrackingPage.DEFAULT_MARKER_ANIMATE_DURATION);
    // marker.setEasing('linear');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingPage');
  }

}
