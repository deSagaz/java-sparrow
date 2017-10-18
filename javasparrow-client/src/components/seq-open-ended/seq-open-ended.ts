import { Component, EventEmitter, Output } from '@angular/core';

/**
 * Generated class for the SeqOpenEndedComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'seq-open-ended',
  templateUrl: 'seq-open-ended.html'
})
export class SeqOpenEndedComponent {

  @Output() answerGiven = new EventEmitter();

  constructor() {
  }

  giveAnswer(ans: number) {
    this.answerGiven.emit(ans);
  }
}
