import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxEditorModule } from 'ngx-editor';
import { esnMaterialModules } from '../config/material.config';
import { esnRoutes } from '../config/router.config';
import { environment } from '../environments/environment';
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
    ...esnMaterialModules,
    NgxEditorModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  bootstrap: [EsnRootComponent]
})
export class EsnRootModule {}