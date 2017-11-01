import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Story } from '../../models/story';
import { Stories } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-stories',
  templateUrl: 'stories.html'
})
export class StoriesPage {
  currentStories: Story[];

  constructor(public navCtrl: NavController, public stories: Stories, public modalCtrl: ModalController) {

    this.currentStories = this.stories.query();
  }

  /**
   * The view loaded, let's query our stories for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new story. This shows our StoryCreatePage in a
   * modal and then adds the new story to our data source if the user created one.
   */
  addStory() {
    let addModal = this.modalCtrl.create('StoryCreatePage');
    addModal.onDidDismiss(story => {
      if (story) {
        this.stories.add(story);
      }
    })
    addModal.present();
  }

  /**
   * Delete an story from the list of stories.
   */
  deleteStory(story) {
    this.stories.delete(story);
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
