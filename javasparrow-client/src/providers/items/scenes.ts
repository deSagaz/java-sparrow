import { Injectable } from '@angular/core';

import { Scene } from '../../models/scene';
import { Api } from '../api/api';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class Scenes {

  scenes: BehaviorSubject<Scene[]>;

  constructor(public api: Api) {
    this.scenes = new BehaviorSubject([]);
  }

  query(params?: any) {
    this.api.get('/scenes', params).subscribe(
      (rawScenes: Scene[]) => {
        this.scenes.next(rawScenes);
        console.log(this.scenes.getValue());
      }
    );
  }

}
