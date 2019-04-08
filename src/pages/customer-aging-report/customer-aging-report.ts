import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';

/**
 * Generated class for the CustomerAgingReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customer-aging-report',
  templateUrl: 'customer-aging-report.html',
})
export class CustomerAgingReportPage {

  customer: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private commonUtility: CommonUtilityProvider) {

      this.customer = this.navParams.get('customer');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerAgingReportPage');
  }

}
