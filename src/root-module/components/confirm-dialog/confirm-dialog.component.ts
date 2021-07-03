import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EsnConfirmDialogModel } from '../../../models/confirm-dialog.model';

@Component({
  selector: 'esn-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnConfirmDialogComponent {
  public constructor(
    dialogRef: MatDialogRef<EsnConfirmDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public readonly data: EsnConfirmDialogModel
  ) { dialogRef.addPanelClass('esn-dialog'); }
}