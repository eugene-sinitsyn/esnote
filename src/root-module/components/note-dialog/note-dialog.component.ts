import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EsnNoteModel } from '../../../models/note.model';

@Component({
  selector: 'esn-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnNoteDialogComponent {
  public constructor(
    private readonly dialogRef: MatDialogRef<EsnNoteDialogComponent, EsnNoteModel>,
    @Inject(MAT_DIALOG_DATA) public readonly note: EsnNoteModel,
    formBuilder: FormBuilder
  ) {
    this.editMode = !!note;
    this.formGroup = formBuilder.group({
      name: [note?.name, [Validators.required, Validators.maxLength(64)]],
      text: [note?.text]
    });
  }

  public readonly editMode: boolean;
  public readonly formGroup: FormGroup;

  public trySubmit(): void {
    if (!this.formGroup.valid) return;
    const note = new EsnNoteModel(this.formGroup.value);
    this.dialogRef.close(note);
  }
}