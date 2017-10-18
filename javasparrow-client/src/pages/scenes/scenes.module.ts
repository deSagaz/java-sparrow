import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ScenesPage } from './scenes';

@NgModule({
  declarations: [
    ScenesPage,
  ],
  imports: [
    IonicPageModule.forChild(ScenesPage),
    TranslateModule.forChild()
  ],
  exports: [
    ScenesPage
  ]
})
export class ScenesPageModule { }
