import { Injectable } from '@angular/core';

import { Scene } from '../../models/scene';

@Injectable()
export class Scenes {
  scenes: Scene[] = [];
  userIntel: Array<any>;
  totalIntel = 0;

  defaultScene: any = {
    "name": "Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
    "unlocked": true,
    "intel": 5
  };


  constructor() {
    let scenes = [
      {
        "name": "Bear",
        "profilePic": "assets/img/speakers/bear.jpg",
        "about": "Burt is a Bear.",
        "minIntel": 5
      },
      {
        "name": "Cheetah",
        "profilePic": "assets/img/speakers/cheetah.jpg",
        "about": "Charlie is a Cheetah.",
        "minIntel": 5
      },
      {
        "name": "Duck",
        "profilePic": "assets/img/speakers/duck.jpg",
        "about": "Donald is a Duck.",
        "minIntel": 10
      },
      {
        "name": "Eagle",
        "profilePic": "assets/img/speakers/eagle.jpg",
        "about": "Eva is an Eagle.",
        "minIntel": 5
      },
      {
        "name": "Elephant",
        "profilePic": "assets/img/speakers/elephant.jpg",
        "about": "Ellie is an Elephant.",
        "minIntel": 5
      },
      {
        "name": "Mouse",
        "profilePic": "assets/img/speakers/mouse.jpg",
        "about": "Molly is a Mouse.",
        "minIntel": 95
      },
      {
        "name": "Puppy",
        "profilePic": "assets/img/speakers/puppy.jpg",
        "about": "Paul is a Puppy.",
        "minIntel": 105
      }
    ];

    this.userIntel = [{"Bear": 10, "Cheetah": 5, "Duck": 5, "Eagle": 15, "Elephant": 55, "Mouse": 0, "Puppy": 0}];

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

  getUserIntel(){
    return this.userIntel;
  }

  getTotalIntel(){
    let scenes = this.userIntel[0];
    for(let key of Object.keys(scenes)){
      this.totalIntel = this.totalIntel + scenes[key];
    }
    return this.totalIntel;
  }

  add(scene: Scene) {
    this.scenes.push(scene);
  }

  delete(scene: Scene) {
    this.scenes.splice(this.scenes.indexOf(scene), 1);
  }
}
