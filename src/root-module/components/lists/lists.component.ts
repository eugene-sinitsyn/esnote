import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EsnConfirmationDialogModel } from '../../../models/confirmation-dialog.model';
import { EsnInputDialogModel } from '../../../models/input-dialog.model';
import { EsnListModel } from '../../../models/list.model';
import { EsnNotesService } from '../../../services/notes.service';
import { EsnConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EsnInputDialogComponent } from '../input-dialog/input-dialog.component';

@Component({
  selector: 'esn-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnListsComponent {
  public constructor(
    private readonly notesService: EsnNotesService,
    private readonly dialogService: MatDialog,
    private readonly router: Router
  ) {}

  public readonly lists$: Observable<EsnListModel[]> = this.notesService.lists$;

  public async openCreateDialog(): Promise<void> {
    const data = new EsnInputDialogModel({ name: 'List name', value: '', maxLength: 32 });
    const name = await this.dialogService
      .open(EsnInputDialogComponent, { data })
      .afterClosed()
      .toPromise();
    if (!name) return;
    const list = new EsnListModel({ name, notes: [] });
    this.notesService.createList(list);
    this.router.navigate(['/list', 0]);
  }

  public openRenameDialog(listIndex: number): void {
    // TODO: implement
  }

  public async openRemoveDialog(listIndex: number, listName: string): Promise<void> {
    const data = new EsnConfirmationDialogModel({
      message: `Delete "${listName}"?`,
      confirmButtonText: 'Delete'
    });
    const confirmed = await this.dialogService
      .open(EsnConfirmationDialogComponent, { data })
      .afterClosed()
      .toPromise();
    if (confirmed) this.notesService.removeList(listIndex);
  }

  public reorder(fromIndex: number, toIndex: number): void {
    this.notesService.reorderList(fromIndex, toIndex);
  }
}