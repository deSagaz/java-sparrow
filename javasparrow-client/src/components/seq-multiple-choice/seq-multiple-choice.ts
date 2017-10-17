import { Component, Input } from '@angular/core';

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

  @Input() answer1: string;
  @Input() answer2: string;
  @Input() answer3: string;
  @Input() answer4: string;
  @Input() answer5: string;
  @Input() answer6: string;

  constructor() {
  }

}
