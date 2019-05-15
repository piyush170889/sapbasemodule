import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverSortFiltersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-sort-filters',
  templateUrl: 'popover-sort-filters.html',
})
export class PopoverSortFiltersPage {

  sortOrder: number = 0;
  isCustMgmt: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewController: ViewController) {

    this.sortOrder = Number.parseInt(this.navParams.get('sortOrder'));
    this.isCustMgmt = this.navParams.get('isCustMgmt') == null || this.navParams.get('isCustMgmt') == undefined ? false : this.navParams.get('isCustMgmt');

    console.log('Sort Order = ' + this.sortOrder + ', isCustMgmt : ' + this.isCustMgmt);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverSortFiltersPage');
  }

  dismissPopOver(data: any) {

    this.viewController.dismiss(data);
  }

  sortData(sortOrder: any) {

    console.log('sortData PopoverSortFilterPage');

    this.dismissPopOver({
      sortData: true,
      sortOrder: sortOrder
    });
  }

}
