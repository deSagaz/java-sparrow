import { Injectable } from '@angular/core';
import { ToastController } from "ionic-angular";

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {

  constructor(private toastCtrl: ToastController) {}

  /**
   * Display error
   */
  error(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      cssClass: "toast-danger"
    });
    toast.present();
  }

  /**
   * Display info
   */
  info(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      cssClass: "toast-info"
    });
    toast.present();
  }

}
