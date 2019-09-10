import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import * as moment from 'moment-timezone';
import HashMap from 'HashMap';


/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  momentjs: any = moment;

  constructor(public navController: NavController,
    public toastCtrl: ToastController) {

    var custSummHashMap = new HashMap();
    custSummHashMap.set('TestKey', 'TestVal');

    console.log('key = TestKey, Value = ' + custSummHashMap.get('TestKey'));

  }

  ionViewDidEnter() {

  }

}
