// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  endPoint: 'http://localhost:8081',
  storageURL:'https://lenos.s3.amazonaws.com/pictures/',
  tokenBaseEndpoint: "http://localhost:8081/oauth/token",
  googleClientId:"976377509430-tpou8clvmkhfr2fqsrrnof9qce51nonb.apps.googleusercontent.com",
  facebookAppId:"319321306084195",
  clientId: "web-client",
  clientSecret: "password",
  grantType: "password",
  allowedRoutes: [
    '/business/login',
    '/business/signup',
    '/business/verify-account'
  ],
  pageSize: 12,
  appURL: '',
};
