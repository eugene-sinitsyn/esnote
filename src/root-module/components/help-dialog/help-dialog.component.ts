import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'esn-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnHelpDialogComponent {
  public constructor(
    dialogRef: MatDialogRef<EsnHelpDialogComponent, void>,
    platform: Platform
  ) {
    dialogRef.addPanelClass('esn-dialog');
    this.modifierKey =  platform.SAFARI || platform.IOS ? 'Mod' : 'Ctrl';
  }

  public readonly modifierKey: string;
}