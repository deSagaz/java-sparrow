import { Component, Input, Output, EventEmitter} from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

/**
 * Generated class for the SeqDragAndDropComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'seq-drag-and-drop',
  templateUrl: 'seq-drag-and-drop.html',
  providers: [DragulaService]
})
export class SeqDragAndDropComponent{
  @Input() staticCode = [];
  @Input() draggableCode = [];

  @Output() answer = new EventEmitter();

  constructor(dragulaService: DragulaService) {
    //We need two lists, one with the static code and one with the draggable code. This for loop adds all static
    //items to a new array and adds the draggable which is needed for Dragula and excludes the draggable items which
    //indices are in draggableindices.

    dragulaService.setOptions('drag-drop', {
      moves: (el, source, handle, sibling) => !el.classList.contains('no-drag')
    });
  }

  //The static code is an array with a codeLine and draggable key. To compare the answer we only need the values of
  //the codeLine keys, so this function maps those to a list and emits that as answer.
  submitCode(){
    let ansList = this.staticCode;
    let ans = ansList.map(a => a.codeLine);
    this.answer.emit(ans);
  }
}
