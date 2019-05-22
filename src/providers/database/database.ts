import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ConstantsProvider } from '../constants/constants';
import { Network } from '@ionic-native/network';
import { Observable } from 'rxjs';
import { RestserviceProvider } from '../restservice/restservice';
import { CommonUtilityProvider } from '../common-utility/common-utility';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(public http: HttpClient,
    private sqlite: SQLite,
    private network: Network,
    private restService: RestserviceProvider,
    private commonUtility: CommonUtilityProvider
  ) {

    console.log('DatabaseProvider Provider');
  }

  initializeSqlLiteDb() {

    return this.sqlite.create({
      name: ConstantsProvider.JBS_APP_DB_NM,
      location: ConstantsProvider.JBS_APP_DB_LOC
    });
  }

  intializeDatabase() {

    this.initializeSqlLiteDb().then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS metadata(configname TEXT, data TEXT)', [])
        .then(res => {
          console.log('Create Table metadata');
        })
        .catch(e => console.log(JSON.stringify(e)));
    })
      .catch(e => console.log(JSON.stringify(e)));
  }

  getCustomerData() {

    return Observable.fromPromise(
      this.initializeSqlLiteDb().then((db: SQLiteObject) => {
        return db.executeSql('SELECT data FROM metadata WHERE configname=?',
          [ConstantsProvider.CONFIG_NM_CUST_DATA])
      })
        .catch(e => {
          console.log(JSON.stringify(e))
        })
    );
  }

  getLastUpdatedTs() {

    return Observable.fromPromise(
      this.initializeSqlLiteDb().then((db: SQLiteObject) => {
        return db.executeSql('SELECT data FROM metadata WHERE configname=?',
          [ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS])
      })
        .catch(e => {
          console.log(JSON.stringify(e))
        })
    );
  }

  syncCustomerData() {

    if (this.network.type != "unknown" && this.network.type != "none" && this.network.type != undefined) {
      let customersDetailsApiEndpoint = ConstantsProvider.API_BASE_URL + ConstantsProvider.API_ENDPOINT_CUST_DTLS;

      this.restService.getDetails(customersDetailsApiEndpoint)
        .subscribe(
          (response) => {
            console.log('Customers Data = ' + JSON.stringify(response.response));
            let customersDetailsList: any[] = response.response;

            this.initializeSqlLiteDb().then((db: SQLiteObject) => {

              db.executeSql('SELECT data from metadata where configname=?', [ConstantsProvider.CONFIG_NM_CUST_DATA])
                .then(
                  res => {
                    if (res.rows.length > 0) {

                      db.executeSql('UPDATE metadata set data=? WHERE configname=?', [JSON.stringify(customersDetailsList),
                      ConstantsProvider.CONFIG_NM_CUST_DATA])
                        .then(
                          res => {
                            console.log('Updated Customer Record');
                            db.executeSql('UPDATE metadata set data=? WHERE configname=?', [new Date().toISOString(),
                            ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS])
                              .then(
                                res => {
                                  console.log('Updated Last Updated Ts');
                                }
                              )
                              .catch(e => {
                                console.log(JSON.stringify(e))
                              })
                          }
                        )
                        .catch(e => {
                          console.log(JSON.stringify(e))
                        });
                    } else {
                      db.executeSql('INSERT INTO metadata(configname, data) VALUES(?,?)', [ConstantsProvider.CONFIG_NM_CUST_DATA, ''])
                        .then(res => {
                          console.log('Inserted Empty Customer Record');
                          this.syncCustomerData();
                        })
                        .catch(e => console.log(JSON.stringify(e)));
                    }
                  }
                );

            })
              .catch(e => {
                console.log(JSON.stringify(e))
              })
          }
        )
    }
  }

  syncCustomerDataInBackground() {

    console.log('SynchingDataInBackgruond');
    this.initializeSqlLiteDb().then((db: SQLiteObject) => {

      db.executeSql('SELECT data FROM metadata WHERE configname=?', [ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS])
        .then(
          res => {
            if (res.rows.length > 0) {
              console.log('LastUpdatedTs = ' + res.rows.item(0).data);

              let lastUpdatedTsData: any = res.rows.item(0).data;
              if (lastUpdatedTsData != '') {

                let lastUpdatedTs: Date = new Date(lastUpdatedTsData);

                let diffInMins: number = this.commonUtility.calculateDiffInMins(lastUpdatedTs, new Date());
                if (diffInMins >= 30) {
                  this.syncCustomerData();
                }
              } else {
                this.syncCustomerData();
              }
            } else {

              db.executeSql('INSERT INTO metadata(configname, data) VALUES(?,?)',
                [ConstantsProvider.CONFIG_NM_LAST_UPDATED_TS, ''])
                .then(res => {
                  console.log('Inserted Empty LastUpdatedTs Record');

                  this.syncCustomerData();
                })
                .catch(e => console.log(JSON.stringify(e)));
            }
          })
        .catch(e => {
          console.log(JSON.stringify(e))
        })
    })
      .catch(e => {
        console.log(JSON.stringify(e))
      })
  }
}