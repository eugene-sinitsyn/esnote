import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'esn-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnSideMenuComponent {}