import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InvoiceDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invoice-details',
  templateUrl: 'invoice-details.html',
})
export class InvoiceDetailsPage {

  customer: any;
  fromDate: string;
  invoice: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {

    this.customer = this.navParams.get('customer');
    this.fromDate = this.navParams.get('fromDate');
    this.invoice = this.navParams.get('invoice');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceDetailsPage');
  }

}
