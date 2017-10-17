import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Generated class for the SeqMultipleChoiceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'seq-multiple-choice',
  templateUrl: 'seq-multiple-choice.html',
})
export class SeqMultipleChoiceComponent {

  @Input() answers: string[];

  @Output() answerGiven = new EventEmitter();

  constructor() {
  }

  giveAnswer(ans: number) {
    this.answerGiven.emit(ans);
  }

}
