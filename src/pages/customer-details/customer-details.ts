import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import { CustomerAgingReportPage } from '../customer-aging-report/customer-aging-report';
import { AgingReportFiltersPage } from '../aging-report-filters/aging-report-filters';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    private commonUtility: CommonUtilityProvider) {

    this.customer = this.navParams.get('customer');
    console.log('customer = ' + JSON.stringify(this.customer));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDetailsPage');
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
    this.commonUtility.presentToast('Not Yet Implemented', 5000);
  }
}
