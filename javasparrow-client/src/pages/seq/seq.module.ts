import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SeqPage } from './seq';
import { ComponentsModule } from "../../components/components.module";
import { AceEditorModule } from "ng2-ace-editor";
import {DragulaModule} from "ng2-dragula/ng2-dragula";
import {DragulaService} from "ng2-dragula/ng2-dragula";

@NgModule({
  declarations: [
    SeqPage
  ],
  imports: [
    IonicPageModule.forChild(SeqPage),
    ComponentsModule,
    AceEditorModule,
    DragulaModule
  ],
  providers: [
    DragulaService
  ],
})
export class SeqPageModule {}
