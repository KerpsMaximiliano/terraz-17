import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withJsonpSupport } from '@angular/common/http';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./windows/windows.routes').then(m => m.routes),
  },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideHttpClient(withJsonpSupport())],
};
