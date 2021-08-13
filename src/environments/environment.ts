/* eslint-disable @typescript-eslint/naming-convention */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API: 'http://localhost:8000/api',
  API2: 'http://localhost:8000/api/v2',
  BASE_STORAGE_URL: 'http://localhost:8000/storage/',

  // API: 'https://apis.enginydigitaleco.com/systematic_review_api/public/api',
  // API2: 'https://apis.enginydigitaleco.com/systematic_review_api/public/api/v2',
  // BASE_STORAGE_URL: 'https://apis.enginydigitaleco.com/systematic_review_api/public/storage/',

  scihub: 'https://sci-hub.se/',
  JTSI: 'https://meet.jit.si',
  LOCALSTORAGE: 'SYSREVIEW.',
google_id: '126915381156-8oeahjgjg2h5tpd10io3blcit9m21h1g.apps.googleusercontent.com',
  facebook_id: '530953571263235',

firebaseConfig: {
    apiKey: 'AIzaSyCYj0n-RKGnGBrI1Lj_2DO46cMKMz7LtCM',
    authDomain: 'systematic-review-456d2.firebaseapp.com',
    projectId: 'systematic-review-456d2',
    storageBucket: 'systematic-review-456d2.appspot.com',
    messagingSenderId: '447649419389',
    appId: '1:447649419389:web:d19e30f463833fda66a114',
    measurementId: 'G-EXX5970YFX'
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
