import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { CommonUtilityProvider } from "../../providers/common-utility/common-utility";
import { NativeGeocoderOptions } from "@ionic-native/native-geocoder";


/**
 * Generated class for the PlaceaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;


@IonicPage()
@Component({
  selector: 'page-placeaddress',
  templateUrl: 'placeaddress.html',
})
export class PlaceaddressPage {

  @ViewChild('map') mapElement: ElementRef;

  autocompleteItems;
  autocomplete: any = {
    query: ''
  };
  map: any = null;
  image = 'assets/imgs/loc-marker.png';
  markers: any = [];
  marker: any = null;
  nativeGeocoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 1
  };
  currentLatitude: any = 18.517870;
  currentLongitude: any = 73.844420;
  isAddressUpdated: boolean = false;

  service = new google.maps.places.AutocompleteService();
  geocoder = new google.maps.Geocoder();


  constructor(
    public navParams: NavParams,
    public platform: Platform,
    private geolocation: Geolocation,
    private commonUtility: CommonUtilityProvider,
    private zone: NgZone,
    private view: ViewController,
    // private geoCoderUtility: GeocoderProvider
  ) {

    this.autocompleteItems = [];
    this.currentLatitude = this.navParams.get('latitude');
    this.currentLongitude = this.navParams.get('longitude');

    this.autocomplete.query = this.navParams.get('address');

    if (this.currentLatitude == 0 || this.currentLongitude == 0) {
      this.getCurrentLatLong();
    } else {
      this.isAddressUpdated = true;
      this.initializeAll();
    }

  }

  initializeAll() {

    this.platform.ready().then(() => {
      console.log('Current Latitude = ' + this.currentLatitude + ", Current Longitude = " + this.currentLongitude);
      if (this.map != null) {
        let locationOnMap = new google.maps.LatLng(this.currentLatitude, this.currentLongitude);
        this.updateMarkerPosition(locationOnMap);
        console.log('Added marker On Map');
      } else {
        console.log('Initializing Map');
        this.initMap(this.currentLatitude, this.currentLongitude);
        console.log('Initialized Map');
      }
      console.log('Completed On Value ');
    });
  }


  initMap(latitude, longitude) {

    let locationOnMap = new google.maps.LatLng(latitude, longitude);

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: locationOnMap,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    this.addMarker(locationOnMap, this.image);
  }


  addMarker(location, image) {
    //Create New Marker on Map
    // this.marker = new SlidingMarker({
    this.marker = new google.maps.Marker({
      position: location,
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
      // title: "I'm sliding marker",
      // label: 'I am test label',
      icon: image,
      // easing: "easeOutExpo"
    });
    // this.marker.setDuration(ConstantsProvider.DEFAULT_MARKER_ANIMATE_DURATION);

    let me = this;
    google.maps.event.addListener(this.marker, 'dragend', function (event) {
      let latLng = event.latLng;
      me.currentLatitude = latLng.lat();
      me.currentLongitude = latLng.lng();
      console.log('changed lat = ' + me.currentLatitude + ', changed lon = ' + me.currentLongitude);
      me.geocodePosition(me.marker.getPosition());
    });
  }


  getCurrentLatLong() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLatitude = resp.coords.latitude;
      this.currentLongitude = resp.coords.longitude;
      console.log('this.currentLatitude = ' + this.currentLatitude + ', this.currentLongitude = ' + this.currentLongitude);

      let locationOnMap = new google.maps.LatLng(this.currentLatitude, this.currentLongitude);

      this.autocomplete.query = this.geocodePosition(locationOnMap);
    }).catch((error) => {
      console.log('Error getting location', error);
      this.commonUtility.presentErrorToast(JSON.stringify(error));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceaddressPage');
  }

  chooseItem(item: any) {
    // console.log(JSON.stringify(item));
    this.autocomplete.query = item.description;
    this.geoCode(item);//convert Address to lat and long
    this.autocompleteItems = [];
    this.isAddressUpdated = true;
  }

  updateSearch() {

    this.isAddressUpdated = false;

    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }

    let me = this;
    this.service.getPlacePredictions({
      input: this.autocomplete.query,
      componentRestrictions: {
        country: 'in'
      }
    }, (predictions, status) => {
      me.autocompleteItems = [];

      me.zone.run(() => {
        if (predictions != null) {
          // console.log('predictions = ' + JSON.stringify(predictions));
          predictions.forEach((prediction) => {
            me.autocompleteItems.push(prediction);
          });
        }
      });
    });
  }

  //convert Address string to lat and long
  geoCode(item: any) {

    this.geocoder.geocode({ 'address': item.description }, (results, status) => {
      this.currentLatitude = results[0].geometry.location.lat();
      this.currentLongitude = results[0].geometry.location.lng();
      // alert("lat: " + this.currentLatitude + ", long: " + this.currentLongitude);

      let locationOnMap = new google.maps.LatLng(this.currentLatitude, this.currentLongitude);
      this.updateMarkerPosition(locationOnMap);
    });
  }

  updateMarkerPosition(locationOnMap: any) {

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
  }


  updateGeoFenceAddress() {

    if (this.isAddressUpdated) {
      const modalData = {
        address: this.autocomplete.query,
        latitude: this.currentLatitude,
        longitude: this.currentLongitude,
        isAdded: true
      }

      this.view.dismiss(modalData);
    } else {
      this.commonUtility.presentErrorToast('Please select appropriate address');
    }
  }

  dismissModal() {
    const modalData = {
      address: this.autocomplete.query,
      latitude: this.currentLatitude,
      longitude: this.currentLongitude,
      isAdded: false
    }

    this.view.dismiss(modalData);
  }

  geocodePosition(pos) {

    let me = this;
    this.geocoder.geocode
      (
        {
          latLng: pos
        },
        function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            console.log('geo coded current address = ' + results[0].formatted_address);
            me.autocomplete.query = results[0].formatted_address;
            me.isAddressUpdated = true;
            me.initializeAll();
          }
          else {
            this.commonUtility.presentToast('Cannot determine address at this location.', 5000);
          }
        }
      );
  }

}

