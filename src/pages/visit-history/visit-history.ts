import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, PopoverController } from 'ionic-angular';
import * as moment from 'moment-timezone';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { ConstantsProvider } from '../../providers/constants/constants';
import { SQLiteObject } from '@ionic-native/sqlite';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { Network } from '@ionic-native/network';
import { DatabaseProvider } from '../../providers/database/database';
import { GeoFence } from '../visit-add-site/domain-geofence';
import { Diagnostic } from '@ionic-native/diagnostic';
import { GeocoderProvider } from '../../providers/geocoder/geocoder';
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the VisitHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visit-history',
  templateUrl: 'visit-history.html',
})
export class VisitHistoryPage {

  sortOrder: number = 0;
  momentjs: any = moment;
  tillDate: string = '';
  isDataSynching: boolean = false;
  visitHistoryList: any[] = [];
  myInput: string = '';
  // orginalVisitList: any[] = [];
  orginalListDuplicate: any[] = [];
  locationsList: GeoFence[] = [];
  rolesArray: any[] = [];
  isAdmin: boolean = false;
  selectedCustomer: any = null;
  originalVisitHistoryList: any[] = [];
  fromDate: any = '';
  toDate: any = '';
  salesExecutive: any = '';
  visitHistoryListDuplicate: any[] = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private commonUtility: CommonUtilityProvider,
    private network: Network,
    private restService: RestserviceProvider,
    private databaseProvider: DatabaseProvider,
    private modal: ModalController,
    private diagnostic: Diagnostic,
    private geolocation: Geolocation,
    private geoCoderProvider: GeocoderProvider,
    private popOverController: PopoverController
  ) {

    this.isDataSynching = false;

    this.updateVisitsDataFromDB();

    this.databaseProvider.getMetaData(ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS_VISITS)
      .subscribe(response => {
        if (response && response.rows.length > 0) {

          this.tillDate = response.rows.item(0).data;
          console.log('tillDate = ' + this.tillDate + ', Response = ' + JSON.stringify(response));

          let timeSinceLastSync: number = this.commonUtility.calculateDiffInMins(new Date(this.tillDate), new Date());
          console.log('Till Date : ' + this.tillDate + ', Current Date = ' + new Date() + ', timeSinceLastSync = ' + timeSinceLastSync);

          if (timeSinceLastSync >= 30) {
            console.log('Synching Data');
            this.syncVisitData();
          } else {
            console.log('Not Synching Data');
          }
        } else {
          console.log('Synching Data');
          this.syncVisitData();
        }
      }
      );
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad VisitHistoryPage');
  }

  addNewLocation() {

    console.log('addNewLocation VisitHistoryPage');

    this.createAddGeoFenceModal(null, true);
  }

  syncVisitData() {

    console.log('syncVisitData VisitHistoryPage');

    this.syncLocationData();

    let adminUsersLocationDetailsApiEndpoint = ConstantsProvider.API_BASE_URL
      + ConstantsProvider.API_ENDPOINT_USERS + ConstantsProvider.URL_SEPARATOR
      + ConstantsProvider.API_ENDPOINT_ADMIN_USERS + ConstantsProvider.URL_SEPARATOR
      + ConstantsProvider.API_ENDPOINT_SYNC_VISIT_DATA;
    console.log('adminUsersLocationDetailsApiEndpoint = ' + adminUsersLocationDetailsApiEndpoint);

    if (this.network.type != "unknown" && this.network.type != "none" && this.network.type != undefined) {

      this.isDataSynching = true;

      this.restService.getDetailsWithoutLoader(adminUsersLocationDetailsApiEndpoint)
        .subscribe(
          (response) => {
            this.isDataSynching = false;

            console.log('Visit History Data = ' + JSON.stringify(response.response));
            let visitDetailsList: any[] = response.response;

            this.databaseProvider.initializeSqlLiteDb().then((db: SQLiteObject) => {

              db.executeSql('SELECT data from metadata where configname=?',
                [ConstantsProvider.CONFIG_NM_VISITS_DATA])
                .then(
                  res => {
                    if (res.rows.length > 0) {
                      this.updateVisitDetailsFromApi(visitDetailsList);
                    } else {
                      db.executeSql('INSERT INTO metadata(configname, data) VALUES(?,?)',
                        [ConstantsProvider.CONFIG_NM_VISITS_DATA, JSON.stringify(visitDetailsList)])
                        .then(res => {
                          console.log('Inserted Visits Record');
                          this.updateLastUpdatedTs();
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

  syncLocationData() {

    console.log('Synching Location Data');
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

  updateLocationLastUpdatedTs() {

    let tillDateUpdated = new Date().toISOString();
    this.databaseProvider.setItem(ConstantsProvider.CONFIG_NM_LOCATION_UPDATE_TS, tillDateUpdated);

    this.tillDate = tillDateUpdated;
  }

  onInput() {

    console.log('onInput VisitHistoryPage');
    console.log('searchTerm = ' + this.myInput);

    let searchVal = this.myInput;

    // if the value is an empty string don't filter the items
    if (searchVal && searchVal.trim() != '') {

      this.visitHistoryList = this.visitHistoryListDuplicate.filter((visitDetailsObj: any) => {

        let searchValLowerCase = searchVal.toLowerCase();

        if (visitDetailsObj.siteDtls.geofenceName
          && visitDetailsObj.siteDtls.geofenceName.toLowerCase().indexOf(searchValLowerCase) > -1)
          return true;
        else
          return false;
      });

      console.log('Visits List Length = ' + this.visitHistoryList.length);
    } else {
      this.visitHistoryList = this.orginalListDuplicate;
      this.originalVisitHistoryList = this.orginalListDuplicate;
    }
  }

  updateVisitDetailsFromApi(visitDetailsList: any[]) {

    this.databaseProvider.initializeSqlLiteDb().then((db: SQLiteObject) => {
      db.executeSql('UPDATE metadata set data=? WHERE configname=?', [JSON.stringify(visitDetailsList),
      ConstantsProvider.CONFIG_NM_VISITS_DATA])
        .then(
          res => {
            console.log('Updated Visit History');

            db.executeSql('SELECT data from metadata where configname=?',
              [ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS_VISITS])
              .then(
                res => {
                  if (res.rows.length > 0) {
                    this.updateLastUpdatedTs();
                  } else {
                    db.executeSql('INSERT INTO metadata(configname, data) VALUES(?,?)',
                      [ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS_VISITS, new Date().toISOString()])
                      .then(res => {
                        console.log('Inserted Visit History Last Updated Ts Record');
                        // this.updateLastUpdatedTs();
                      })
                      .catch(e => console.log(JSON.stringify(e)));
                  }
                }
              );
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

  updateLastUpdatedTs() {

    this.databaseProvider.initializeSqlLiteDb().then((db: SQLiteObject) => {
      let updatedTs = new Date().toISOString();
      this.tillDate = updatedTs;
      db.executeSql('UPDATE metadata set data=? WHERE configname=?', [updatedTs,
        ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS_VISITS])
        .then(
          res => {
            console.log('Updated Last Updated Ts OF Visit History');
            this.updateVisitsDataFromDB();
            this.isDataSynching = false;
          }
        )
        .catch(e => {
          console.log(JSON.stringify(e))
        })
    })
      .catch(e => {
        console.log(JSON.stringify(e))
      })
  }

  updateVisitsDataFromDB() {

    this.databaseProvider.getMetaData(ConstantsProvider.CONFIG_NM_VISITS_DATA)
      .subscribe(
        res => {
          if (res.rows.length > 0) {

            console.log('Visit Data = ' + res.rows.item(0).data);
            this.originalVisitHistoryList = JSON.parse(res.rows.item(0).data);

            this.listVisitHistoryByLoggedInUser();
          }

          // this.orginalVisitList = this.visitHistoryList;
          this.orginalListDuplicate = this.originalVisitHistoryList;
        }
        , (e) => {
          console.log(JSON.stringify(e));
        });
  }

  listVisitHistoryByLoggedInUser() {

    this.databaseProvider.getMetaData(ConstantsProvider.CONFIG_NM_ROLES)
      .subscribe(
        res => {
          console.log('roles DB Call Response = ' + JSON.stringify(res));
          if (undefined == res || 'undefined' == res)
            this.navCtrl.setRoot('LoginPage');
          else {
            if (res.rows.length > 0) {
              let rowData: any = res.rows.item(0).data;
              this.rolesArray = (null != rowData ? JSON.parse(rowData) : null);
            } else
              this.rolesArray = null;
          }

          console.log('rolesArray = ' + JSON.stringify(this.rolesArray));
          if (this.rolesArray && null != this.rolesArray) {
            if (this.rolesArray.indexOf(ConstantsProvider.ROLE_ADMIN) > -1) {
              console.log('Admin Role Matched');
              this.isAdmin = true;
              this.visitHistoryList = [];
              this.visitHistoryList = this.originalVisitHistoryList;
              this.visitHistoryListDuplicate = this.visitHistoryList;
              this.sortVisitHistoryByDate();
            } else if (this.rolesArray.indexOf(ConstantsProvider.ROLE_SALES) > -1) {

              console.log('Sales Role Matched');
              this.databaseProvider.getMetaData(ConstantsProvider.CONFIG_NM_USER_DTLS)
                .subscribe(
                  (res) => {
                    let userDetails: any = null;

                    if (res.rows.length > 0) {
                      let rowData: any = res.rows.item(0).data;
                      userDetails = null != rowData ? JSON.parse(rowData) : null;
                    } else {
                      this.navCtrl.setRoot('LoginPage');
                    }

                    if (userDetails && null != userDetails) {
                      let loggedInUserId: string = userDetails.userDtl.userDtlsId;

                      console.log('Iterating All Visiting History');

                      this.visitHistoryList = [];
                      this.originalVisitHistoryList.forEach(
                        (visitHistoryObj: any) => {
                          console.log('visitor ID = ' + visitHistoryObj.visitorId + ', loggedInUserId = ' + loggedInUserId);
                          if (visitHistoryObj.visitorId == loggedInUserId)
                            this.visitHistoryList.push(visitHistoryObj);
                        }
                      );
                      this.sortVisitHistoryByDate();
                      this.visitHistoryListDuplicate = this.visitHistoryList;
                    } else {
                      this.navCtrl.setRoot('LoginPage');
                    }
                  }
                );
            } else {
              console.log('No Role Matched')
            }
          } else {
            this.navCtrl.setRoot('LoginPage');
          }
        }
      );
  }

  updateGeoFence(geoFence: GeoFence) {

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

          let addLocationApiEndpoint: string = ConstantsProvider.API_BASE_URL + ConstantsProvider.LOCATION_TRACKING_URL;

          this.restService.postDetails(addLocationApiEndpoint, updatedGeoFenceData)
            .subscribe(
              (response) => {

                if (isAddOperation) {

                  console.log('Add Location Response = ' + JSON.stringify(response));
                  updatedGeoFenceData.geofencingDtlsId = response.response;
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
              }
            );
        }
      });
  }

  punchEntry() {

    console.log('punchEntry VisitHistoryPage');

    let isExitPending: boolean = false;
    let pendingExit: any;

    this.visitHistoryList.forEach(
      (visitHistory: any) => {

        if (visitHistory.exitDt == null || visitHistory.exitDt == '') {
          isExitPending = true;
          pendingExit = visitHistory;
        }
      }
    );

    if (isExitPending) {
      this.createPunchExitModal(pendingExit, true);
    } else {
      let punchEntryModal: Modal = this.modal.create('PunchEntryPage');

      punchEntryModal.present();

      punchEntryModal.onDidDismiss(
        (punchEntryModalData) => {
          console.log('punchEntryModalData = ' + JSON.stringify(punchEntryModalData));

          if (punchEntryModalData.isAdded) {

            let visitHistorySorted: any[] = [];
            visitHistorySorted.push(punchEntryModalData.punchEntryData);
            this.visitHistoryList = visitHistorySorted.concat(this.visitHistoryList);

            this.databaseProvider.setItem(ConstantsProvider.CONFIG_NM_VISITS_DATA, JSON.stringify(this.visitHistoryList));

            this.commonUtility.presentToast('Entry Punched Successfully', 5000);
          }
        }
      );
    }
  }

  punchExit(visitHistory: any) {

    console.log('punchExit VisitHistoryPage');

    this.createPunchExitModal(visitHistory, false);
  }

  createPunchExitModal(visitHistory: any, isPendingRequest: boolean) {

    this.diagnostic.isLocationEnabled().then((available) => {
      if (available) {
        // Go To Punch Exit Page
        let punchExitModal: Modal = this.modal.create('PunchExitPage', {
          visitHistory: visitHistory,
          isPendingRequest: isPendingRequest
        });

        punchExitModal.present();

        punchExitModal.onDidDismiss(
          (punchExitModalData) => {
            console.log('punchExitModalData = ' + JSON.stringify(punchExitModalData));

            if (punchExitModalData.isAdded) {

              let punchExitData: any = punchExitModalData.punchExitData;

              console.log('punchExitData = ' + JSON.stringify(punchExitData));

              this.getCurrentLatLong()
                .then((resp) => {

                  let userLat = resp.coords.latitude;
                  let userLong = resp.coords.longitude;
                  console.log('exit latitude = ' + userLat + ', exit longitude = ' + userLong);

                  let exitLocation: string = 'NA';
                  this.geoCoderProvider.reverseGeocode(userLat, userLong)
                    .subscribe(
                      (response: any) => {
                        console.log('Response = ' + JSON.stringify(response));
                        exitLocation = response;

                        this.punchExitApiCall(punchExitData, visitHistory, userLat, userLong, exitLocation);
                      },
                      (err: any) => {
                        console.log('Error = ' + JSON.stringify(err));
                        this.punchExitApiCall(punchExitData, visitHistory, userLat, userLong, exitLocation);
                      }
                    );
                })
                .catch(e => {
                  console.log('Error = ' + JSON.stringify(e));
                  this.commonUtility.presentErrorToast('Cannot Capture Location At The Moment');
                });
            }
          }
        );
      } else {
        this.diagnostic.switchToLocationSettings();
      }
    });
  }

  getCurrentLatLong() {

    return this.geolocation.getCurrentPosition();
  }

  punchExitApiCall(punchExitData, visitHistory, userLat, userLong, exitLocation) {

    let punchExitApiEndpoint = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_USERS
      + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_ADMIN_USERS
      + ConstantsProvider.URL_SEPARATOR + ConstantsProvider.API_ENDPOINT_PUNCH_SITE_EXIT;

    let punchExitApiData = {
      siteVisitHistoryId: punchExitData.siteVisitHistoryId,
      remarks: punchExitData.remarks,
      exitLatitude: userLat,
      exitLongitude: userLong,
      exitLocation: exitLocation
    }

    this.restService.putDetails(punchExitApiEndpoint, punchExitApiData)
      .subscribe(
        (response) => {
          console.log('Response = ' + JSON.stringify(response.response));

          let index = this.visitHistoryList.indexOf(visitHistory);
          if (index > -1) {
            this.visitHistoryList[index] = response.response;

            this.databaseProvider.setItem(ConstantsProvider.CONFIG_NM_VISITS_DATA, JSON.stringify(this.visitHistoryList));

            this.commonUtility.presentToast('Exit Punched Successfully', 5000);
          }
        }
      );
  }

  presentSortingPopover(event: any) {

    const popOver = this.popOverController.create('PopoverSortVisitPage', {
      sortOrder: this.sortOrder
    });

    popOver.present({
      ev: event
    });

    popOver.onDidDismiss(
      (data) => {
        if (data && data.sortData) {
          let selectedSortOrder: number = Number.parseInt(data.sortOrder);
          console.log('selectedSortOrder = ' + selectedSortOrder);

          switch (selectedSortOrder) {

            case 1:   //1 = Sort Data
              let selectCustomerModal: Modal = this.modal.create('CustomerSelectionPage', {
                modalData: null,
                fromDate: '',
                toDate: '',
                salesExecutive: '',
                isAddOperation: true
              });

              selectCustomerModal.present();

              selectCustomerModal.onDidDismiss(
                (selectCustomerModalData) => {
                  console.log('selectCustomerModalData = ' + JSON.stringify(selectCustomerModalData));

                  if (selectCustomerModalData.isAdded) {
                    this.selectedCustomer = selectCustomerModalData.selectedCustomerDetails;
                    this.fromDate = selectCustomerModalData.fromDate;
                    this.toDate = selectCustomerModalData.toDate;
                    this.salesExecutive = selectCustomerModalData.salesExecutive;

                    let isCustomerSelected: boolean = this.selectedCustomer.cardName == '' ? false : true;

                    this.filterVisitDataByAppliedFilters(isCustomerSelected,
                      !this.isEmpty(this.fromDate), !this.isEmpty(this.toDate), !this.isEmpty(this.salesExecutive));
                  }
                });
              this.sortOrder = selectedSortOrder;
              break;

            case 2:   //2 = Clear Sort   
              this.updateVisitsDataFromDB();
              this.sortVisitHistoryByDate();
              this.sortOrder = selectedSortOrder;
              break;

            default:
              console.log('Invalid Sort order selected');
              break;
          }
        }
      });
  }

  sortVisitHistoryByDate() {
    this.visitHistoryList.sort(

      (a, b) => this.momentjs(this.momentjs(a.entryDt, 'DDMMYY')).format('YYYY-MM-DD') >= this.momentjs(this.momentjs(b.entryDt, 'DDMMYY')).format('YYYY-MM-DD') ? -1 : 1
    );
  }

  filterVisitDataByAppliedFilters(isCustomerSelected: boolean, isFromDateApplied: boolean,
    isToDateApplied: boolean, isSalesExecutiveSelected: boolean) {

    console.log('isCustomerSelected = ' + isCustomerSelected + ', isFromDateApplied = ' + isFromDateApplied
      + ', isToDateApplied = ' + isToDateApplied + ', isSalesExecutiveSelected = ' + isSalesExecutiveSelected);

    if (isCustomerSelected && isFromDateApplied && isToDateApplied && isSalesExecutiveSelected) {
      this.visitHistoryList = this.visitHistoryListDuplicate.filter(
        (visitHistory: any) => {

          let visitorEntryDtFormatted = this.momentjs(this.momentjs(visitHistory.entryDt, 'DDMMYY')).format('YYYY-MM-DD');

          console.log('visitEntryDt = ' + visitorEntryDtFormatted + ', fromDate = ' + this.fromDate
            + ', toDate = ' + this.toDate + ', cardCode = ' + visitHistory.siteDtls.cardCode);

          if (
            visitHistory.siteDtls.cardCode == this.selectedCustomer.cardCode
            && visitHistory.visitorId == this.salesExecutive.userDtlsId
            && visitorEntryDtFormatted >= this.fromDate
            && visitorEntryDtFormatted <= this.toDate
          )
            return true;
          else
            return false;
        }
      );
    } else if (isCustomerSelected && isFromDateApplied && isToDateApplied && !isSalesExecutiveSelected) {
      this.visitHistoryList = this.visitHistoryListDuplicate.filter(
        (visitHistory: any) => {

          let visitorEntryDtFormatted = this.momentjs(this.momentjs(visitHistory.entryDt, 'DDMMYY')).format('YYYY-MM-DD');

          console.log('visitEntryDt = ' + visitorEntryDtFormatted + ', fromDate = ' + this.fromDate
            + ', toDate = ' + this.toDate + ', cardCode = ' + visitHistory.siteDtls.cardCode);

          if (visitHistory.siteDtls.cardCode == this.selectedCustomer.cardCode
            && visitorEntryDtFormatted >= this.fromDate
            && visitorEntryDtFormatted <= this.toDate
          )
            return true;
          else
            return false;
        }
      );
    } else if (isCustomerSelected && isFromDateApplied && !isToDateApplied && !isSalesExecutiveSelected) {
      this.visitHistoryList = this.visitHistoryListDuplicate.filter(
        (visitHistory: any) => {

          let visitorEntryDtFormatted = this.momentjs(this.momentjs(visitHistory.entryDt, 'DDMMYY')).format('YYYY-MM-DD');

          console.log('visitEntryDt = ' + visitorEntryDtFormatted + ', fromDate = ' + this.fromDate
            + ', toDate = ' + this.toDate + ', cardCode = ' + visitHistory.siteDtls.cardCode);

          if (
            visitHistory.siteDtls.cardCode == this.selectedCustomer.cardCode
            && visitorEntryDtFormatted >= this.fromDate
          )
            return true;
          else
            return false;
        }
      );
    } else if (isCustomerSelected && !isFromDateApplied && !isToDateApplied && !isSalesExecutiveSelected) {
      this.visitHistoryList = this.visitHistoryListDuplicate.filter(
        (visitHistory: any) => {

          console.log('visitEntryDt = ' + this.momentjs(this.momentjs(visitHistory.entryDt, 'DDMMYY')).format('YYYY-MM-DD')
            + ', fromDate = ' + this.fromDate + ', toDate = ' + this.toDate + ', cardCode = ' + visitHistory.siteDtls.cardCode);

          if (visitHistory.siteDtls.cardCode == this.selectedCustomer.cardCode)
            return true;
          else
            return false;
        }
      );
    } else if (isCustomerSelected && !isFromDateApplied && isToDateApplied && !isSalesExecutiveSelected) {
      this.visitHistoryList = this.visitHistoryListDuplicate.filter(
        (visitHistory: any) => {

          let visitorEntryDtFormatted = this.momentjs(this.momentjs(visitHistory.entryDt, 'DDMMYY')).format('YYYY-MM-DD');

          console.log('visitEntryDt = ' + visitorEntryDtFormatted + ', fromDate = ' + this.fromDate
            + ', toDate = ' + this.toDate + ', cardCode = ' + visitHistory.siteDtls.cardCode);

          if (
            visitHistory.siteDtls.cardCode == this.selectedCustomer.cardCode
            && visitorEntryDtFormatted <= this.toDate
          )
            return true;
          else
            return false;
        }
      );
    } else if (isFromDateApplied && !isCustomerSelected && isToDateApplied && isSalesExecutiveSelected) {
      this.visitHistoryList = this.visitHistoryListDuplicate.filter(
        (visitHistory: any) => {

          let visitorEntryDtFormatted = this.momentjs(this.momentjs(visitHistory.entryDt, 'DDMMYY')).format('YYYY-MM-DD');

          console.log('visitEntryDt = ' + visitorEntryDtFormatted + ', fromDate = ' + this.fromDate
            + ', toDate = ' + this.toDate + ', cardCode = ' + visitHistory.siteDtls.cardCode);

          if (
            visitHistory.visitorId == this.salesExecutive.userDtlsId
            && visitorEntryDtFormatted >= this.fromDate
            && visitorEntryDtFormatted <= this.toDate
          )
            return true;
          else
            return false;
        }
      );
    } else if (isFromDateApplied && !isCustomerSelected && isToDateApplied && !isSalesExecutiveSelected) {
      this.visitHistoryList = this.visitHistoryListDuplicate.filter(
        (visitHistory: any) => {

          let visitorEntryDtFormatted = this.momentjs(this.momentjs(visitHistory.entryDt, 'DDMMYY')).format('YYYY-MM-DD');

          console.log('visitEntryDt = ' + visitorEntryDtFormatted + ', fromDate = ' + this.fromDate
            + ', toDate = ' + this.toDate + ', cardCode = ' + visitHistory.siteDtls.cardCode);

          if (visitorEntryDtFormatted >= this.fromDate && visitorEntryDtFormatted <= this.toDate)
            return true;
          else
            return false;
        }
      );
    } else if (isFromDateApplied && !isCustomerSelected && !isToDateApplied && isSalesExecutiveSelected) {
      this.visitHistoryList = this.visitHistoryListDuplicate.filter(
        (visitHistory: any) => {

          let visitorEntryDtFormatted = this.momentjs(this.momentjs(visitHistory.entryDt, 'DDMMYY')).format('YYYY-MM-DD');

          console.log('visitEntryDt = ' + visitorEntryDtFormatted + ', fromDate = ' + this.fromDate
            + ', toDate = ' + this.toDate + ', cardCode = ' + visitHistory.siteDtls.cardCode);

          if (
            visitHistory.visitorId == this.salesExecutive.userDtlsId
            && visitorEntryDtFormatted >= this.fromDate
          )
            return true;
          else
            return false;
        }
      );
    } else if (isFromDateApplied && !isCustomerSelected && !isToDateApplied && !isSalesExecutiveSelected) {
      this.visitHistoryList = this.visitHistoryListDuplicate.filter(
        (visitHistory: any) => {

          let visitorEntryDtFormatted = this.momentjs(this.momentjs(visitHistory.entryDt, 'DDMMYY')).format('YYYY-MM-DD');

          console.log('visitEntryDt = ' + visitorEntryDtFormatted + ', fromDate = ' + this.fromDate
            + ', toDate = ' + this.toDate + ', cardCode = ' + visitHistory.siteDtls.cardCode);

          if (visitorEntryDtFormatted >= this.fromDate)
            return true;
          else
            return false;
        }
      );
    } else if (isToDateApplied && !isFromDateApplied && !isCustomerSelected && isSalesExecutiveSelected) {
      this.visitHistoryList = this.visitHistoryListDuplicate.filter(
        (visitHistory: any) => {
          let visitorEntryDtFormatted = this.momentjs(this.momentjs(visitHistory.entryDt, 'DDMMYY')).format('YYYY-MM-DD');

          console.log('visitEntryDt = ' + visitorEntryDtFormatted + ', fromDate = ' + this.fromDate
            + ', toDate = ' + this.toDate + ', cardCode = ' + visitHistory.siteDtls.cardCode);

          if (
            visitHistory.visitorId == this.salesExecutive.userDtlsId
            && visitorEntryDtFormatted <= this.toDate
          )
            return true;
          else
            return false;
        }
      );
    } else if (isToDateApplied && !isFromDateApplied && !isCustomerSelected && !isSalesExecutiveSelected) {
      this.visitHistoryList = this.visitHistoryListDuplicate.filter(
        (visitHistory: any) => {

          let visitorEntryDtFormatted = this.momentjs(this.momentjs(visitHistory.entryDt, 'DDMMYY')).format('YYYY-MM-DD');

          console.log('visitEntryDt = ' + visitorEntryDtFormatted + ', fromDate = ' + this.fromDate
            + ', toDate = ' + this.toDate + ', cardCode = ' + visitHistory.siteDtls.cardCode);

          if (visitorEntryDtFormatted <= this.toDate)
            return true;
          else
            return false;
        }
      );
    }

    this.sortVisitHistoryByDate();
  }

  isEmpty(valueToCheck: any) {

    if (
      undefined == valueToCheck || 'undefined' == valueToCheck
      || valueToCheck == '' || valueToCheck == null
      || {} == valueToCheck || '{}' == valueToCheck
    )
      return true;
    else
      return false;
  }

  downloadExcel() {

    console.log('downloadExcel VisitHistoryPage');

    this.navCtrl.push('DownloadDetailsPage', {
      case: "VISIT_HISTORY_XLSX_DOWNLAOD",
      visitHistoryExcelData: this.visitHistoryList
    })
  }
}
