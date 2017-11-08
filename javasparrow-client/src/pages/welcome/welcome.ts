import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { User } from "../../providers/user/user";
import { MainPage } from "../pages";
import { ToastProvider } from "../../providers/toast/toast";

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, private user: User,
              private toast: ToastProvider) { }

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

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
