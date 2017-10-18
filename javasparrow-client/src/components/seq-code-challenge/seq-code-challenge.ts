import { Component } from '@angular/core';

/**
 * Generated class for the SeqCodeChallengeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'seq-code-challenge',
  templateUrl: 'seq-code-challenge.html'
})
export class SeqCodeChallengeComponent {

  text: string;

  constructor() {
    console.log('Hello SeqCodeChallengeComponent Component');
    this.text = 'Hello World';
  }

}
