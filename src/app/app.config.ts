import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { MaterialModule } from './material.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), // Setup Routing
    provideHttpClient(), // Provides HTTP Client
    provideAnimations(), // Enables Angular Animations
    importProvidersFrom(MaterialModule) // Import Angular Material
  ]
};
