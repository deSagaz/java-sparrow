import { Injectable } from '@angular/core';
import { Scene } from '../../models/scene';
import { Api } from '../api/api';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Story } from "../../models/story";
import { User } from "../user/user";
import { HttpHeaders } from "@angular/common/http";


@Injectable()
export class Scenes {

  scenes: BehaviorSubject<Scene[]>;

  constructor(public api: Api, private user: User) {
    this.scenes = new BehaviorSubject([]);
  }

  query(sceneId: number) {
    let headers = new HttpHeaders();
    headers = this.user.createAuthorizationHeader(headers);

    this.api.get('stories' + '/' + sceneId, headers).subscribe(
      (rawStory: Story) => {
        this.scenes.next(rawStory['scenes']);
      }
    );
  }

}
