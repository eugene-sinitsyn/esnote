import { Routes } from '@angular/router';
import { EsnHomePageComponent } from '../root-module/pages/home/home-page.component';
import { EsnListPageComponent } from '../root-module/pages/list/list-page.component';

export const esnRoutes: Routes = [
  { path: '', component: EsnHomePageComponent },
  { path: 'list/:index', component: EsnListPageComponent }
];