import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { ToastProvider } from "../../providers/toast/toast";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {email: string, password1: string, password2: string } = {
    email: '',
    password1: '',
    password2: ''
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toast: ToastProvider,
    public translateService: TranslateService) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
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

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {

      // this.navCtrl.push(MainPage);

      // Unable to sign up
      this.toast.error(this.signupErrorString);
    });
  }
}
