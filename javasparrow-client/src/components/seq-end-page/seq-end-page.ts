import { Component, Input } from '@angular/core';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

/**
 * Generated class for the SeqEndPageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'seq-end-page',
  templateUrl: 'seq-end-page.html'
})
export class SeqEndPageComponent {

  @Input() score: number;
  @Input() message: string;
  @Input() image: BehaviorSubject<string>;

  constructor() {
  }

}
