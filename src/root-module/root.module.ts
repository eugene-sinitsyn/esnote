import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { esnMaterialModules } from '../config/material.config';
import { esnRoutes } from '../config/router.config';
import { esnComponents } from './components';
import { esnDirectives } from './directives';
import { esnPages } from './pages';
import { EsnRootComponent } from './root.component';

@NgModule({
  declarations: [
    EsnRootComponent,
    ...esnDirectives,
    ...esnComponents,
    ...esnPages
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(esnRoutes),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ...esnMaterialModules
  ],
  bootstrap: [EsnRootComponent]
})
export class EsnRootModule {}