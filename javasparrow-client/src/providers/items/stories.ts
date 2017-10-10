import { Injectable } from '@angular/core';

import { Story } from '../../models/story';
import { Api } from '../api/api';

@Injectable()
export class Storys {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/stories', params);
  }

  add(story: Story) {
  }

  delete(story: Story) {
  }

}
