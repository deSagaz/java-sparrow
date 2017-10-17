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

  api: string = '{"events":[{"id":5,"eventType":"text","data":{"content":"Welcome Agent Sparrow, always an honour to have such a talented spy in my office."}},{"id":23,"eventType":"backgroundChange","data":{"image":"assets/img/tech4learn_duckSlam.jpg"}},{"id":20,"eventType":"quiz","data":{"question":"What is a JavaScript array?","answer1":"A dedicated data type","answer2":"An regular JavaScript object","rightAnswerResponse":"Maybe I should be in that big chair!","rightAnswerResponseColor":"purple","wrongAnswer":"Woops, perhaps Javascript is a bit weird after all..."}},{"id":1,"eventType":"quiz","data":{"question":"What is a Javascript array?","answer_1":"A dedicated data type","answer_2":"An regular object"}}]}';
  sequence: object[];
  currentEventIndex: number;
  currentEventType: string;

  // primaryText is used for character dialogue and question texts
  primaryText: string;

  // Which components to show?
  showPrimaryText: boolean = true;
  showMultipleChoice: boolean = false;
  showNextButton: boolean = true;

  // Background
  backgroundImage: string = "/assets/img/duckAtDesk.jpg";



  init(sequenceObject: object) {
    this.sequence = sequenceObject['events'];
    this.currentEventIndex = -1;
  }

  next() {
    console.log("NEXT EVENT TRIGGERED: #" + (this.currentEventIndex + 1)); // DEBUG

    if(this.currentEventIndex == this.sequence.length - 1) {
      console.log("SEQUENCE HAS ENDED"); // DEBUG
      return;
      // sequence has ended. Return to chapter menu screen and check off level for user.
    }
    this.currentEventIndex++;
    this.currentEventType = this.sequence[this.currentEventIndex]['eventType'];

    // Now decide what to do with this event type
    if (this.currentEventType == "text") {
      this.doText();
    } else if (this.currentEventType == "backgroundChange") {
      this.doBackgroundChange();
    } else if (this.currentEventType == "quiz") {
      this.doQuiz();
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.init(JSON.parse(this.api));
    this.next();
  }

  ionViewDidLoad() {
  }


  doText() {
    // Load data
    this.primaryText = this.sequence[this.currentEventIndex]['data']['content'];

    // Set interface
    this.showPrimaryText = true;
    this.showMultipleChoice = false;
    this.showNextButton = true;
  }

  doBackgroundChange() {
    // Change background
    this.backgroundImage = this.primaryText = this.sequence[this.currentEventIndex]['data']['image'];

    // Immediately run next event
    this.next();
  }

  doQuiz() {
    // Load data
    this.primaryText = this.sequence[this.currentEventIndex]['data']['question'];
    // TODO: Load questions into component

    // Set interface
    this.showPrimaryText = true;
    this.showMultipleChoice = true;
    this.showNextButton = false;
  }


}
