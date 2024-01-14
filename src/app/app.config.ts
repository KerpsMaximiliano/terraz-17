import { provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./windows/windows.routes').then(m => m.routes),
  },
  {
    path: 'mobile',
    loadChildren: () => import('./mobile/mobile.routes').then(m => m.routes),
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withJsonpSupport()),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          apiKey: 'AIzaSyDztbDJpEj62tXlc31Ybwvgpb41uZ33ksA',
          authDomain: 'terraz-api.firebaseapp.com',
          projectId: 'terraz-api',
          storageBucket: 'terraz-api.appspot.com',
          messagingSenderId: '1044337011728',
          appId: '1:1044337011728:web:0fe6b19a018649d1386e95',
          measurementId: 'G-HGSDZXCTKG',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
