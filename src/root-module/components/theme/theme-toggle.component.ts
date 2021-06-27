import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EsnThemeService } from '../../../services/theme.service';

@Component({
  selector: 'esn-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnThemeComponentToggle {
  public constructor(public readonly themeService: EsnThemeService) {}
}