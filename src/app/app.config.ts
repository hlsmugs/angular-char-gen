import {
  ApplicationConfig,
  PLATFORM_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserStorageService } from './services/browser-storage.service';
import { LOCAL_STORAGE } from './tokens/storageToken';
import { isPlatformServer } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    provideClientHydration(),
    BrowserStorageService,
    {
      provide: LOCAL_STORAGE,
      useFactory: (platformId: object) => {
        if (isPlatformServer(platformId)) {
          return {};
        }
        return localStorage;
      },
      deps: [PLATFORM_ID],
    },
  ],
};
