import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'esn-root',
  template: '<h1>ESNOTE</h1><router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent {}