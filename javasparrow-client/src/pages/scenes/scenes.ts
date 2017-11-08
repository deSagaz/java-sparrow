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

@IonicPage()
@Component({
  selector: 'page-scenes',
  templateUrl: 'scenes.html',
  providers: [Scenes]
})
export class ScenesPage {
  currentScenes: BehaviorSubject<Scene[]>;
  totalIntel = 0;
  story = Story;

  constructor(public navCtrl: NavController, public scenes: Scenes,
              private user: User, private toast: ToastProvider,
              public navParams: NavParams, private api: Api,
              public alertCtrl: AlertController) { }

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
   * Initate view
   */
  ionViewDidEnter() {
    this.story = this.navParams.get("story");

    // Check if story was passed
    if (!this.story) {
      this.navCtrl.setRoot(MainPage);
      return;
    }
    this.scenes.query(this.story['id']);

    this.currentScenes = this.scenes.scenes;

    // TODO: TEMPORARY
    this.totalIntel = 5;
  }

  /**
   * Navigate to the detail page for this scene.
   */
  openScene(scene: Scene, params?) {
    // Now download full scene (including events) via API
    this.api.get('scenes/' + scene['id'] + '/', params).subscribe(
      (scene: Scene) => {
        this.navCtrl.push('SeqPage', {
          scene: scene
        })
      }
    );
  }

  onClick(scene) {
    if (5 != 5) {
      // Check if downloaded already. If not, download now.
      this.download(scene);
    } else if (this.totalIntel >= scene.scoreReq){
      // Check if unlocked
      this.openScene(scene);
    } else {
      // Give user modal with information on scene score req.
      let alert = this.alertCtrl.create({
        title: 'Uh oh!',
        subTitle: 'This scene is still locked. Play other levels to earn enough ' +
        'Intel' + '. You will need ' + scene.scoreReq + ' points (' +
        (scene.scoreReq - this.totalIntel) + " to go).",
        buttons: ['OK']
      });
      alert.present();
    }


  }

  download(scene) {
    // TODO
  }
}
