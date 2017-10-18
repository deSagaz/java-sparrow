import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Scene } from '../../models/scene';
import { Scenes } from '../../providers/providers';

//TODO: duplicate search for stories

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Scenes) { }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Scene) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

}
