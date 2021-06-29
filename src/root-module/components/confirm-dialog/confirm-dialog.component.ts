import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EsnConfirmationDialogModel } from '../../../models/confirmation-dialog.model';

@Component({
  selector: 'esn-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnConfirmDialogComponent {
  public constructor(@Inject(MAT_DIALOG_DATA) public readonly data: EsnConfirmationDialogModel) {}
}