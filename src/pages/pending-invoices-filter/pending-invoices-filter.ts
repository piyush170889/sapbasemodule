import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { PendingInvoicesPage } from '../pending-invoices/pending-invoices';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';

/**
 * Generated class for the PendingInvoicesFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pending-invoices-filter',
  templateUrl: 'pending-invoices-filter.html',
})
export class PendingInvoicesFilterPage {

  fromDate: any = '2019-04-01';
  currentDate: any = new Date().toISOString();
  toDate: any = new Date().toISOString();
  customer: any = {};


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public commonUtility: CommonUtilityProvider) {

      this.customer = this.navParams.get('customer');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingInvoicesFilterPage');
  }

  showPendingInvoices() {

    console.log('fromDate = ' + this.fromDate + ', toDate = ' + this.toDate);

    if (this.commonUtility.isNetworkAvailable()) {
      this.navCtrl.push(PendingInvoicesPage, {
        fromDate: this.fromDate,
        toDate: this.toDate,
        customer: this.customer
      });
    }
  }

}
