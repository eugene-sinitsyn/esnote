import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'esn-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent {}