import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Scenes } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {
  item: any;

  constructor(public navCtrl: NavController, navParams: NavParams, items: Scenes) {
    this.item = navParams.get('scene') || items.defaultScene;
  }

}
