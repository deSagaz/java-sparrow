import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastProvider } from "../../providers/toast/toast";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { environment } from "../../environments/environment";
import 'brace';
import 'brace/ext/language_tools';
import 'brace/mode/javascript';
import 'ace-builds/src-min-noconflict/snippets/javascript';

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

  api: string = '{"events": [{"eventType":"backgroundChange","data":{"image":"tech4learn_corridor.jpg"}},{"eventType":"codeChallenge","data":{"question":"Write a cool program.","initCode":"ZnVuY3Rpb24gZmlib25hY2NpKG4pIHsNCiAgIGlmIChuIDwgMil7DQogICAgIHJldHVybiAxOw0KICAgfWVsc2V7DQogICAgIHJldHVybiBmaWJvbmFjY2kobi0yKSArIGZpYm9uYWNjaShuLTEpOw0KICAgfQ0KfQ0KDQpjb25zb2xlLmxvZyhmaWJvbmFjY2koNykpOw=="}},{"eventType":"text","data":{"content":"My name is Agent Sparrow, well my code name, actually. My real name, doesn’t matter. I am Sparrow, I long ago gave up my identity for the Sky-high intelligence agency. Simply put, I am part of a secret spy agency in charge of keeping the people’s safety.","contentColor":"#1ee7e0","contentItalic":"true"}},{"eventType":"text","data":{"content":"Sounds super cool, doesn’t it?","contentColor":"#1ee7e0","contentItalic":"true"}},{"eventType":"text","data":{"content":"Well it’s less cool when you suspect corruption in the ranks. Secretly I’ve been investigating into this, and I feel like I am getting close.","contentColor":"#1ee7e0","contentItalic":"true"}},{"eventType":"text","data":{"content":"But now... I feel a chill down my spine as I head towards my boss’s office for monthly testing.  This is the first time I’ve been asked to do a test with the big man himself, Agent Duck.","contentColor":"#1ee7e0","contentItalic":"true"}},{"eventType":"backgroundChange","data":{"image":"tech4learn_duckAtDesk.jpg"}},{"eventType":"text","data":{"content":"Welcome Agent Sparrow, always an honour to have such a talented spy in my office."}},{"eventType":"text","data":{"content":"An honour to be invited up here, sir.","contentColor":"#1ee7e0"}},{"eventType":"text","data":{"content":"Feel free to take a seat. I will be asking you some oral questions, which you will have to answer."}},{"eventType":"text","data":{"content":"An honour to be invited up here, sir.","contentColor":"#1ee7e0"}},{"eventType":"text","data":{"content":"I can see a weird glint in his eye. This is more than just a test.  Act normal.","contentColor":"#1ee7e0","contentItalic":"true"}},{"eventType":"text","data":{"content":"I am ready","contentColor":"#1ee7e0"}},{"eventType":"quiz","data":{"question":"What is a JavaScript array?","answers":["A dedicated data type","An regular JavaScript object"],"correctAnswer":1,"correctAnswerResponse":"Hot damn I am good!","correctAnswerResponseColor":"#1ee7e0","correctAnswerResponseItalic":"true","wrongAnswerResponse":"I suck","wrongAnswerResponseColor":"#1ee7e0","wrongAnswerResponseItalic":"true"}},{"eventType":"quiz","data":{"question":"What is a JavaScript array?","answers":["A dedicated data type","An regular JavaScript object","A dedicated data type","An regular JavaScript object"],"correctAnswer":1,"correctAnswerResponse":"Maybe I should be in that big chair!","correctAnswerResponseColor":"#1ee7e0","correctAnswerResponseItalic":"true","wrongAnswerResponse":"Nervous little sparrow?"}},{"eventType":"text","data":{"content":"Well done Sparrow, good results as usual. I am impressed, it would be a shame to lose an agent such as you."}},{"eventType":"text","data":{"content":"Yes, it would.","contentColor":"#1ee7e0"}},{"eventType":"text","data":{"content":"I suggest, that your current private affairs are put to rest."}},{"eventType":"text","data":{"content":"My private affairs? Are you sending me on a suicide mission? *nervous chuckle*","contentColor":"#1ee7e0"}},{"eventType":"text","data":{"content":"You’ve set yourself on a suicide mission."}},{"eventType":"text","data":{"content":"Well that’s just great…","contentColor":"#1ee7e0","contentItalic":"true"}},{"eventType":"text","data":{"content":"An agent always completes their mission, no matter the cost","contentColor":"#1ee7e0"}},{"eventType":"text","data":{"content":"Your Funeral, Sparrow!"}},{"eventType":"backgroundChange","data":{"image":"tech4learn_duckButtonSlam.jpg"}},{"eventType":"text","data":{"content":"*alarm*","contentColor":"red"}},{"eventType":"animation","data":{"frames":["tech4learn_duckSlide_1.jpg","tech4learn_duckSlide_2.jpg","tech4learn_duckSlide_3.jpg","tech4learn_duckSlide_4.jpg","tech4learn_duckSlide_5.jpg"],"fps":2,"waitStart":1,"waitEnd":1}},{"eventType":"text","data":{"content":"Oh! he’s ducking away from the fight","contentColor":"#1ee7e0","contentItalic":"true"}},{"eventType":"text","data":{"content":"Okay, don’t panic.","contentColor":"#1ee7e0","contentItalic":"true"}},{"eventType":"text","data":{"content":"This is just another workday for me.","contentColor":"#1ee7e0","contentItalic":"true"}},{"eventType":"text","data":{"content":"Criminals running away, alarms blaring.","contentColor":"#1ee7e0","contentItalic":"true"}},{"eventType":"text","data":{"content":"Right, the alarm I need to shut it off before it drives me insane.","contentColor":"#1ee7e0","contentItalic":"true"}},{"id":3,"eventType":"open","data":{"question":"Write number 4","correctAnswer":4,"wrongAnswerResponse": "No","correctAnswerResponse": "Yes","wrongAnswerResponseColor": "#1ee7e0","correctAnswerResponseColor": "#1ee7e0"}}]}';
  sequence: object[];
  currentEventIndex: number;
  currentEventType: string;

  @ViewChild('editor') editor;
  text: string = "";

  // primaryText is used for character dialogue and question texts
  primaryText: string;
  primaryTextColor: string;
  primaryTextItalic: boolean;

  // Anwers are used for multiple choice
  multipleChoiceAnswers: string[];

  // Which components to show?
  showPrimaryText: boolean = true;
  showNextButton: boolean = true;
  showMultipleChoice: boolean = false;
  showOpenEnded: boolean = false;
  showCodeWindow: boolean = false;

  // Background
  backgroundImage: BehaviorSubject<string>;
  backgroundContrast: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: ToastProvider) {
    this.backgroundImage = new BehaviorSubject("");

    this.init(JSON.parse(this.api));
    this.next();
  }

  ngAfterViewInit() {
    // Initialize editor:
    // Must be initialised in the background on first view
    // and should not be removed after that.
    this.editor.setTheme("monokai");
    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true,
      fontSize: "16px",
      enableSnippets: true,
      enableLiveAutocompletion: true,
    });
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

    // reset styles to default
    this.resetStyle();

    this.currentEventIndex++;
    this.currentEventType = this.sequence[this.currentEventIndex]['eventType'];

    // Now decide what to do with this event type
    if (this.currentEventType == "text") {
      this.doText();
    } else if (this.currentEventType == "backgroundChange") {
      this.doBackgroundChange();
    } else if (this.currentEventType == "quiz") {
      this.doQuiz();
    } else if (this.currentEventType == "open") {
      this.doOpenEnded();
    } else if (this.currentEventType == "animation") {
      this.doAnimation(this.sequence[this.currentEventIndex]['data']);
    } else if (this.currentEventType == "codeChallenge") {
      this.doCodeChallenge(this.sequence[this.currentEventIndex]['data']);
    } else {
      console.error("Event type unknown: ", this.currentEventType);
      this.toast.error("Event type unknown. Contact a developer.");
      this.currentEventIndex--; // Rewind event index
    }
  }

  resetStyle() {
    this.primaryTextColor = "white";
    this.primaryTextItalic = false;
  }

  doText() {
    // Load data
    this.primaryText = this.sequence[this.currentEventIndex]['data']['content'];

    // Set styling
    if (this.sequence[this.currentEventIndex]['data']['contentColor']) {
      this.primaryTextColor = this.sequence[this.currentEventIndex]['data']['contentColor'];
    }
    if (this.sequence[this.currentEventIndex]['data']['contentItalic']) {
      this.primaryTextItalic = this.sequence[this.currentEventIndex]['data']['contentItalic'];
    }

    // Set interface
    this.showPrimaryText = true;
    this.showMultipleChoice = false;
    this.showNextButton = true;
    this.backgroundContrast = false;
  }

  doBackgroundChange() {
    // Change background
    this.backgroundImage.next(environment.imgLoc + this.sequence[this.currentEventIndex]['data']['image']);
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

      if (this.sequence[this.currentEventIndex]['data']['correctAnswerResponseColor']) {
        this.primaryTextColor = this.sequence[this.currentEventIndex]['data']['correctAnswerResponseColor'];
      }
      if (this.sequence[this.currentEventIndex]['data']['correctAnswerResponseItalic']) {
        this.primaryTextItalic = this.sequence[this.currentEventIndex]['data']['correctAnswerResponseItalic'];
      }
    } else {
      this.primaryText = this.sequence[this.currentEventIndex]['data']['wrongAnswerResponse'];

      if (this.sequence[this.currentEventIndex]['data']['wrongAnswerResponseColor']) {
        this.primaryTextColor = this.sequence[this.currentEventIndex]['data']['wrongAnswerResponseColor'];
      }
      if (this.sequence[this.currentEventIndex]['data']['wrongAnswerResponseItalic']) {
        this.primaryTextItalic = this.sequence[this.currentEventIndex]['data']['wrongAnswerResponseItalic'];
      }
    }
    this.showMultipleChoice = false;
    this.showNextButton = true;
  }

  doOpenEnded(){
    // Load question
    this.primaryText = this.sequence[this.currentEventIndex]['data']['question'];

    // Set interface
    this.showPrimaryText = true;
    this.showOpenEnded = true;
    this.showNextButton = false;
    this.backgroundContrast = true;
  }

  checkOpenEndedAnswer (ans: number) {
    if (ans == this.sequence[this.currentEventIndex]['data']['correctAnswer']) {
      this.primaryText = this.sequence[this.currentEventIndex]['data']['correctAnswerResponse'];

      if (this.sequence[this.currentEventIndex]['data']['correctAnswerResponseColor']) {
        this.primaryTextColor = this.sequence[this.currentEventIndex]['data']['correctAnswerResponseColor'];
      }
      if (this.sequence[this.currentEventIndex]['data']['correctAnswerResponseItalic']) {
        this.primaryTextItalic = this.sequence[this.currentEventIndex]['data']['correctAnswerResponseItalic'];
      }
    } else{
      this.primaryText = this.sequence[this.currentEventIndex]['data']['wrongAnswerResponse'];

      if (this.sequence[this.currentEventIndex]['data']['wrongAnswerResponseColor']) {
        this.primaryTextColor = this.sequence[this.currentEventIndex]['data']['wrongAnswerResponseColor'];
      }
      if (this.sequence[this.currentEventIndex]['data']['wrongAnswerResponseItalic']) {
        this.primaryTextItalic = this.sequence[this.currentEventIndex]['data']['wrongAnswerResponseItalic'];
      }
    }
    this.showOpenEnded = false;
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
          this.backgroundImage.next(environment.imgLoc + item);
          // console.log((1000 / fps) * (index + 1)); // DEBUG
        }, (1000 / fps) * (index));
      })
    }, (data['waitStart']*1000));

    // Set ending wait time
    setTimeout(() => {
      this.next();
    }, (data['waitStart']*1000 + ((1000 / fps) * frames.length) +  data['waitEnd']*1000));
  }

  doCodeChallenge(data: object) {
    // Load interface container
    this.showCodeWindow = true;
    this.showNextButton = false;

    // Set challenge and initial code in editor
    this.primaryText = data['question'];
    this.text = atob(data['initCode']);
  }

  checkCodeChallenge() {
    // Hide editor
    this.showCodeWindow = false;

    this.next();
  }

}
