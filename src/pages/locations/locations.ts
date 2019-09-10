import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ConstantsProvider } from '../../providers/constants/constants';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { GeoFence } from '../visit-add-site/domain-geofence';
import { Network } from '@ionic-native/network';
import { SQLiteObject } from '@ionic-native/sqlite';
import * as moment from 'moment-timezone';


/**
 * Generated class for the LocationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {

  locationsList: any[] = [];
  tillDate: any = '';
  isDataSynching: boolean = false;
  momentjs: any = moment;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private databaseProvider: DatabaseProvider,
    private commonUtility: CommonUtilityProvider,
    private restService: RestserviceProvider,
    private modal: ModalController,
    private network: Network
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationsPage');
  }

  ionViewDidEnter() {

    console.log('ionViewDidEnter LocationsPage');
    this.updateLocationFromDb();

    this.databaseProvider.getMetaData(ConstantsProvider.CONFIG_NM_LOCATION_UPDATE_TS)
      .subscribe(response => {

        console.log('Response = ' + JSON.stringify(response));

        if (response && response.rows.length > 0) {

          this.tillDate = response.rows.item(0).data;
          console.log('tillDate = ' + this.tillDate + ', Response = ' + JSON.stringify(response));


          let timeSinceLastSync: number = this.commonUtility.calculateDiffInMins(new Date(this.tillDate), new Date());
          console.log('Till Date : ' + this.tillDate + ', Current Date = ' + new Date() + ', timeSinceLastSync = ' + timeSinceLastSync);

          if (timeSinceLastSync >= 30) {
            console.log('Synching Data');
            this.syncLocationData();
          } else {
            console.log('Not Synching Data');
          }
        } else {
          this.syncLocationData();
        }
      }
      );

  }

  syncLocationData() {

    console.log('Synching Data');
    this.isDataSynching = true;

    if (this.network.type != "unknown" && this.network.type != "none" && this.network.type != undefined) {

      let locationDataApiEndpoint: string = ConstantsProvider.API_BASE_URL + ConstantsProvider.LOCATION_URL;

      this.restService.getDetailsWithoutLoader(locationDataApiEndpoint)
        .subscribe(
          (response) => {
            this.isDataSynching = false;

            console.log('Location Data = ' + JSON.stringify(response.response));
            let locationDetailsList: any[] = response.response;

            this.databaseProvider.initializeSqlLiteDb().then((db: SQLiteObject) => {

              db.executeSql('SELECT data from metadata where configname=?',
                [ConstantsProvider.CONFIG_NM_LOCATIONS_DATA])
                .then(
                  res => {
                    if (res.rows.length > 0) {
                      this.updateLocationsDetailsFromApi(locationDetailsList);
                    } else {
                      db.executeSql('INSERT INTO metadata(configname, data) VALUES(?,?)',
                        [ConstantsProvider.CONFIG_NM_LOCATIONS_DATA, JSON.stringify(locationDetailsList)])
                        .then(res => {

                          console.log('Inserted Location Record');

                          this.locationsList = locationDetailsList;

                          this.updateLocationLastUpdatedTs();

                          this.isDataSynching = false;
                        })
                        .catch(e => {
                          console.log(JSON.stringify(e))
                          this.isDataSynching = false;
                        })
                    }
                  }
                )
                .catch(e => {
                  console.log(JSON.stringify(e))
                  this.isDataSynching = false;
                })
            })
              .catch(e => {
                console.log(JSON.stringify(e))
                this.isDataSynching = false;
              })
          },
          (err) => {
            this.isDataSynching = false;
          }
        );
    } else {
      this.commonUtility.presentErrorToast('No Internet Connection');
      this.isDataSynching = false;
    }
  }

  updateLocationsDetailsFromApi(locationDetailsList: any[]) {

    this.databaseProvider.initializeSqlLiteDb().then((db: SQLiteObject) => {
      db.executeSql('UPDATE metadata set data=? WHERE configname=?', [JSON.stringify(locationDetailsList),
      ConstantsProvider.CONFIG_NM_LOCATIONS_DATA])
        .then(
          res => {
            console.log('Updated Location Record');

            this.locationsList = locationDetailsList;
            this.updateLocationLastUpdatedTs();
          }
        )
        .catch(e => {
          console.log(JSON.stringify(e))
        });
    })
      .catch(e => {
        console.log(JSON.stringify(e))
      })
  }

  updateLocationFromDb() {
    this.databaseProvider.getMetaData(ConstantsProvider.CONFIG_NM_LOCATIONS_DATA)
      .subscribe(
        (res) => {
          if (res && res != undefined) {

            if (res.rows.length > 0) {

              console.log('Locations Data = ' + res.rows.item(0).data);

              this.locationsList = JSON.parse(res.rows.item(0).data);
            }
          }

          this.databaseProvider.getMetaData(ConstantsProvider.CONFIG_NM_LOCATION_UPDATE_TS)
            .subscribe(response => {

              console.log('Response = ' + JSON.stringify(response));

              if (response && response.rows.length > 0) {

                this.tillDate = response.rows.item(0).data;
                console.log('tillDate = ' + this.tillDate);
              }
            }
            );
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

  addNewLocation() {

    console.log('addNewLocation VisitHistoryPage');

    this.createAddGeoFenceModal(null, true);
  }


  updateLocation(geoFence: GeoFence) {

    console.log('updateGeoFence() called');

    this.createAddGeoFenceModal(geoFence, false);
  }


  createAddGeoFenceModal(modalData: GeoFence, isAddOperation: boolean) {

    let addUpdateGeoFenceModal: Modal = this.modal.create('VisitAddSitePage', {
      isAddOperation: isAddOperation,
      modalData: modalData
    });

    addUpdateGeoFenceModal.present();

    addUpdateGeoFenceModal.onDidDismiss(
      (addUpdateGeoFenceModalData) => {
        console.log('addUpdateGeoFenceModalData = ' + JSON.stringify(addUpdateGeoFenceModalData));

        if (addUpdateGeoFenceModalData.isAdded) {

          let updatedGeoFenceData: GeoFence = addUpdateGeoFenceModalData.geoFenceData;

          let addLocationApiEndpoint: string = ConstantsProvider.API_BASE_URL + ConstantsProvider.LOCATION_URL;

          this.restService.postDetails(addLocationApiEndpoint, updatedGeoFenceData)
            .subscribe(
              (response) => {

                if (isAddOperation) {

                  console.log('Add Location Response = ' + JSON.stringify(response));
                  updatedGeoFenceData = response.response;
                  this.locationsList.push(updatedGeoFenceData);
                  console.log('Added Location List with new Added Data');
                  this.commonUtility.presentToast('Added New Location Successfully', 5000);
                } else {

                  console.log('Update Location Response = ' + JSON.stringify(response));
                  let index = this.locationsList.indexOf(modalData);
                  if (index > -1) {
                    this.locationsList[index] = updatedGeoFenceData;
                    console.log('Updated locations List with updated Data');
                    this.commonUtility.presentToast('Updated Location Successfully', 5000);
                  }
                }

                this.databaseProvider.setItem(ConstantsProvider.CONFIG_NM_LOCATIONS_DATA, JSON.stringify(this.locationsList));
              }
            );
        }
      });
  }

  updateLocationLastUpdatedTs() {

    let tillDateUpdated = new Date().toISOString();
    this.databaseProvider.setItem(ConstantsProvider.CONFIG_NM_LOCATION_UPDATE_TS, tillDateUpdated);

    this.updateLocationFromDb();
    this.tillDate = tillDateUpdated;
  }

  viewLocationDetails(location: any) {

    console.log('viewLocationDetails LocationsPage');

    this.navCtrl.push('LocationsDetailsPage', {
      location: location
    });
  }

}
