import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Scene } from '../../models/scene';
import { Scenes } from '../../providers/providers';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@IonicPage()
@Component({
  selector: 'page-scenes',
  templateUrl: 'scenes.html'
})
export class ScenesPage {
  currentScenes: BehaviorSubject<Scene[]>;
  userIntel: Array<any>;
  minIntel: Array<any>;
  totalIntel = 0;

  constructor(public navCtrl: NavController, public scenes: Scenes, public modalCtrl: ModalController) {
    // currentScenes is still a list of placeholders set up in scene.ts in the src/mocks/providers/ folder.
    this.scenes.query();
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
   * The view loaded, let's query our scenes for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Navigate to the detail page for this scene.
   */
  openScene(scene: Scene) {
    this.navCtrl.push('SeqPage', {
        scene: scene
      })
    // this.navCtrl.push('ItemDetailPage', {
    //   scene: scene
    // });
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
