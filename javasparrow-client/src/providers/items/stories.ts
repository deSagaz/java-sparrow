import { Injectable } from '@angular/core';

import { Story } from '../../models/story';
import { Api } from '../api/api';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class Stories {

  stories: BehaviorSubject<Story[]>;

  constructor(public api: Api) {
    this.stories = new BehaviorSubject([]);
  }

  query(params?: any) {
    this.api.get('stories', params).subscribe(
      (rawStories: Story[]) => {
        this.stories.next(rawStories);
      }
    );
  }

  getStory(id: number) {
    return this.stories.getValue()[id];
  }
}
