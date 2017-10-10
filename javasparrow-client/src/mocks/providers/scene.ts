import { Injectable } from '@angular/core';

import { Scene } from '../../models/scene';

@Injectable()
export class Scenes {
  scenes: Scene[] = [];

  defaultScene: any = {
    "name": "Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor() {
    let scenes = [
      {
        "name": "Bear",
        "profilePic": "assets/img/speakers/bear.jpg",
        "about": "Burt is a Bear.",
        "unlocked": true
      },
      {
        "name": "Cheetah",
        "profilePic": "assets/img/speakers/cheetah.jpg",
        "about": "Charlie is a Cheetah.",
        "unlocked": true
      },
      {
        "name": "Duck",
        "profilePic": "assets/img/speakers/duck.jpg",
        "about": "Donald is a Duck.",
        "unlocked": false
      },
      {
        "name": "Eagle",
        "profilePic": "assets/img/speakers/eagle.jpg",
        "about": "Eva is an Eagle.",
        "unlocked": true
      },
      {
        "name": "Elephant",
        "profilePic": "assets/img/speakers/elephant.jpg",
        "about": "Ellie is an Elephant.",
        "unlocked": false
      },
      {
        "name": "Mouse",
        "profilePic": "assets/img/speakers/mouse.jpg",
        "about": "Molly is a Mouse.",
        "unlocked": true
      },
      {
        "name": "Puppy",
        "profilePic": "assets/img/speakers/puppy.jpg",
        "about": "Paul is a Puppy.",
        "unlocked": true
      }
    ];

    for (let scene of scenes) {
      this.scenes.push(new Scene(scene));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.scenes;
    }

    return this.scenes.filter((scene) => {
      for (let key in params) {
        let field = scene[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return scene;
        } else if (field == params[key]) {
          return scene;
        }
      }
      return null;
    });
  }

  add(scene: Scene) {
    this.scenes.push(scene);
  }

  delete(scene: Scene) {
    this.scenes.splice(this.scenes.indexOf(scene), 1);
  }
}
