import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalLedgerOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-ledger-options',
  templateUrl: 'modal-ledger-options.html',
})
export class ModalLedgerOptionsPage {

  optionSelected: any = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalLedgerOptionsPage');
  }

  dismissModal() {
    const modalData = {
      isAdded: false
    };
    this.view.dismiss(modalData);
  }

  sendSelection(optionSelected: string) {

    console.log('Selected Option = ' + optionSelected);

    const modalData = {
      isAdded: true,
      optionSelected: optionSelected
    }
    this.view.dismiss(modalData);
  }

}
