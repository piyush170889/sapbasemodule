import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { IonicSelectableComponent } from 'ionic-selectable';
import { FormGroup, FormBuilder } from '@angular/forms';

/**
 * Generated class for the CustomerSelectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-selection',
  templateUrl: 'customer-selection.html',
})
export class CustomerSelectionPage {

  modalData: any;
  isAddOperation: boolean = false;
  customersList: any[] = [];
  selectedCustomerDetails: any;
  fromDate: any = '';
  toDate: any = '';
  salesExecutive: any = {};
  visitFilterGroup: FormGroup;
  currDate: string = '';

  constructor(
    public navParams: NavParams,
    private databaseProvider: DatabaseProvider,
    private view: ViewController,
    private commonUtility: CommonUtilityProvider,
    private formBuilder: FormBuilder,
  ) {

    this.currDate = new Date().toISOString();


    this.modalData = this.navParams.get('modalData');
    this.isAddOperation = this.navParams.get('isAddOperation');
    this.fromDate = this.navParams.get('fromDate');
    this.toDate = this.navParams.get('toDate');
    this.salesExecutive = this.navParams.get('salesExecutive');

    console.log('Received Modal Data = ' + JSON.stringify(this.modalData) + ', \n fromDate = ' + this.fromDate
      + '\n toDate = ' + this.toDate + ', \n salesExecutive = ' + JSON.stringify(this.salesExecutive));

    if (null == this.modalData) {
      this.intializeCustomerData();
    } else {
      this.selectedCustomerDetails = this.modalData;
    }

    this.databaseProvider.getCustomerData()
      .subscribe(
        res => {
          if (res.rows.length > 0) {
            console.log('CustData = ' + res.rows.item(0).data);
            let parsedcustomersList: any[] = JSON.parse(res.rows.item(0).data);

            parsedcustomersList.forEach(
              (parsedCustomer: any) => {

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

    this.visitFilterGroup = this.formBuilder.group({
      fromDate: [this.fromDate],
      tillDate: [this.toDate]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerSelectionPage');
  }

  ionViewDidEnter() {

    console.log('ionViewDidEnter CustomerSelectionPage');
  }

  intializeCustomerData() {
    console.log('Clearing Customer Data');

    this.selectedCustomerDetails = {
      cardCode: '',
      cardName: ''
    }
  }


  showSelectedCustomer(event: {
    component: IonicSelectableComponent,
    value: any
  }) {

    console.log('selectedCustomer = ', JSON.stringify(event.value));

    if (event.value) {
      console.log('Updating values');
      let selectedCustomer = event.value;
      this.selectedCustomerDetails.cardName = selectedCustomer.cardName;
      this.selectedCustomerDetails.cardCode = selectedCustomer.cardCode;
    }
  }

  save() {
    console.log('Updated Customer Data = ' + JSON.stringify(this.selectedCustomerDetails));

    this.fromDate = this.visitFilterGroup.controls['fromDate'].value;
    this.toDate = this.visitFilterGroup.controls['tillDate'].value;

    if (this.selectedCustomerDetails.cardName == '' && this.fromDate == '' && this.toDate == '') {
      this.commonUtility.presentToast('Please Select Filter parameters', 5000);
    } else {

      const modalData = {
        isAdded: true,
        selectedCustomerDetails: this.selectedCustomerDetails,
        fromDate: this.fromDate,
        toDate: this.toDate,
        salesExecutive: this.salesExecutive
      }

      console.log('Sending Customer Data = ' + JSON.stringify(modalData.selectedCustomerDetails));
      this.view.dismiss(modalData);
    }
  }

  dismissModal() {
    const modalData = {
      isAdded: false,
      geoFenceData: null
    }

    this.view.dismiss(modalData);
  }

}
