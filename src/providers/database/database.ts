import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ConstantsProvider } from '../constants/constants';
import { Network } from '@ionic-native/network';
import { Observable } from 'rxjs';
import { RestserviceProvider } from '../restservice/restservice';

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
    // private commonUtility: CommonUtilityProvider
  ) {

    console.log('DatabaseProvider Provider');
  }

  initializeSqlLiteDb() {

    return this.sqlite.create({
      name: ConstantsProvider.APP_DB_NM,
      location: ConstantsProvider.APP_DB_LOC
      // iosDatabaseLocation: ConstantsProvider.APP_DB_IOS_LOC
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

  getRefreshToken() {

    return Observable.fromPromise(
      this.initializeSqlLiteDb().then((db: SQLiteObject) => {
        return db.executeSql('SELECT data FROM metadata WHERE configname=?',
          [ConstantsProvider.CONFIG_NM_REFRESH_TOKEN])
      })
        .catch(e => {
          console.log(JSON.stringify(e));
          return Observable.throw(e);
        })
    );
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

                let diffInMins: number = this.calculateDiffInMins(lastUpdatedTs, new Date());
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

  // setTokenInDb(data: any) {

  //   console.log('Access Token = ' + data.access_token);
  //   console.log('Refresh Token = ' + data.refresh_token);

  //   this.initializeSqlLiteDb().then((db: SQLiteObject) => {

  //     // Store Refresh Token
  //     this.setItem(ConstantsProvider.CONFIG_NM_REFRESH_TOKEN, data.refresh_token);

  //     // Store Access Token
  //     db.executeSql('SELECT data FROM metadata WHERE configname=?', [ConstantsProvider.CONFIG_NM_ACCESS_TOKEN])
  //       .then(
  //         res => {
  //           if (res.rows.length > 0) {
  //             console.log('Fetched Access Token = ' + res.rows.item(0).data);

  //             db.executeSql('UPDATE metadata set data=? WHERE configname=?', [data.access_token,
  //             ConstantsProvider.CONFIG_NM_ACCESS_TOKEN])
  //               .then(
  //                 res => {
  //                   console.log('Updated Access Token');
  //                 }
  //               )
  //               .catch(e => {
  //                 console.log(JSON.stringify(e));
  //               })
  //           } else {

  //             db.executeSql('INSERT INTO metadata(configname, data) VALUES(?,?)',
  //               [ConstantsProvider.CONFIG_NM_ACCESS_TOKEN, data.access_token])
  //               .then(res => {
  //                 console.log('Inserted Access Token');
  //               })
  //               .catch(e => console.log(JSON.stringify(e)));
  //           }
  //         });

  //   })
  //     .catch(e => {
  //       console.log(JSON.stringify(e))
  //     });
  // }

  setItem(configName: any, configValue: any) {

    console.log('Setting : ' + configName + ' = ' + configValue);
    this.initializeSqlLiteDb().then((db: SQLiteObject) => {

      db.executeSql('SELECT data FROM metadata WHERE configname=?', [configName])
        .then(
          res => {
            if (res.rows.length > 0) {
              console.log('Fetched ' + configName + ' = ' + res.rows.item(0).data);

              db.executeSql('UPDATE metadata set data=? WHERE configname=?', [configValue, configName])
                .then(
                  res => {
                    console.log('Updated ' + configName);
                  }
                )
                .catch(e => {
                  console.log(JSON.stringify(e));
                })
            } else {

              db.executeSql('INSERT INTO metadata(configname, data) VALUES(?,?)',
                [configName, configValue])
                .then(res => {
                  console.log('Inserted ' + configName);
                })
                .catch(e => console.log(JSON.stringify(e)));
            }
          });
    })
      .catch(e => {
        console.log(JSON.stringify(e))
      });
  }

  getItem(configName: any) {

      return this.initializeSqlLiteDb().then((db: SQLiteObject) => {
        return db.executeSql('SELECT data FROM metadata WHERE configname=?',
          [configName])
      })
        .catch(e => {
          console.log(JSON.stringify(e));
          // return Observable.throw(e);
        })
  }


  async getItemAsync(configName: any) {

    let db: SQLiteObject = await this.initializeSqlLiteDb();

    let res: any = await db.executeSql('SELECT data FROM metadata WHERE configname=?', [configName]);

    if (res.rows.length > 0) {
      return res.rows.item(0).data;
    }
  }

  calculateDiffInMins(startDate: Date, endDate: Date) {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60;

    // Convert both dates to milliseconds
    var date1_ms = startDate.getTime();
    var date2_ms = endDate.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    let diff = Math.round(difference_ms / one_day);

    console.log('diff In Mins = ' + diff);
    return diff;
  }

  clearDatabase() {

    this.sqlite.deleteDatabase({
      name: ConstantsProvider.APP_DB_NM,
      location: ConstantsProvider.APP_DB_LOC
      // iosDatabaseLocation: ConstantsProvider.APP_DB_IOS_LOC
    }).
      then(
        res => {
          console.log(JSON.stringify(res));
          console.log('Deleted Database');
        }
      )
      .catch(
        (err) => {
          console.log(JSON.stringify(err));
          console.log('Cannot Delete Database');
        }
      );
  }
}