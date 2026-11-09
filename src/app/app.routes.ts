import { Routes } from '@angular/router';
import { HomePage } from './features/home/home-page';

export const routes: Routes = [
  {
    path: 'case-studies/:slug',
    loadComponent: () => import('./features/case-studies/detail/case-study-detail').then(m => m.CaseStudyDetailComponent)
  },
  { path: '', component: HomePage, title: 'Fernando Elizondo | Desarrollador Full Stack' },
  { path: '**', redirectTo: '' }
];