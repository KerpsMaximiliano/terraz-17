import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./windows.component').then(m => m.WindowsComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'proyectos',
        loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent),
      },
    ],
  },
];
