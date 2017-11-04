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
 * Simple array shuffler
 * Taken from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array?page=1&tab=votes#tab-top
 */
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

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
  sequence: object[]; // Stack of elements - approached from top to bottom

  currentEventData: object;

  @ViewChild('editor') editor;
  code: string = "";

  // primaryText is used for character dialogue and question texts
  primaryText: string;
  primaryTextColor: string;
  primaryTextItalic: boolean;

  // Answers are used for multiple choice
  multipleChoiceAnswers: string[];

  // Code for drag and drop and which lines of those are draggable
  dragAndDropCode: Array<any> = [];
  draggableCode: Array<any> = [];

  // Which components to show?
  showPrimaryText: boolean = true;
  showNextButton: boolean = true;
  showHintButton: boolean = false;
  showMultipleChoice: boolean = false;
  showOpenEnded: boolean = false;
  showCodeWindow: boolean = false;
  showCodeWindowSubmit: boolean = false;
  showDragAndDrop: boolean = false;

  // Background
  backgroundImage: BehaviorSubject<string>;
  backgroundContrast: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: ToastProvider,
              private _webWorkerService: WebWorkerService, private stories: Stories) {
  }

  ionViewWillEnter() {
    this.backgroundImage = new BehaviorSubject("");
    this.scene = this.navParams.get("scene");

    // Check whether sequence was valid
    if (!this.scene) {
      this.toast.error("No scene passed. Returning to menu.");
      this.navCtrl.popToRoot();
      return;
    } else if (!this.scene || Object.keys(this.scene['events']).length === 0) {
      this.toast.error("Empty sequence. Returning to menu.");
      this.navCtrl.pop();
      return;
    }

    // Avoid changing the referenced array by making a new one
    this.sequence = [].concat(this.scene['events']).reverse();
    this.next();

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
    // Check if sequence is empty
    if (this.sequence.length === 0) {
      console.log("SEQUENCE HAS ENDED"); // DEBUG
      this.navCtrl.pop();
      return;
    } else {
      console.log("NEXT EVENT TRIGGERED"); // DEBUG
    }

    // reset styles to default
    this.resetStyle();

    console.log(this.sequence);
    let currentEvent = this.sequence.pop();
    let currentEventType = currentEvent['eventType'];
    this.currentEventData = currentEvent['data'];
    console.log(this.currentEventData);

    // Now decide what to do with this event type, and pass event data to function.
    if (currentEventType == "text") {
      this.doText(this.currentEventData);
    } else if (currentEventType == "backgroundChange") {
      this.doBackgroundChange(this.currentEventData);
    } else if (currentEventType == "quiz") {
      this.doQuiz(this.currentEventData);
    } else if (currentEventType == "open") {
      this.doOpenEnded(this.currentEventData);
    } else if (currentEventType == "drag") {
      this.doDragAndDrop(this.currentEventData);
    } else if (currentEventType == "animation") {
      this.doAnimation(this.currentEventData);
    } else if (currentEventType == "codeChallenge") {
      this.doCodeChallenge(this.currentEventData);
    } else {
      console.error("Event type unknown: ", currentEventType);
      this.toast.error("Event type unknown. Please update your application to the latest version.");
      // Skip this event
      this.next();
      return;
    }
    // If known event, check for generic event data.
    this.doGeneric(this.currentEventData);
  }

  doGeneric(data: object) {
    // Set styling
    if (data['contentColor']) {
      this.primaryTextColor = data['contentColor'];
    }
    if (data['contentItalic']) {
      this.primaryTextItalic = data['contentItalic'];
    }
    // Show hint button, if available
    if (data['hint']){
      this.showHintButton = true;
    }
  }

  showHint() {
    this.toast.showHint(this.currentEventData['hint']);
  }

  /**
   * Reset all component displays to be off and reset default styles.
   */
  resetStyle() {
    this.primaryTextColor = "white";
    this.primaryTextItalic = false;
    this.showHintButton = false; // When hint is found, it is turned on again.
    this.showMultipleChoice = false;
    this.showNextButton = false;
    this.showPrimaryText = false;
    this.backgroundContrast = false;
    this.showOpenEnded = false;
    this.showCodeWindow = false;
    this.showCodeWindowSubmit = false;
    this.showDragAndDrop = false;
  }

  doText(data: object) {
    // Load data
    this.primaryText = data['content'];

    // Set interface
    this.showPrimaryText = true;
    this.showMultipleChoice = false;
    this.showNextButton = true;
    this.backgroundContrast = false;
  }

  doBackgroundChange(data: object) {
    // Change background
    this.backgroundImage.next(environment.imgLoc + data['image']);
    // Immediately run next event
    this.next();
  }

  doQuiz(data: object) {
    // Load data
    this.primaryText = data['question'];
    // Go through each answer in the answer array
    this.multipleChoiceAnswers = data['answers'];

    // Set interface
    this.showPrimaryText = true;
    this.showMultipleChoice = true;
    this.showNextButton = false;
    this.backgroundContrast = true;
  }

  doOpenEnded(data: object){
    // Load question
    this.primaryText = data['question'];

    // Load code
    this.code = atob(data['code']); // Decrypt base64 encoded string;
    this.editor.getEditor().setOptions({
      readOnly: true
    });

    // Set interface
    this.showPrimaryText = true;
    this.showOpenEnded = true;
    this.showCodeWindow = true;
    this.showNextButton = false;
    this.backgroundContrast = true;
  }

  doDragAndDrop(data: object){
    //Question
    this.primaryText = data['question'];

    //Pass code and indices of code lines which are draggable
    let code = data['code'];
    let draggableIndices = data['draggable_indices'];
    let extraCode = data['extra'];

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

    this.draggableCode = shuffle(this.draggableCode);
    console.log(this.draggableCode);

    // Set interface
    this.showPrimaryText = true;
    this.showDragAndDrop = true;
    this.showNextButton = false;
    this.backgroundContrast = true;
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
    this.showPrimaryText = true;
    this.showCodeWindow = true;
    this.showNextButton = false;
    this.showCodeWindowSubmit = true;

    // Set challenge and initial code in editor
    this.primaryText = data['question'];
    this.code = atob(data['initCode']); // Decrypt base64 encoded string
    this.editor.getEditor().setOptions({
      readOnly: false
    });
  }

  checkSimpleAnswer(ans: number) {
    if (ans == this.currentEventData['correctAnswer']) {
      this.correctAnswerResponse();
    } else {
      this.wrongAnswerResponse();
    }
  }

  wrongAnswerResponse() {
    // Check if answer response is given (as object). If not, go to next step in sequence.
    if (this.currentEventData['wrongAnswerResponse'] !== null && typeof this.currentEventData['wrongAnswerResponse'] === 'object') {
      this.sequence = this.sequence.concat([].concat(this.currentEventData['wrongAnswerResponse']).reverse());
    }
    this.next();
  }
  correctAnswerResponse() {
    // Check if answer response is given. If not, go to next step in sequence.
    if (this.currentEventData['correctAnswerResponse'] !== null && typeof this.currentEventData['correctAnswerResponse'] === 'object') {
      this.sequence = this.sequence.concat([].concat(this.currentEventData['correctAnswerResponse']).reverse());
    }
    this.next();
  }

  //Checks if the correct answer list given by the server is the same as the list given by seq-drag-and-drop.
  checkDragAndDrop(ans) {
    let rightAnswer = this.currentEventData['code'];
    if (ans.length != rightAnswer.length) {
      this.wrongAnswerResponse();
    } else {
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

    // Set interface
    this.showDragAndDrop = false;
    this.showNextButton = true;
  }

  checkCodeChallenge() {
    // Do preliminary check
    if (this.currentEventData['disallowLoops']) {
      // Check if user used any references to while or for
      if (this.code.includes("while") || this.code.includes("for")) {
        // Show error message
        this.toast.error("You used a loop. These are not allowed on this system. Try a recursive approach.");
        return;
      }
    }

    // Check for hardcoded answer
    if (this.code.includes("return " + 6765)) {
      // Show error message
      this.toast.error("You CHEATED. Game Over.");
      return;
    }

    // Use web worker to run code separate from DOM
    const promise = this._webWorkerService.run(new Function(this.code)).then(
      (result) => {
        // Check if correct
        if (this.currentEventData['answer'] == result) {
          // If correct
          this.primaryText = this.currentEventData['correctAnswerResponse'];

          if (this.currentEventData['correctAnswerResponseColor']) {
            this.primaryTextColor = this.currentEventData['correctAnswerResponseColor'];
          }
          if (this.currentEventData['correctAnswerResponseItalic']) {
            this.primaryTextItalic = this.currentEventData['correctAnswerResponseItalic'];
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
