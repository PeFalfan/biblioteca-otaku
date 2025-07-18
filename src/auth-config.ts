// src/auth-config.ts
export const oidcConfig = {
  authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_afdY4gkfF',
  redirectUrl: 'http://localhost:4200',
  // redirectUrl: 'https://biblioteca-otaku-c6329.web.app',
  postLogoutRedirectUri: 'http://localhost:4200',
  // postLogoutRedirectUri: 'https://biblioteca-otaku-c6329.web.app',
  clientId: '7gk5b0vbt5no9ek8kho0n5gv0f',
  scope: 'openid email',
  responseType: 'code',
  silentRenew: true,
  useRefreshToken: true,
};
