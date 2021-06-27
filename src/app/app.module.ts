import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RootComponent } from './root.component';
import { routes } from './config/router.config';

@NgModule({
  declarations: [RootComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}