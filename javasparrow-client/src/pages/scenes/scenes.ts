import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

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
  userIntel: Array<any>;
  minIntel: Array<any>;
  totalIntel = 0;
  story = Story;

  constructor(public navCtrl: NavController, public scenes: Scenes,
              private user: User, private toast: ToastProvider,
              public navParams: NavParams, private api: Api) { }

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
    this.userIntel = [{"1": 10, "4": 15, "3": 0, "2": 0}];
    this.minIntel = [{"1": 0, "4": 5, "3": 20, "2": 15}];
    this.totalIntel = this.getTotalIntel();
  }

  // TODO: TEMPORARY
  getTotalIntel(){
    let scenes = this.userIntel[0];
    for(let key of Object.keys(scenes)){
      this.totalIntel = this.totalIntel + scenes[key];
    }
    return this.totalIntel;
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
    // Check if downloaded already. If not, download now.
    if (5 != 5) {
      this.download(scene);
    } else if (5 == 5 || this.totalIntel >= scene.minIntel){
      this.openScene(scene);
    }
  }

  download(scene) {
    // TODO
  }
}
