import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastProvider } from "../../providers/toast/toast";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { environment } from "../../environments/environment";
import 'brace';
import 'brace/ext/language_tools';
import 'brace/mode/javascript';
import 'ace-builds/src-min-noconflict/snippets/javascript';
import { WebWorkerService } from 'angular2-web-worker';
import { Scene } from "../../models/scene";
import { Stories } from "../../providers/items/stories";

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

  scene: Scene[];
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

  //Code snippet shown for the open question
  openEndedCode: string[] = [];

  //Code for drag and drop and which lines of those are draggable
  dragAndDropCode: Array<any> = [];
  draggableCode: Array<any> = [];

  // Which components to show?
  showPrimaryText: boolean = true;
  showNextButton: boolean = true;
  showMultipleChoice: boolean = false;
  showOpenEnded: boolean = false;
  showCodeWindow: boolean = false;
  showDragAndDrop: boolean = false;

  // Background
  backgroundImage: BehaviorSubject<string>;
  backgroundContrast: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: ToastProvider,
              private _webWorkerService: WebWorkerService, private stories: Stories) {
    this.backgroundImage = new BehaviorSubject("");

    this.scene = navParams.get("scene");

    // Check whether sequence was valid
    if (!this.scene) {
      this.toast.error("No scene passed. Returning to menu.");
      this.navCtrl.goToRoot();
      return;
    } else if (!this.scene || Object.keys(this.scene['events']).length === 0) {
      this.toast.error("Empty sequence. Returning to menu.");
      this.navCtrl.pop();
      return;
    }

    this.sequence = this.scene['events'];
    this.currentEventIndex = -1;
    this.next();
  }

  ngAfterViewInit() {
    // Initialize editor:
    // Must be initialised in the background on first view
    // and should not be removed after that.
    this.editor.setTheme("monokai");
    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true,
      fontSize: "12px",
      enableSnippets: true,
      enableLiveAutocompletion: true
    });
  }

  next() {
    if(this.currentEventIndex == this.sequence.length - 1) {
      console.log("SEQUENCE HAS ENDED"); // DEBUG
      this.navCtrl.pop();
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
    } else if (this.currentEventType == "drag") {
      this.doDragAndDrop();
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

    // Load code
    this.openEndedCode = this.sequence[this.currentEventIndex]['data']['code'];

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

  doDragAndDrop(){
    //Question
    this.primaryText = this.sequence[this.currentEventIndex]['data']['question'];

    //Pass code and indices of code lines which are draggable
    let code = this.sequence[this.currentEventIndex]['data']['code'];
    let draggableIndices = this.sequence[this.currentEventIndex]['data']['draggable_indices'];
    let extraCode = this.sequence[this.currentEventIndex]['data']['extra'];

    let len = code.length;
    for (let i = 0; i < len; i++) {
      if(!draggableIndices.includes(i)) {
        this.dragAndDropCode.push({
          codeLine: code[i],
          draggable: false
        });
      }
    }

    //This for loop creates an array for the draggable items.
    len = draggableIndices.length;
    for (let i = 0; i < len; i++) {
      this.draggableCode.push({
        codeLine: code[draggableIndices[i]],
        draggable: true
      });
    }

    len = extraCode.length;
    for (let i = 0; i < len; i++) {
      this.draggableCode.push({
        codeLine: extraCode[i],
        draggable: true
      });
    }

    // Set interface
    this.showPrimaryText = true;
    this.showDragAndDrop = true;
    this.showNextButton = false;
    this.backgroundContrast = true;
  }

  //Checks if the correct answer list given by the server is the same as the list given by seq-drag-and-drop.
  checkDragAndDrop(ans){
    let rightAnswer = this.sequence[this.currentEventIndex]['data']['code'];
    if (ans.length != rightAnswer.length){
      this.wrongAnswerResponse();
    }else{
      for (let i = 0; i < ans.length; ++i) {
        if (ans[i] !== rightAnswer[i]){
          this.wrongAnswerResponse();
          this.showDragAndDrop = false;
          this.showNextButton = true;
          return false;
        }
      }
      this.correctAnswerResponse();
    }
    this.showDragAndDrop = false;
    this.showNextButton = true;
  }

  //Todo: use for other question-checks too
  correctAnswerResponse(){
    this.primaryText = this.sequence[this.currentEventIndex]['data']['correctAnswerResponse'];

    if (this.sequence[this.currentEventIndex]['data']['correctAnswerResponseColor']) {
      this.primaryTextColor = this.sequence[this.currentEventIndex]['data']['correctAnswerResponseColor'];
    }
    if (this.sequence[this.currentEventIndex]['data']['correctAnswerResponseItalic']) {
      this.primaryTextItalic = this.sequence[this.currentEventIndex]['data']['correctAnswerResponseItalic'];
    }
  }

  wrongAnswerResponse(){
    this.primaryText = this.sequence[this.currentEventIndex]['data']['wrongAnswerResponse'];

    if (this.sequence[this.currentEventIndex]['data']['wrongAnswerResponseColor']) {
      this.primaryTextColor = this.sequence[this.currentEventIndex]['data']['wrongAnswerResponseColor'];
    }
    if (this.sequence[this.currentEventIndex]['data']['wrongAnswerResponseItalic']) {
      this.primaryTextItalic = this.sequence[this.currentEventIndex]['data']['wrongAnswerResponseItalic'];
    }
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
    // Do preliminary check
    if (this.sequence[this.currentEventIndex]['data']['disallowLoops']) {
      // Check if user used any references to while or for
      if (this.text.includes("while") || this.text.includes("for")) {
        // Show error message
        this.toast.error("You used a loop. These are not allowed on this system. Try a recursive approach.");
        return;
      }
    }

    // Check for hardcoded answer
    if (this.text.includes("return " + 6765)) {
      // Show error message
      this.toast.error("You CHEATED. Game Over.");
      return;
    }

    const promise = this._webWorkerService.run(new Function(this.text)).then(
      (result) => {
        // Check if correct
        if (this.sequence[this.currentEventIndex]['data']['answer'] == result) {
          // If correct
          this.primaryText = this.sequence[this.currentEventIndex]['data']['correctAnswerResponse'];

          if (this.sequence[this.currentEventIndex]['data']['correctAnswerResponseColor']) {
            this.primaryTextColor = this.sequence[this.currentEventIndex]['data']['correctAnswerResponseColor'];
          }
          if (this.sequence[this.currentEventIndex]['data']['correctAnswerResponseItalic']) {
            this.primaryTextItalic = this.sequence[this.currentEventIndex]['data']['correctAnswerResponseItalic'];
          }
          this.showCodeWindow = false;
          this.showNextButton = true;

        } else {
          // Show error message
          this.toast.error("You returned '" + result + "'. This is not the right solution. Try again.");
        }
      },
      (error: ErrorEvent) => {
        // Show error message
        this.toast.error("ERROR: " + error.message);
      }
    );
  }
}
