import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EsnNoteModel } from '../../../models/note.model';
import { EsnNotesService } from '../../../services/notes.service';
import { EsnNoteDialogComponent } from '../note-dialog/note-dialog.component';

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

  public openEditDialog(listIndex: number): void {
    // TODO: implement
  }

  public openRemoveDialog(listIndex: number): void {
    // TODO: implement
  }

  public reorder(fromIndex: number, toIndex: number): void {
    this.notesService.reorderNote(this.listIndex, fromIndex, toIndex);
  }
}