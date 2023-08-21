export const environment = {
  production: false,
  appHost: 'http://localhost:4200',
  endPoint: 'https://service.phopis.com/sauki',
  tokenBaseEndpoint: 'https://service.phopis.com/sauki/oauth/token',
  storageURL:'https://sauki-storage.s3.amazonaws.com/pictures',
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
