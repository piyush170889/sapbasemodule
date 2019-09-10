import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Geolocation } from '@ionic-native/geolocation';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { Diagnostic } from '@ionic-native/diagnostic';
import { ConstantsProvider } from '../../providers/constants/constants';
import { RestserviceProvider } from '../../providers/restservice/restservice';

/**
 * Generated class for the PunchEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-punch-entry',
  templateUrl: 'punch-entry.html',
})
export class PunchEntryPage {

  visitPurpose: any;
  selectedLocationDetails: any;
  locationsList: any[] = [];


  constructor(
    public navParams: NavParams,
    private restService: RestserviceProvider,
    private databaseProvider: DatabaseProvider,
    private commonUtility: CommonUtilityProvider,
    private geolocation: Geolocation,
    private diagnostic: Diagnostic,
    private view: ViewController
  ) {

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad PunchEntryPage');
  }

  ionViewDidEnter() {

    console.log('ionViewDidEnter PunchEntryPage');

    this.updateLocationFromDb();
  }

  punchEntry() {

    console.log('punchEntry PunchEntryPage');

    console.log('selectedLocationDetails = ' + JSON.stringify(this.selectedLocationDetails) + ', \n Visit Purpose = ' + this.visitPurpose);

    if (this.selectedLocationDetails && this.visitPurpose
      && this.selectedLocationDetails != undefined && this.visitPurpose != undefined) {

      this.diagnostic.isLocationEnabled().then((available) => {
        if (available) {
          this.getCurrentLatLong()
            .then((resp) => {

              let userLat = resp.coords.latitude;
              let userLong = resp.coords.longitude;
              console.log('currentLatitude = ' + userLat + ', currentLongitude = ' + userLong);

              let currentDistanceFromPunchingLocation = this.commonUtility.distance(this.selectedLocationDetails.latitude,
                this.selectedLocationDetails.longitude, userLat, userLong, "K");

              console.log('currentDistanceFromPunchingLocation = ' + currentDistanceFromPunchingLocation);
              if (currentDistanceFromPunchingLocation <= 0.5) {

                let punchEntryRequest = {
                  latitude: userLat,
                  longitude: userLong,
                  visitPurpose: this.visitPurpose,
                  siteDtls: {
                    geofencingDtlsId: this.selectedLocationDetails.geofencingDtlsId,
                    geofenceName: this.selectedLocationDetails.geofenceName
                  }
                }

                console.log('punchEntryRequest = ' + JSON.stringify(punchEntryRequest));

                let punchSiteEntryApiEndpoint = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_USERS
                  + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_ADMIN_USERS
                  + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_PUNCH_SITE_ENTRY;

                this.restService.postDetails(punchSiteEntryApiEndpoint, punchEntryRequest)
                  .subscribe(
                    (response) => {
                      console.log('Punch Entry Response = ' + JSON.stringify(response.response));

                      let punchEntryModalData = {
                        isAdded: true,
                        punchEntryData: response.response
                      }

                      this.view.dismiss(punchEntryModalData);
                    }
                  )
              } else {
                this.commonUtility.presentToast('Please be under atleast 100 M distance of the location that you are Punching the entry for', 8000);
              }
            }).catch((error) => {
              this.commonUtility.presentErrorToast(JSON.stringify(error));
              console.log('Error getting location', error);
            });
        } else {
          this.diagnostic.switchToLocationSettings();
        }
      }).catch((error) => {
        this.commonUtility.presentErrorToast(JSON.stringify(error));
        console.log('Error getting location', error);
      });
    } else {
      this.commonUtility.presentToast('Please select appropriate values', 5000);
    }
  }

  updateLocationFromDb() {

    this.databaseProvider.getMetaData(ConstantsProvider.CONFIG_NM_LOCATIONS_DATA)
      .subscribe(
        (res: any) => {
          if (res && res != undefined) {

            if (res.rows.length > 0) {

              console.log('Locations Data = ' + res.rows.item(0).data);

              this.locationsList = JSON.parse(res.rows.item(0).data);
            }
          }
        }
      );
  }

  // updateLocationFromDb() {

  //   this.locationsList.push({
  //     geofencingDtlsId: 1,
  //     geofenceName: "Aaradhya Enterprises",
  //     cardCode: "C0004",
  //     geofenceAddr: "1, Mahadev Nagar, Dhayari, Pune, Maharashtra 411041, India",
  //     latitude: 18.4417531,
  //     longitude: 73.8145203
  //   }, {
  //       geofencingDtlsId: 2,
  //       geofenceName: "A S Enterprises",
  //       cardCode: "",
  //       geofenceAddr: "1, Mahadev Nagar, Dhayari, Pune, Maharashtra 411041, India",
  //       latitude: 18.4417531,
  //       longitude: 73.8145203
  //     })
  // }


  getCurrentLatLong() {

    return this.geolocation.getCurrentPosition();
  }

  dismissModal() {
    const modalData = {
      isAdded: false
    };
    this.view.dismiss(modalData);
  }

}
