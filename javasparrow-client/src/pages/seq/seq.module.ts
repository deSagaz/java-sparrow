import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeqPage } from './seq';
import { ComponentsModule } from "../../components/components.module";
import { AceEditorModule } from "ng2-ace-editor";

@NgModule({
  declarations: [
    SeqPage
  ],
  imports: [
    IonicPageModule.forChild(SeqPage),
    ComponentsModule,
    AceEditorModule
  ],
})
export class SeqPageModule {}
