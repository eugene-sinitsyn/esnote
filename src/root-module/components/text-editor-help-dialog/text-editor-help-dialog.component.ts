import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'esn-text-editor-help-dialog',
  templateUrl: './text-editor-help-dialog.component.html',
  styleUrls: ['./text-editor-help-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnTextEditorHelpDialogComponent {
  public constructor(platform: Platform) {
    this.modifierKey =  platform.SAFARI || platform.IOS ? 'Mod' : 'Ctrl';
  }

  public readonly modifierKey: string;
}