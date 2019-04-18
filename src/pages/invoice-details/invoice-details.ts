import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';

/**
 * Generated class for the InvoiceDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-invoice-details',
  templateUrl: 'invoice-details.html',
})
export class InvoiceDetailsPage {

  customer: any;
  fromDate: string;
  invoice: any;
  msg = 'Test Message';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private socialSharing: SocialSharing,
    private commonUtility: CommonUtilityProvider) {

    this.customer = this.navParams.get('customer');
    this.fromDate = this.navParams.get('fromDate');
    this.invoice = this.navParams.get('invoice');
  }

  share() {

    alert('Sharing Message');

    this.socialSharing.share(this.msg, null, null, null);
  }

  whatsappShare() {
    this.socialSharing.shareViaWhatsApp(this.msg, null, null);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoiceDetailsPage');
  }

  downloadReport() {

    console.log('downloadReport InvoiceDetailsPage');

    var page = document.getElementById('pdfDiv');
    cordova.plugins.printer.print(page, 'Aging_Report.pdf');
  }
}
