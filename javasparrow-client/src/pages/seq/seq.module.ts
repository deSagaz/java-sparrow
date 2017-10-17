import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeqPage } from './seq';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    SeqPage
  ],
  imports: [
    IonicPageModule.forChild(SeqPage),
    ComponentsModule
  ],
})
export class SeqPageModule {}
