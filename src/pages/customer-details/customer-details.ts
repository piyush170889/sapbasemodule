import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { AgingReportFiltersPage } from '../aging-report-filters/aging-report-filters';
import { OrderMgmtPage } from '../order-mgmt/order-mgmt';
import { DatePipe } from '@angular/common';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the CustomerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-details',
  templateUrl: 'customer-details.html',
})
export class CustomerDetailsPage {

  customer: any;
  date: any;
  time: any;
  isModalData: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private commonUtility: CommonUtilityProvider,
    private view: ViewController,
    private callNumberNative: CallNumber) {

    this.customer = this.navParams.get('customer');
    this.isModalData = this.navParams.get('isModalData') == undefined || this.navParams.get('isModalData') == null || this.navParams.get('isModalData') == '' ? false : this.navParams.get('isModalData');

    console.log('customer = ' + JSON.stringify(this.customer));
    this.date = new DatePipe('en-US').transform(new Date(), 'ddMMyy');
    this.time = new DatePipe('en-US').transform(new Date(), 'HHmmss');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDetailsPage');
  }

  dismissModal() {
    const modalData = {
      isAdded: false
    };
    this.view.dismiss(modalData);
  }

  showAgingReport() {

    console.log('showAgingReport CustomerDetailsPage');

    if (this.commonUtility.isNetworkAvailable()) {
      this.navCtrl.push(AgingReportFiltersPage, {
        customer: this.customer
      });
    }
  }

  showOrders() {

    console.log('showOrders CustomerDetailsPage');
    // this.commonUtility.presentToast('Not Yet Implemented', 5000);
    this.navCtrl.push(OrderMgmtPage, {
      customer: this.customer
    });
  }

  callCust() {

    console.log('Calling Customer on : ' + this.customer.customerDetails.cellular);
    this.commonUtility.callNumber(this.customer.customerDetails.cellular, true);
  }


}
