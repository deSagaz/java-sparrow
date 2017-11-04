import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Story } from '../../models/story';
import { Stories } from '../../providers/providers';
import { Observable } from "rxjs/Observable";

@IonicPage()
@Component({
  selector: 'page-stories',
  templateUrl: 'stories.html'
})
export class StoriesPage {

  currentStories: Observable<Story[]>;
  totalIntel: object;

  constructor(public navCtrl: NavController, public stories: Stories, public modalCtrl: ModalController) {

    this.stories.query();
    this.currentStories = this.stories.stories;

    // TODO: TEMPORARY
    this.totalIntel = {"1": 0, "2": 120, "3": 25};
  }

  /**
   * The view loaded, let's query our stories for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Navigate to the detail page for this story.
   */
  openStory(story: Story) {
    this.navCtrl.push('ScenesPage', {
      story: story
    });
  }

  // onClick(story) {
  //   if(story.unlocked){
  //     this.openStory(story);
  //   };
  // }
}
