import { Routes } from '@angular/router';
import { EsnGettingStartedPageComponent } from '../root-module/pages/getting-started/getting-started-page.component';
import { EsnListPageComponent } from '../root-module/pages/list/list-page.component';
import { EsnNoListsGuard } from '../guards/no-lists.guard';

export const esnRoutes: Routes = [
  { path: '', component: EsnGettingStartedPageComponent, canActivate: [EsnNoListsGuard] },
  { path: 'list/:index', component: EsnListPageComponent }
];