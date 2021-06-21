// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  initializeApp: {
    apiKey: 'AIzaSyDADMX4uCVx2z_0rAgyYpjxbkUnfZYnyaA',
    authDomain: 'rest-countries-98d9c.firebaseapp.com',
    projectId: 'rest-countries-98d9c',
    storageBucket: 'rest-countries-98d9c.appspot.com',
    messagingSenderId: '1047031453639',
    appId: '1:1047031453639:web:8862f2c6b14f2b957cabe2',
  },
  apiCountriesList: 'https://restcountries.eu/rest/v2/',
  geoAPI:
    'https://geo.ipify.org/api/v1?apiKey=at_Y6YoKAMjsUQEY3KHyEH7vZ8oCVvAp',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
