import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OpenQuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-open-question',
  templateUrl: 'open-question.html',
})
export class OpenQuestionPage {
  question: any;

  constructor(public navCtrl: NavController, public navParams: NavParams){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenQuestionPage');
  }

}
