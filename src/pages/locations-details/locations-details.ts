import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ConstantsProvider } from '../../providers/constants/constants';
import * as moment from 'moment-timezone';

/**
 * Generated class for the LocationsDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-locations-details',
  templateUrl: 'locations-details.html',
})
export class LocationsDetailsPage {

  location: any = {
    siteDtls: {}
  };
  momentjs: any = moment;
  visitHistoryList: any[] = [];

  constructor(
    public navParams: NavParams,
    private databaseProvider: DatabaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationsDetailsPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter LocationsDetailsPage');

    this.location = this.navParams.get('location');

    this.databaseProvider.getMetaData(ConstantsProvider.CONFIG_NM_VISITS_DATA)
      .subscribe(
        (res) => {

          if (res && res.rows.length > 0) {
            let allVisitsHistory: any[] = JSON.parse(res.rows.item(0).data);
            console.log('allVisitsHistory = ' + JSON.stringify(allVisitsHistory));

            this.visitHistoryList = allVisitsHistory.filter(
              (visitHistory: any) => {
                if (visitHistory.siteDtls.geofencingDtlsId == this.location.geofencingDtlsId)
                  return true;
                else
                  return false;
              }
            );
          }
        }
      )
  }


}
