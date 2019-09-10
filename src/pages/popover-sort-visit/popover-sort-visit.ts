import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverSortVisitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-sort-visit',
  templateUrl: 'popover-sort-visit.html',
})
export class PopoverSortVisitPage {

  sortOrder: number = 0;

  constructor(
    public navParams: NavParams,
    private viewController: ViewController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverSortVisitPage');
  }

  ionViewDidEnter() {

    console.log('ionViewDidEnter PopoverSortVisitPage');
    this.sortOrder = Number.parseInt(this.navParams.get('sortOrder'));
    console.log('sortOrder = ' + this.sortOrder);
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
