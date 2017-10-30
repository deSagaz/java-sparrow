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
  templateUrl: 'seq-drag-and-drop.html'
})
export class SeqDragAndDropComponent{
  @Input() staticCode = [];
  @Input() draggableCode = [];

  @Output() answer = new EventEmitter();

  //public many: Array<any> = [{name: 'Item A', draggable: false},{name: 'Item B', draggable: false},{name: 'Item C', draggable: false},{name: 'Item D', draggable: false}];
  //public many2: Array<any> = [{name: 'Item 1', draggable: true},{name: 'Item 2', draggable: true},{name: 'Item 3', draggable: true},{name: 'Item 4', draggable: true}];

  constructor(private dragulaService: DragulaService) {
    //We need two lists, one with the static code and one with the draggable code. This for loop adds all static
    //items to a new array and adds the draggable which is needed for Dragula and excludes the draggable items which
    //indices are in draggableindices.

    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
    dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });

    dragulaService.setOptions('another-bag', {
      moves: (el, source, handle, sibling) => !el.classList.contains('no-drag')
    });
  }

  private onDropModel(args) {
    let [el, target, source] = args;
    // do something else
  }

  private onRemoveModel(args) {
    let [el, source] = args;
    // do something else
  }

  submitCode(){
    console.log(this.staticCode);
    console.log(this.draggableCode);
    let ansList = this.staticCode;
    let ans = [];
    for(let k in ansList) ans.push(k);//Todo: check if this workd: create list from codeLine
    this.answer.emit(ans);
    console.log(ans);
  }
}
