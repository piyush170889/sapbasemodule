import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverSortFiltersPage } from './popover-sort-filters';

@NgModule({
  declarations: [
    PopoverSortFiltersPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverSortFiltersPage),
  ],
})
export class PopoverSortFiltersPageModule {}
