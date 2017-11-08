import { Injectable } from '@angular/core';

import { Scene } from '../../models/scene';
import { Api } from '../api/api';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Story } from "../../models/story";

@Injectable()
export class Scenes {

  scenes: BehaviorSubject<Scene[]>;

  constructor(public api: Api) {
    this.scenes = new BehaviorSubject([]);
  }

  query(sceneId: number, params?) {
    this.api.get('stories/' + sceneId + '/', params).subscribe(
      (rawStory: Story) => {
        this.scenes.next(rawStory['scenes']);
      }
    );
  }

}
