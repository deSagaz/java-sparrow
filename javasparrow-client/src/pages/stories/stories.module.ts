import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { StoriesPage } from './stories';

@NgModule({
  declarations: [
    StoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(StoriesPage),
    TranslateModule.forChild()
  ],
  exports: [
    StoriesPage
  ]
})
export class StoriesPageModule { }
