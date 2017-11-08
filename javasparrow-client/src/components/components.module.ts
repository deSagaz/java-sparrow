import { NgModule } from '@angular/core';
import { SeqCodeChallengeComponent } from './seq-code-challenge/seq-code-challenge';
import { SeqMultipleChoiceComponent } from './seq-multiple-choice/seq-multiple-choice';
import { IonicModule } from "ionic-angular";
import { MyApp } from "../app/app.component";
import { SeqOpenEndedComponent } from './seq-open-ended/seq-open-ended';
import { SeqDragAndDropComponent } from './seq-drag-and-drop/seq-drag-and-drop';
import { DragulaModule } from "ng2-dragula/ng2-dragula";
import { SeqEndPageComponent } from './seq-end-page/seq-end-page';

@NgModule({
	declarations: [SeqCodeChallengeComponent,
    SeqMultipleChoiceComponent,
    SeqOpenEndedComponent,
    SeqDragAndDropComponent,
    SeqEndPageComponent],
	imports: [IonicModule.forRoot(SeqMultipleChoiceComponent), DragulaModule],
	exports: [SeqCodeChallengeComponent,
    SeqMultipleChoiceComponent,
    SeqOpenEndedComponent,
    SeqDragAndDropComponent,
    SeqEndPageComponent]
})
export class ComponentsModule {}
