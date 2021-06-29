import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EsnConfirmationDialogModel } from '../../../models/confirmation-dialog.model';
import { EsnNoteModel } from '../../../models/note.model';
import { EsnSelectDialogModel } from '../../../models/select-dialog.model';
import { EsnNotesService } from '../../../services/notes.service';
import { EsnConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EsnNoteDialogComponent } from '../note-dialog/note-dialog.component';
import { EsnSelectDialogComponent } from '../select-dialog/select-dialog.component';

@Component({
  selector: 'esn-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnNotesComponent {
  public constructor(
    private readonly notesService: EsnNotesService,
    private readonly dialogService: MatDialog
  ) {}

  @Input() public listIndex: number;
  @Input() public notes: EsnNoteModel[];

  public async openCreateDialog(): Promise<void> {
    const note = await this.dialogService
      .open(EsnNoteDialogComponent, { data: null })
      .afterClosed()
      .toPromise();
    if (!note) return;
    this.notesService.createNote(this.listIndex, note);
  }

  public async openEditDialog(noteIndex: number): Promise<void> {
    const data = this.notes[noteIndex];
    const updatedNote = await this.dialogService
      .open(EsnNoteDialogComponent, { data })
      .afterClosed()
      .toPromise();
    if (!updatedNote) return;
    this.notesService.updateNote(this.listIndex, noteIndex, updatedNote);
  }

  public async openMoveDialog(noteIndex: number): Promise<void> {
    const otherLists = this.notesService.lists.filter((l, i) => i !== this.listIndex);
    const data = new EsnSelectDialogModel({
      title: 'Select a list',
      options: otherLists
    });
    const list = await this.dialogService
      .open(EsnSelectDialogComponent, { data })
      .afterClosed()
      .toPromise();
    if (!list) return;
    const listIndexTo = this.notesService.lists.indexOf(list);
    this.notesService.moveNote(this.listIndex, noteIndex, listIndexTo);
  }

  public async openRemoveDialog(noteIndex: number): Promise<void> {
    const data = new EsnConfirmationDialogModel({
      message: `Delete "${this.notes[noteIndex]}"?`,
      confirmButtonText: 'Delete'
    });
    const confirmed = await this.dialogService
      .open(EsnConfirmDialogComponent, { data })
      .afterClosed()
      .toPromise();
    if (confirmed) this.notesService.removeNote(this.listIndex, noteIndex);
  }

  public reorder(fromIndex: number, toIndex: number): void {
    this.notesService.reorderNote(this.listIndex, fromIndex, toIndex);
  }
}