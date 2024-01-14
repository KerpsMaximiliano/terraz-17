import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./mobile.component').then(m => m.MobileComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
      },
      //   {
      //     path: 'proyectos',
      //     loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent),
      //   },
      //   {
      //     path: 'proyecto/:id',
      //     loadComponent: () => import('./pages/project/project.component').then(m => m.ProjectComponent),
      //   },
    ],
  },
];
