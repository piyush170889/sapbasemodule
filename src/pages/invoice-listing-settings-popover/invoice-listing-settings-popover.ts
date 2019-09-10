import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

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

  constructor(
    public navParams: NavParams,
    private viewController: ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceListingSettingsPopoverPage');
  }

  dismissPopOver(data: any) {

    this.viewController.dismiss(data);
  }

  showLedgerReport() {

    console.log('showLedgerReport InvoiceListingSettingsPopoverPage');

    this.dismissPopOver({
      showLedger: true,
      showSummary: false
    });
  }

  showSummaryReport() {

    console.log('showSummaryReport InvoiceListingSettingsPopoverPage');

    this.dismissPopOver({
      showLedger: false,
      showSummary: true
    });
  }

}
