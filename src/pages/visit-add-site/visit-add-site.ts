import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Modal, ModalController } from 'ionic-angular';
import { CommonUtilityProvider } from "../../providers/common-utility/common-utility";
import { GeoFence } from './domain-geofence';
// import { IonicSelectableComponent } from "ionic-selectable";
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the AddGeofencingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'visit-add-site',
  templateUrl: 'visit-add-site.html',
})
export class VisitAddSitePage {

  geoFenceData: GeoFence;
  isAddOperation: boolean;
  isCustomerLocation: boolean = true;
  customersList: any[] = [];
  selectedCustomer: any = {};
  selectedCustomerDetails: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController,
    private modal: ModalController,
    private commonUtility: CommonUtilityProvider,
    private databaseProvider: DatabaseProvider
  ) {

    this.geoFenceData = this.navParams.get('modalData');
    this.isAddOperation = this.navParams.get('isAddOperation');

    console.log('Received GeoFence Data = ' + JSON.stringify(this.geoFenceData));

    if (null == this.geoFenceData) {
      this.geoFenceData = new GeoFence();
      this.intializeCustomerData();
    } else {
      this.selectedCustomerDetails = {
        cardCode: this.geoFenceData.cardCode,
        cardName: this.geoFenceData.geofenceName
      }
    }


    this.databaseProvider.getCustomerData()
      .subscribe(
        res => {
          if (res.rows.length > 0) {
            console.log('CustData = ' + res.rows.item(0).data);
            let parsedcustomersList: any[] = JSON.parse(res.rows.item(0).data);

            parsedcustomersList.forEach(
              (parsedCustomer: any) => {

                // console.log('Customer Details = ' + JSON.stringify(parsedCustomer.customerDetails));
                if (parsedCustomer.customerDetails.cardCode != null
                  && parsedCustomer.customerDetails.cardCode != ''
                  && parsedCustomer.customerDetails.cardName != null
                  && parsedCustomer.customerDetails.cardName != '') {
                  this.customersList.push({
                    cardCode: parsedCustomer.customerDetails.cardCode,
                    cardName: parsedCustomer.customerDetails.cardName
                  })
                }
              }
            );

            // console.log('customersList = ' + JSON.stringify(this.customersList))
          }
        }
      );

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGeofencingPage');
  }

  dismissModal() {
    const modalData = {
      isAdded: false,
      geoFenceData: null
    }

    this.view.dismiss(modalData);
  }

  save() {
    console.log('Updated GeoFence Data = ' + JSON.stringify(this.geoFenceData));

    if (this.geoFenceData) {

      if (this.geoFenceData.latitude == 0 || this.geoFenceData.latitude == undefined
        || this.geoFenceData.longitude == 0 || this.geoFenceData.longitude == undefined
        || this.geoFenceData.geofenceAddr == '' || this.geoFenceData.geofenceAddr == undefined) {
        this.commonUtility.presentToast('Address Cannot be detected at the moment. Please try again.', 5000);
      } else if (this.selectedCustomerDetails.cardName == '') {
        this.commonUtility.presentToast('Please Specify Visit Site Name', 5000);
      } else {

        this.geoFenceData.geofenceName = this.selectedCustomerDetails.cardName;
        if (this.isCustomerLocation)
          this.geoFenceData.cardCode = this.selectedCustomerDetails.cardCode;

        const modalData = {
          isAdded: true,
          geoFenceData: this.geoFenceData
        }

        console.log('Sending GeoFence Data = ' + JSON.stringify(modalData.geoFenceData));
        this.view.dismiss(modalData);
      }
    }
  }

  updateAddress() {
    console.log('updateAddress() called');

    let addressToSend: string = this.geoFenceData.geofenceAddr == null ? '' : this.geoFenceData.geofenceAddr;
    let latitudeToSend: any = this.geoFenceData.latitude == undefined || this.geoFenceData.latitude == null ? 0 : this.geoFenceData.latitude;
    let longitudeToSend: any = this.geoFenceData.longitude == undefined || this.geoFenceData.longitude == null ? 0 : this.geoFenceData.longitude;

    console.log('address = ' + addressToSend + ', latitudeToSend = ' + latitudeToSend + ', longitudeToSend = ' + longitudeToSend);

    const addressModal: Modal = this.modal.create('PlaceaddressPage', {
      address: addressToSend,
      latitude: latitudeToSend,
      longitude: longitudeToSend
    });

    addressModal.present();

    addressModal.onDidDismiss((data) => {
      console.log(data);
      if (data.isAdded) {
        this.geoFenceData.geofenceAddr = data.address;
        this.geoFenceData.latitude = data.latitude;
        this.geoFenceData.longitude = data.longitude;
      }
    });
  }

  onChangeHandler(event) {

    console.log('Event Generated = ' + event);

    if (event == 'customer')
      this.isCustomerLocation = true;
    else if (event == 'other')
      this.isCustomerLocation = false;

    this.intializeCustomerData();
  }

  // showSelectedCustomer(event: {
  //   component: IonicSelectableComponent,
  //   value: any
  // }) {
  showSelectedCustomer(event: any) {

    console.log('selectedCustomer = ', JSON.stringify(event.value));

    if (event.value) {
      console.log('Updating values');
      let selectedCustomer = event.value;
      this.selectedCustomerDetails.cardName = selectedCustomer.cardName;
      this.selectedCustomerDetails.cardCode = selectedCustomer.cardCode;
    }
  }

  intializeCustomerData() {
    console.log('Clearing Customer Data');

    this.selectedCustomerDetails = {
      cardCode: '',
      cardName: ''
    }
  }



}
