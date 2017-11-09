import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';

import { Scene } from '../../models/scene';
import { Scenes } from '../../providers/providers';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { FirstRunPage, MainPage } from "../pages";
import { User } from "../../providers/user/user";
import { ToastProvider } from "../../providers/toast/toast";
import { Story } from "../../models/story";
import { Api } from "../../providers/api/api";
import { Stories } from "../../providers/items/stories";

@IonicPage()
@Component({
  selector: 'page-scenes',
  templateUrl: 'scenes.html',
  providers: [Scenes]
})
export class ScenesPage {
  currentScenes: BehaviorSubject<Scene[]>;
  story: BehaviorSubject<Story>;

  constructor(public navCtrl: NavController, public scenes: Scenes,
              private user: User, private toast: ToastProvider,
              public navParams: NavParams, private api: Api,
              public alertCtrl: AlertController,
              private stories: Stories) {
    this.story = new BehaviorSubject({});
  }

  /**
   * Subscribe to stories service and check if valid request
   * TODO: can be made more efficient by only querying single story
   */
  ionViewDidLoad() {
    // Check if story was passed. If not, return to main menu.
    let story = this.navParams.get("story");
    if (!story) {
      this.toast.error("No story passed. Returning to menu.");
      this.navCtrl.setRoot(MainPage);
      return;
    } else {
      this.story.next(this.navParams.get("story"));
      this.currentScenes = this.scenes.scenes;
    }

    // Subscribe to stories service
    this.stories.stories.subscribe(
      (stories: Story[]) => {
        let updatedStory = stories.filter((obj) => {
          return obj['id'] == this.story.getValue()['id'];
        });
        this.story.next(updatedStory[0]);
      }
    );
  }

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
   * Initiate view
   */
  ionViewDidEnter() {
    this.stories.query();
    this.scenes.query(this.story.getValue()['id']);
  }

  /**
   * Navigate to the detail page for this scene.
   */
  openScene(scene: Scene, params?) {
    // Now download full scene (including events) via API
    this.api.get('scenes/' + scene['id'], params).subscribe(
      (scene: Scene) => {
        this.navCtrl.push('SeqPage', {
          scene: scene,
          story: this.story.getValue()
        })
      }
    );
  }

  onClick(scene) {
    if (5 != 5) {
      // Check if downloaded already. If not, download now.
      this.download(scene);
    } else if (this.story.getValue()['scoreUser'] >= scene.scoreReq){
      // Check if unlocked
      this.openScene(scene);
    } else {
      // Give user modal with information on scene score req.
      let alert = this.alertCtrl.create({
        title: 'Uh oh!',
        subTitle: 'This scene is still locked. Play other levels to earn enough ' +
        'Intel' + '. You have ' + (scene.scoreReq - this.story.getValue()['scoreUser']) + " " + "Intel" + " to go!",
        buttons: ['OK']
      });
      alert.present();
    }
  }

  download(scene) {
    // TODO
  }
}
