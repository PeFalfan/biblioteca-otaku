import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { oidcConfig } from '../auth-config';
import { OidcSecurityService, provideAuth } from 'angular-auth-oidc-client';
import { firstValueFrom } from 'rxjs';

export function initAuth(oidcService: OidcSecurityService) {
  return () =>
    firstValueFrom(oidcService.checkAuth()).then(({ isAuthenticated }) => {
      console.log('isAuthenticated: ', isAuthenticated);
      if (!isAuthenticated) {
        console.log('Redirigiendo a login...');
        oidcService.authorize();
      }
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAuth({ config: oidcConfig }),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initAuth,
      deps: [OidcSecurityService],
    },
  ]
};
