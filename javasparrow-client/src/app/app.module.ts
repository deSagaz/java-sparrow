import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { GoogleMaps } from '@ionic-native/google-maps';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Stories } from '../providers/providers';
import { Scenes } from '../providers/providers';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';
import { ComponentsModule } from "../components/components.module";
import { ToastProvider } from '../providers/toast/toast';
import { AceEditorModule } from "ng2-ace-editor";
import { WebWorkerService } from 'angular2-web-worker';

// import { Settings } from '../providers/providers';


// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// export function provideSettings(storage: Storage) {
//   /**
//    * The Settings provider takes a set of default settings for your app.
//    *
//    * You can add new settings options at any time. Once the settings are saved,
//    * these values will not overwrite the saved values (this can be done manually if desired).
//    */
//   return new Settings(storage, {
//     option1: true,
//     option2: 'Ionitron J. Framework',
//     option3: '3',
//     option4: 'Hello'
//   });
// }

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule,
    AceEditorModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    Api,
    Stories,
    Scenes,
    User,
    Camera,
    GoogleMaps,
    SplashScreen,
    StatusBar,
    // { provide: Settings, useFactory: provideSettings, deps: [Storage] },

    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ToastProvider,
    WebWorkerService
  ]
})
export class AppModule { }
