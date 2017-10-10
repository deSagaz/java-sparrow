import { Injectable } from '@angular/core';

import { Story } from '../../models/story';

@Injectable()
export class Stories {
  stories: Story[] = [];

  defaultStory: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor() {
    let stories = [
      {
        "name": "Burt Bear",
        "profilePic": "assets/img/speakers/bear.jpg",
        "about": "Burt is a Bear.",
        "unlocked": true
      },
      {
        "name": "Charlie Cheetah",
        "profilePic": "assets/img/speakers/cheetah.jpg",
        "about": "Charlie is a Cheetah.",
        "unlocked": true
      },
      {
        "name": "Donald Duck",
        "profilePic": "assets/img/speakers/duck.jpg",
        "about": "Donald is a Duck.",
        "unlocked": false
      },
      {
        "name": "Eva Eagle",
        "profilePic": "assets/img/speakers/eagle.jpg",
        "about": "Eva is an Eagle.",
        "unlocked": true
      }
    ];

    for (let story of stories) {
      this.stories.push(new Story(story));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.stories;
    }

    return this.stories.filter((story) => {
      for (let key in params) {
        let field = story[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return story;
        } else if (field == params[key]) {
          return story;
        }
      }
      return null;
    });
  }

  add(story: Story) {
    this.stories.push(story);
  }

  delete(story: Story) {
    this.stories.splice(this.stories.indexOf(story), 1);
  }
}
