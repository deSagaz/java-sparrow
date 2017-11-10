import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { ToastProvider } from "../../providers/toast/toast";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toast: ToastProvider,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  /**
   * Auth guard (reverse)
   */
  ionViewWillEnter() {
    let isAuthenticated = this.user.authenticated();
    if (isAuthenticated) {
      this.toast.info("Already logged in");
      this.navCtrl.setRoot(MainPage);
      return;
    }
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.setRoot(MainPage);
    }, (err) => {
      // Unable to log in
      this.toast.error(this.loginErrorString);
    });
  }
}
