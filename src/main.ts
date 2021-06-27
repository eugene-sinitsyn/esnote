import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { EsnRootModule } from './root-module/root.module';
import { environment } from './environments/environment';

if (environment.production) enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(EsnRootModule)
  .catch(error => console.error(error));