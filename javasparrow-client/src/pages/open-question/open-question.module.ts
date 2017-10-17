import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenQuestionPage } from './open-question';

@NgModule({
  declarations: [
    OpenQuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(OpenQuestionPage),
  ],
})
export class OpenQuestionPageModule {}
