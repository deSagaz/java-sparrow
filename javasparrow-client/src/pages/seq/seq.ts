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

  api: string = '{"events":[{"id":5,"eventType":"text","data":{"content":"Welcome Agent Sparrow, always an honour to have such a talented spy in my office."}},{"id":23,"eventType":"backgroundChange","data":{"image":"assets/img/tech4learn_duckSlam.jpg"}},{"id":20,"eventType":"quiz","data":{"question":"What is a JavaScript array?","answer1":"A dedicated data type","answer2":"An regular JavaScript object","correctAnswer":"2","correctAnswerResponse":"Maybe I should be in that big chair!","correctAnswerResponseColor":"purple","wrongAnswerResponse":"Woops, perhaps Javascript is a bit weird after all..."}}]}';
  sequence: object[];
  currentEventIndex: number;
  currentEventType: string;

  // primaryText is used for character dialogue and question texts
  primaryText: string;

  // Anwers are used for multiple choice
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answer5: string;
  answer6: string;

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
    if (this.sequence[this.currentEventIndex]['data']['answer1']) {
      this.answer1 = this.sequence[this.currentEventIndex]['data']['answer1']
    } else {
      this.answer1 = "";
    }
    if (this.sequence[this.currentEventIndex]['data']['answer2']) {
      this.answer2 = this.sequence[this.currentEventIndex]['data']['answer2']
    } else {
      this.answer2 = "";
    }
    if (this.sequence[this.currentEventIndex]['data']['answer3']) {
      this.answer3 = this.sequence[this.currentEventIndex]['data']['answer3']
    } else {
      this.answer3 = "";
    }
    if (this.sequence[this.currentEventIndex]['data']['answer4']) {
      this.answer4 = this.sequence[this.currentEventIndex]['data']['answer4']
    } else {
      this.answer4 = "";
    }
    if (this.sequence[this.currentEventIndex]['data']['answer5']) {
      this.answer5 = this.sequence[this.currentEventIndex]['data']['answer5']
    } else {
      this.answer5 = "";
    }
    if (this.sequence[this.currentEventIndex]['data']['answer6']) {
      this.answer6 = this.sequence[this.currentEventIndex]['data']['answer6']
    } else {
      this.answer6 = "";
    }

    // Set interface
    this.showPrimaryText = true;
    this.showMultipleChoice = true;
    this.showNextButton = false;
  }

  checkMultipleChoiceAnswer(ans: number) {
    if (ans == this.sequence[this.currentEventIndex]['data']['correctAnswer']) {
      this.primaryText = this.sequence[this.currentEventIndex]['data']['correctAnswerResponse'];
    } else {
      this.primaryText = this.sequence[this.currentEventIndex]['data']['wrongAnswerResponse'];
    }
    this.showMultipleChoice = false;
    this.showNextButton = true;
  }


}
