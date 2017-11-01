import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Scene } from '../../models/scene';
import { Scenes } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-scenes',
  templateUrl: 'scenes.html'
})
export class ScenesPage {
  currentScenes: Scene[];
  userIntel: Array<any>;
  totalIntel = 0;

  constructor(public navCtrl: NavController, public scenes: Scenes, public modalCtrl: ModalController) {
    //currentScenes is still a list of placeholders set up in scene.ts in the src/mocks/providers/ folder.
    this.currentScenes = this.scenes.query();
    this.userIntel = this.scenes.getUserIntel();
    this.totalIntel = this.scenes.getTotalIntel();
  }

  /**
   * The view loaded, let's query our scenes for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new scene. This shows our SceneCreatePage in a
   * modal and then adds the new scene to our data source if the user created one.
   */
  addScene() {
    let addModal = this.modalCtrl.create('SceneCreatePage');
    addModal.onDidDismiss(scene => {
      if (scene) {
        this.scenes.add(scene);
      }
    })
    addModal.present();
  }

  /**
   * Delete an scene from the list of scenes.
   */
  deleteScene(scene) {
    this.scenes.delete(scene);
  }

  /**
   * Navigate to the detail page for this scene.
   */
  openScene(scene: Scene) {
    this.navCtrl.push('ItemDetailPage', {
      scene: scene
    });
  }

  onClick(scene) {
    if(this.totalIntel >= scene.minIntel){
      this.openScene(scene);
    };
  }
}
