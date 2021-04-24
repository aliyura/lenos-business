// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endPoint: 'https://lenosv2.azurewebsites.net',
  allowedRoutes: [
    '/business/login',
    '/business/signup',
    '/business/verify-account',
  ],
  pageSize: 12,
  appURL: '',
};
