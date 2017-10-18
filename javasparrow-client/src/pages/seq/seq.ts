import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastProvider } from "../../providers/toast/toast";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

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

  api: string = '{"events":[{"id":29,"eventType":"backgroundChange","data":{"image":"assets/img/duckAtDesk.jpg"}},{"id":5,"eventType":"text","data":{"content":"Welcome Agent Sparrow, always an honour to have such a talented spy in my office."}},{"id":23,"eventType":"backgroundChange","data":{"image":"assets/img/tech4learn_duckSlam.jpg"}},{"id":20,"eventType":"quiz","data":{"question":"What is a JavaScript array?","answers":["A dedicated data type","An regular JavaScript object"],"correctAnswer":"1","correctAnswerResponse":"Maybe I should be in that big chair!","correctAnswerResponseColor":"#1ee7e0","correctAnswerResponseItalic":"true","wrongAnswerResponse":"Woops, perhaps Javascript is a bit weird after all...", "wrongAnswerResponseColor":"#1ee7e0","wrongAnswerResponseItalic":"true"}},{"id":20,"eventType":"quiz","data":{"question":"What is a JavaScript array?","answers":["A dedicated data type","An regular JavaScript object"],"correctAnswer":"1","correctAnswerResponse":"Maybe I should be in that big chair!","correctAnswerResponseColor":"#1ee7e0","correctAnswerResponseItalic":"true","wrongAnswerResponse":"Woops, perhaps Javascript is a bit weird after all...", "wrongAnswerResponseColor":"#1ee7e0","wrongAnswerResponseItalic":"true"}},{"id":0,"eventType":"animation","data":{"frames":["assets/img/tech4learn_duckSlide_1.jpg","assets/img/tech4learn_duckSlide_2.jpg","assets/img/tech4learn_duckSlide_3.jpg","assets/img/tech4learn_duckSlide_4.jpg","assets/img/tech4learn_duckSlide_5.jpg"],"fps":2, "waitStart":3, "waitEnd":3}}]}';
  sequence: object[];
  currentEventIndex: number;
  currentEventType: string;

  // primaryText is used for character dialogue and question texts
  primaryText: string;
  primaryTextColor: string;
  primaryTextItalic: boolean;

  // Anwers are used for multiple choice
  multipleChoiceAnswers: string[];

  // Which components to show?
  showPrimaryText: boolean = true;
  showMultipleChoice: boolean = false;
  showNextButton: boolean = true;

  // Background
  backgroundImage: BehaviorSubject<string>;
  backgroundContrast: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: ToastProvider) {
    this.backgroundImage = new BehaviorSubject("");

    this.init(JSON.parse(this.api));
    this.next();
  }

  init(sequenceObject: object) {
    this.sequence = sequenceObject['events'];
    this.currentEventIndex = -1;
  }

  next() {
    if(this.currentEventIndex == this.sequence.length - 1) {
      console.log("SEQUENCE HAS ENDED"); // DEBUG
      this.toast.info("Sequence has ended. Please wait. Developers will get you out of here eventually.");
      // TODO: Return to chapter menu screen and check off level for user.
      return;
    } else {
      console.log("NEXT EVENT TRIGGERED: #" + (this.currentEventIndex + 1)); // DEBUG
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
    } else if (this.currentEventType == "animation") {
      this.doAnimation(this.sequence[this.currentEventIndex]['data']);
    }else {
      console.error("Event type unknown: ", this.currentEventType);
      this.toast.error("Event type unknown. Contact a developer.");
      this.currentEventIndex--; // Rewind event index
    }
  }

  resetStyle() {
    this.primaryTextColor = "#17d7d0";
    this.primaryTextItalic = false;
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
    this.backgroundImage.next(this.sequence[this.currentEventIndex]['data']['image']);
    // Immediately run next event
    this.next();
  }

  doQuiz() {
    // Load data
    this.primaryText = this.sequence[this.currentEventIndex]['data']['question'];
    // Go through each answer in the answer array
    this.multipleChoiceAnswers = this.sequence[this.currentEventIndex]['data']['answers'];

    // Set interface
    this.showPrimaryText = true;
    this.showMultipleChoice = true;
    this.showNextButton = false;
    this.backgroundContrast = true;
  }

  checkMultipleChoiceAnswer(ans: number) {
    if (ans == this.sequence[this.currentEventIndex]['data']['correctAnswer']) {
      this.primaryText = this.sequence[this.currentEventIndex]['data']['correctAnswerResponse'];
      this.primaryTextColor = this.sequence[this.currentEventIndex]['data']['correctAnswerResponseColor'];
      this.primaryTextItalic = this.sequence[this.currentEventIndex]['data']['correctAnswerResponseItalic'];
    } else {
      this.primaryText = this.sequence[this.currentEventIndex]['data']['wrongAnswerResponse'];
      this.primaryTextColor = this.sequence[this.currentEventIndex]['data']['wrongAnswerResponseColor'];
      this.primaryTextItalic = this.sequence[this.currentEventIndex]['data']['wrongAnswerResponseItalic'];
    }
    this.showMultipleChoice = false;
    this.showNextButton = true;
  }

  doAnimation(data: object) {
    // Set interface
    this.showPrimaryText = false;
    this.showMultipleChoice = false;
    this.showNextButton = false;
    this.backgroundContrast = false;

    // console.log("ANIMATION STARTED"); // DEBUG
    let frames: string[] = data['frames'];
    let fps: number = data['fps'];

    // Set starting wait time
    setTimeout(() => {
      // console.log((data['waitStart'] * 1000)); // DEBUG
      frames.forEach((item, index) => {
        setTimeout(() => {
          this.backgroundImage.next(item);
          // console.log((1000 / fps) * (index + 1)); // DEBUG
        }, (1000 / fps) * (index));
      })
    }, (data['waitStart']*1000));

    // Set ending wait time
    setTimeout(() => {
      this.next();
    }, (data['waitStart']*1000 + ((1000 / fps) * frames.length) +  data['waitEnd']*1000));
  }


}
