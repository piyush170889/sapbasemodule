import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the InvoiceListingSettingsPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invoice-listing-settings-popover',
  templateUrl: 'invoice-listing-settings-popover.html',
})
export class InvoiceListingSettingsPopoverPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewController: ViewController) {
  }

  dismissPopOver(data: any) {

    this.viewController.dismiss(data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceListingSettingsPopoverPage');
  }

  showLedgerReport() {

    console.log('showLedgerReport InvoiceListingSettingsPopoverPage');

    this.dismissPopOver({
      showLedger: true
    })

  }

}
