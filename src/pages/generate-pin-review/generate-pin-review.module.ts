import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneratePinReviewPage } from './generate-pin-review';

@NgModule({
  declarations: [
    GeneratePinReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(GeneratePinReviewPage),
  ],
})
export class GeneratePinReviewPageModule {}
