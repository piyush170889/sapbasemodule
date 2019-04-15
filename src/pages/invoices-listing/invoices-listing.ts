import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { InvoiceDetailsPage } from '../invoice-details/invoice-details';

/**
 * Generated class for the InvoicesListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invoices-listing',
  templateUrl: 'invoices-listing.html',
})
export class InvoicesListingPage {

  fromDate: string = '';
  customer: any = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public restService: RestserviceProvider) {

    this.customer = this.navParams.get('customer');
    this.fromDate = this.navParams.get('fromDate');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicesListingPage');
  }

  showInvoiceDetails(invoice) {

    console.log('showInvoiceDetails InvoiceListingPage');

    this.navCtrl.push(InvoiceDetailsPage, {
      customer: this.customer,
      fromDate: this.fromDate,
      invoice: invoice      
    })
  }
}
