import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AgingFilterPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aging-filter-popover',
  templateUrl: 'aging-filter-popover.html',
})
export class AgingFilterPopoverPage {

  agingperiod: any = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewController: ViewController) {

      this.agingperiod = this.navParams.get('agingperiod');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgingFilterPopoverPage');
  }

  dismissPopOver(data: any) {

    this.viewController.dismiss(data);
  }

  showAgingReport(agingPeriod: any) {

    console.log('showAgingReport AgingFilterPopoverPage');

    this.dismissPopOver({
      showAging: true,
      agingPeriod: agingPeriod
    });
  }

}
