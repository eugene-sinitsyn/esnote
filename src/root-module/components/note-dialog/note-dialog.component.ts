import { ChangeDetectionStrategy, Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators as EditorValidators } from 'ngx-editor';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EsnConfirmDialogModel } from '../../../models/confirm-dialog.model';
import { EsnNoteModel } from '../../../models/note.model';
import { EsnConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'esn-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnNoteDialogComponent implements OnInit, OnDestroy {
  public constructor(
    private readonly dialogRef: MatDialogRef<EsnNoteDialogComponent, EsnNoteModel>,
    @Inject(MAT_DIALOG_DATA) public readonly note: EsnNoteModel,
    private readonly formBuilder: FormBuilder,
    private readonly dialogService: MatDialog
  ) {
    dialogRef.disableClose = true;
    this.editMode = !!note;
    this.formGroup = this.createFormGroup(note);
    const textControl = this.formGroup.get('text');
    this.noteLength$ = textControl.valueChanges.pipe(
      startWith(note?.text ?? ''),
      map(() => EditorValidators.maxLength(0)(textControl)?.maxlength?.actualLength ?? 0)
    );
  }

  private readonly subscription: Subscription = new Subscription();
  public readonly nameMaxLength: number = 100;
  public readonly textMaxLength: number = 10000;
  public readonly editMode: boolean;
  public readonly formGroup: FormGroup;
  public readonly noteLength$: Observable<number>;

  public ngOnInit(): void {
    this.subscription.add(this.dialogRef.backdropClick().subscribe(() => this.tryClose()));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('keyup.esc')
  public async tryClose(): Promise<void> {
    if (!this.formGroup.dirty) return this.dialogRef.close();
    const data = new EsnConfirmDialogModel({
      message: 'Discard unsaved changes?',
      confirmButtonText: 'Discard'
    });
    const confirmed = await this.dialogService
      .open(EsnConfirmDialogComponent, { data })
      .afterClosed()
      .toPromise();
    if (confirmed) this.dialogRef.close();
  }

  @HostListener('keyup.control.enter')
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