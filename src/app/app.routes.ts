import { Routes } from '@angular/router';
import { HomePage } from './features/home/home-page';

export const routes: Routes = [{ path: '', component: HomePage, title: 'Fernando Elizondo | Desarrollador Full Stack' }, { path: '**', redirectTo: '' }];
