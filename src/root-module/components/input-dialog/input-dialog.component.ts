import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EsnInputDialogModel } from '../../../models/input-dialog.model';

@Component({
  selector: 'esn-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnInputDialogComponent {
  public constructor(
    private readonly dialogRef: MatDialogRef<EsnInputDialogComponent, string>,
    @Inject(MAT_DIALOG_DATA) public readonly data: EsnInputDialogModel
  ) {
    dialogRef.addPanelClass(['esn-dialog', 'wide']);
    const validators = [Validators.required];
    if (data?.maxLength) validators.push(Validators.maxLength(data.maxLength));
    this.control = new FormControl(data?.value || '', validators);
  }

  public readonly control: FormControl;

  public trySubmit(): void {
    if (this.control.valid) this.dialogRef.close(this.control.value);
  }
}