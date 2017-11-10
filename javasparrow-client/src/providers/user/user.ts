import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';


@Injectable()
export class User {
  _user: any;
  _token: string;

  constructor(private api: Api) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('auth/login', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.token) {
        localStorage.setItem('token', JSON.stringify(res.token));
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
      let jsonError = JSON.parse(err.error);
      let errorKeys = Object.keys(jsonError);
      let i;
      for (i = 0; i < errorKeys.length; i++){
        try {
          document.getElementById(errorKeys[i]).innerHTML = jsonError[errorKeys[i]];
        }catch(err){}
      }
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('auth/registration', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log(res);
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
      let jsonError = JSON.parse(err.error);
      let errorKeys = Object.keys(jsonError);
      let i;
      for (i = 0; i < errorKeys.length; i++){
        try {
          document.getElementById(errorKeys[i]).innerHTML = jsonError[errorKeys[i]];
        }catch(err){}
      }
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
    this._token = resp.token;
  }

  // Returns whether the user is currently authenticated
  authenticated() : boolean {
    // Checks whether token exists
    // TODO: check whether token is still valid
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }

  retrieveToken() {
    this._token = JSON.parse(localStorage.getItem("token"));
  }

  createAuthorizationHeader(headers) {
    if (!this._token) {
      this.retrieveToken();
    }

    return headers.set('Authorization', 'JWT ' + this._token);
  }
}
