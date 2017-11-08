import { Injectable } from '@angular/core';

import { Story } from '../../models/story';
import { Api } from '../api/api';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { User } from "../user/user";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class Stories {

  stories: BehaviorSubject<Story[]>;

  constructor(public api: Api, private user: User) {
    this.stories = new BehaviorSubject([]);
  }

  query() {
    let headers = new HttpHeaders();
    headers = this.user.createAuthorizationHeader(headers);

    this.api.get('stories', headers).subscribe(
      (rawStories: Story[]) => {
        this.stories.next(rawStories);
      }
    );
  }

  getStory(id: number) {
    return this.stories.getValue()[id];
  }
}
