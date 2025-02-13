import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { LOCAL_STORAGE } from './tokens/storageToken';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: LOCAL_STORAGE,
      useFactory: () => ({
        getItem: () => {},
        setItem: () => {},
        removeItem: () => {},
      }),
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
