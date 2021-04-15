// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endPoint: 'http://localhost:8081',
  allowedRoutes: [
    '/business/login',
    '/business/signup',
    '/business/verify-account',
  ],
  pageSize: 5,
  appURL: '',
};
