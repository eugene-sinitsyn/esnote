import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators as EditorValidators } from 'ngx-editor';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
    private readonly formBuilder: FormBuilder
  ) {
    this.editMode = !!note;
    this.formGroup = this.createFormGroup(note);
    const textControl = this.formGroup.get('text');
    this.noteLength$ = textControl.valueChanges.pipe(
      startWith(note?.text ?? ''),
      map(() => EditorValidators.maxLength(0)(textControl)?.maxlength?.actualLength ?? 0)
    );
  }

  public readonly nameMaxLength: number = 100;
  public readonly textMaxLength: number = 10000;
  public readonly editMode: boolean;
  public readonly formGroup: FormGroup;
  public readonly noteLength$: Observable<number>;

  public trySubmit(): void {
    if (!this.formGroup.valid) return;
    const note = new EsnNoteModel(this.formGroup.value);
    this.dialogRef.close(note);
  }

  private createFormGroup(note: EsnNoteModel): FormGroup {
    return this.formBuilder.group({
      name: [note?.name, [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      text: [note?.text, [EditorValidators.maxLength(this.textMaxLength)]]
    });
  }
}