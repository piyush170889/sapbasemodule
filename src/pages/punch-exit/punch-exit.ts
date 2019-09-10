import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { CommonUtilityProvider } from '../../providers/common-utility/common-utility';
import * as moment from 'moment-timezone';

/**
 * Generated class for the PunchExitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-punch-exit',
  templateUrl: 'punch-exit.html',
})
export class PunchExitPage {

  remarks: string = '';
  visitHistory: any = {
    siteDtls: {}
  };
  isPendingRequest: boolean = false;
  momentjs: any = moment;

  constructor(
    public navParams: NavParams,
    private view: ViewController,
    private commonUtility: CommonUtilityProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PunchExitPage');
  }

  ionViewDidEnter() {

    console.log('ionViewDidEnter PunchExitPage');

    this.visitHistory = this.navParams.get('visitHistory');
    this.isPendingRequest = this.navParams.get('isPendingRequest');

    console.log('visitHistory = ' + JSON.stringify(this.visitHistory) + ', isPendingRequest = ' + this.isPendingRequest);
  }

  dismissModal() {
    const modalData = {
      isAdded: false
    };
    this.view.dismiss(modalData);
  }

  punchExit() {

    console.log('punchExit PunchExitPage');

    if (this.remarks == null || this.remarks == undefined || this.remarks == '') {
      this.commonUtility.presentErrorToast('Please fill in some remarks for your visit');
    } else {
      this.visitHistory.remarks = this.remarks;

      let punchExitModalData = {
        isAdded: true,
        punchExitData: this.visitHistory
      }

      this.view.dismiss(punchExitModalData);
    }
  }
}
