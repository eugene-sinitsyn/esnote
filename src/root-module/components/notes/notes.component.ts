import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EsnNoteModel } from '../../../models/note.model';
import { EsnNotesService } from '../../../services/notes.service';

@Component({
  selector: 'esn-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnNotesComponent {
  public constructor(private readonly notesService: EsnNotesService) {}

  @Input() public listIndex: number;
  @Input() public notes: EsnNoteModel[];

  public openCreateDialog(): void {
    // TODO: implement
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