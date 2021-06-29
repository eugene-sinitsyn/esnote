import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EsnSelectDialogModel } from '../../../models/select-dialog.model';

@Component({
  selector: 'esn-select-dialog',
  templateUrl: './select-dialog.component.html',
  styleUrls: ['./select-dialog.component.scss']
})
export class EsnSelectDialogComponent {
  public constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: EsnSelectDialogModel
  ) {}
}