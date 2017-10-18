import { Injectable } from '@angular/core';

import { Scene } from '../../models/scene';
import { Api } from '../api/api';

@Injectable()
export class Scenes {

  constructor(public api: Api) { }

  query(params?: any) {
    return this.api.get('/scenes', params);
  }

  add(scene: Scene) {
  }

  delete(scene: Scene) {
  }

}
