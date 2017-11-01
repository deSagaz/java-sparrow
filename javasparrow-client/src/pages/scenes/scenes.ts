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
  totalIntel = 0;

  constructor(public navCtrl: NavController, public scenes: Scenes, public modalCtrl: ModalController) {
    // currentScenes is still a list of placeholders set up in scene.ts in the src/mocks/providers/ folder.
    this.scenes.query();
    this.currentScenes = this.scenes.scenes;
    // this.userIntel = this.scenes.getUserIntel();
    // this.totalIntel = this.scenes.getTotalIntel();
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
    this.navCtrl.push('SeqPage')
    // this.navCtrl.push('ItemDetailPage', {
    //   scene: scene
    // });
  }

  onClick(scene) {
    if(this.totalIntel >= scene.minIntel){
      this.openScene(scene);
    }
  }
}
