import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  private readonly listIndexSubject: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  public readonly notes$: Observable<EsnNoteModel[]> = combineLatest([
    this.notesService.lists$,
    this.listIndexSubject
  ]).pipe(map(([lists, listIndex]) => {
    if (!lists || !lists[listIndex]) return [];
    else return lists[listIndex].notes ?? [];
  }));
  private listIndexValue: number;

  @Input() public set listIndex(value: number) {
    this.listIndexValue = value;
    this.listIndexSubject.next(value);
  }

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
    this.notesService.reorderNote(this.listIndexValue, fromIndex, toIndex);
  }
}