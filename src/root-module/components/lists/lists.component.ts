import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { EsnListModel } from '../../../models/list.model';
import { EsnNotesService } from '../../../services/notes.service';

@Component({
  selector: 'esn-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnListsComponent {
  public constructor(private readonly notesService: EsnNotesService) {}

  public readonly lists$: Observable<EsnListModel[]> = this.notesService.lists$;

  public openCreateDialog(): void {
    // TODO: implement
  }

  public openRenameDialog(listIndex: number): void {
    // TODO: implement
  }

  public openRemoveDialog(listIndex: number): void {
    // TODO: implement
  }

  public reorder(fromIndex: number, toIndex: number): void {
    this.notesService.reorderList(fromIndex, toIndex);
  }
}