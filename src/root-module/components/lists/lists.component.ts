import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EsnListModel } from '../../../models/list.model';
import { EsnNotesService } from '../../../services/notes.service';
import { EsnConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'esn-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnListsComponent {
  public constructor(
    private readonly notesService: EsnNotesService,
    private readonly dialogService: MatDialog
  ) {}

  public readonly lists$: Observable<EsnListModel[]> = this.notesService.lists$;

  public openCreateDialog(): void {
    // TODO: implement
  }

  public openRenameDialog(listIndex: number): void {
    // TODO: implement
  }

  public async openRemoveDialog(listIndex: number, listName: string): Promise<void> {
    const confirmed = await this.dialogService.open(
      EsnConfirmationDialogComponent,
      { data: `Delete "${listName}"?` }
    ).afterClosed().toPromise();
    if (confirmed) this.notesService.removeList(listIndex);
  }

  public reorder(fromIndex: number, toIndex: number): void {
    this.notesService.reorderList(fromIndex, toIndex);
  }
}