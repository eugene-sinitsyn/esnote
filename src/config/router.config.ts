import { Routes } from '@angular/router';
import { EsnListPageComponent } from '../root-module/pages/list/list-page.component';

export const esnRoutes: Routes = [
  { path: 'list/:index', component: EsnListPageComponent }
];