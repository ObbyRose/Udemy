import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      })
    ), provideFirebaseApp(() => initializeApp({"projectId":"ng-deployment-example-52cd2","appId":"1:862933007035:web:7d7f9b831ad77f102b079e","storageBucket":"ng-deployment-example-52cd2.firebasestorage.app","apiKey":"AIzaSyDq6Pqp8Xb_a8y1c8XymNMb-CN2N-UkT-U","authDomain":"ng-deployment-example-52cd2.firebaseapp.com","messagingSenderId":"862933007035"})), provideAuth(() => getAuth()),
  ],
};
