import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Story } from '../../models/story';
import { Stories } from '../../providers/providers';
import { Observable } from "rxjs/Observable";
import { User } from "../../providers/user/user";
import { ToastProvider } from "../../providers/toast/toast";
import { FirstRunPage } from "../pages";
import { MyApp } from "../../app/app.component";

@IonicPage()
@Component({
  selector: 'page-stories',
  templateUrl: 'stories.html'
})
export class StoriesPage {

  currentStories: Observable<Story[]>;

  constructor(public navCtrl: NavController, private app: MyApp, public stories: Stories, public user: User, private toast: ToastProvider) { }

  /**
   * Auth guard
   */
  ionViewWillEnter() {
      let isAuthenticated = this.user.authenticated();
      if (!isAuthenticated) {
        this.toast.error("Please log in");
        this.navCtrl.setRoot(FirstRunPage);
      }
  }

  /**
   * Initiate
   */
  ionViewDidEnter() {
    this.stories.query();
    this.currentStories = this.stories.stories;
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
