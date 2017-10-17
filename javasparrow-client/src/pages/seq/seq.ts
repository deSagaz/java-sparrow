import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SeqPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-seq',
  templateUrl: 'seq.html',
})
export class SeqPage {

  api: string = '{"events":[{"id":5,"eventType":"text","data":{"content":"Welcome Agent Sparrow, always an honour to have such a talented spy in my office."}},{"id":23,"eventType":"backgroundChange","data":{"image":"https://example.com/image.jpg"}},{"id":20,"eventType":"quiz","data":{"question":"What is a JavaScript array?","answer1":"A dedicated data type","answer2":"An regular JavaScript object","rightAnswerResponse":"Maybe I should be in that big chair!","rightAnswerResponseColor":"purple","wrongAnswer":"Woops, perhaps Javascript is a bit weird after all..."}},{"id":1,"eventType":"quiz","data":{"question":"What is a Javascript array?","answer_1":"A dedicated data type","answer_2":"An regular object"}}]}';
  sequence: object[];
  currentEvent: number;

  init(sequenceObject: object) {
    this.sequence = sequenceObject['events'];
    this.currentEvent = -1;
  }

  next() {
    this.currentEvent++;
    return this.sequence[this.currentEvent];
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.init(JSON.parse(this.api));
    this.gameLoop();
  }

  gameLoop() {
    while(this.currentEvent < this.sequence.length - 1) {
      console.log(this.next());
    }
  }

  ionViewDidLoad() {
  }
}
