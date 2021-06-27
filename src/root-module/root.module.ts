import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { materialModules } from '../config/material.config';
import { routes } from '../config/router.config';
import { esnDirectives } from './directives';
import { RootComponent } from './root.component';

@NgModule({
  declarations: [
    RootComponent,
    ...esnDirectives
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ...materialModules
  ],
  bootstrap: [RootComponent]
})
export class RootModule {}