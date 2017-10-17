import { NgModule } from '@angular/core';
import { SeqCodeChallengeComponent } from './seq-code-challenge/seq-code-challenge';
import { SeqMultipleChoiceComponent } from './seq-multiple-choice/seq-multiple-choice';
import { IonicModule } from "ionic-angular";
import { MyApp } from "../app/app.component";

@NgModule({
	declarations: [SeqCodeChallengeComponent,
    SeqMultipleChoiceComponent],
	imports: [IonicModule.forRoot(SeqMultipleChoiceComponent)],
	exports: [SeqCodeChallengeComponent,
    SeqMultipleChoiceComponent]
})
export class ComponentsModule {}
