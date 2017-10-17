import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeqMultipleChoicePage } from './seq-multiple-choice';

@NgModule({
  declarations: [
    SeqMultipleChoicePage,
  ],
  imports: [
    IonicPageModule.forChild(SeqMultipleChoicePage),
  ],
})
export class SeqMultipleChoicePageModule {}
