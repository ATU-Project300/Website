// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUri: 'https://api-production-4035.up.railway.app',
  auth0: 
  {
    domain: 'dev-eg03mr1pcwa4oe3l.us.auth0.com',
    clientId: 'STywSI7MBeZUadSPqLUmCnT1VCig4yNz',
    callback_URL: 'https://website-production-ef30.up.railway.app',

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
