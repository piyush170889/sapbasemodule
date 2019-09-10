import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitAddSitePage } from './visit-add-site';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    VisitAddSitePage,
  ],
  imports: [
    IonicSelectableModule,
    IonicPageModule.forChild(VisitAddSitePage),
  ],
})
export class VisitAddSitePageModule {}
