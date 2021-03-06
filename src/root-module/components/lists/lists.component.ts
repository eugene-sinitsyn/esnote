import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EsnConfirmDialogModel } from '../../../models/confirm-dialog.model';
import { EsnInputDialogModel } from '../../../models/input-dialog.model';
import { EsnListModel } from '../../../models/list.model';
import { EsnNotesService } from '../../../services/notes.service';
import { EsnConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
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
  public readonly empty$: Observable<boolean> = this.notesService.empty$;

  public async openCreateDialog(): Promise<void> {
    const data = new EsnInputDialogModel({
      name: 'List name',
      value: '',
      maxLength: 32,
      submitButtonText: 'Create'
    });
    const name = await this.dialogService
      .open(EsnInputDialogComponent, { data })
      .afterClosed()
      .toPromise();
    if (!name) return;
    const list = new EsnListModel({ name, notes: [] });
    this.notesService.createList(list);
    this.router.navigate(['/list', 0], { replaceUrl: true });
  }

  public async openRenameDialog(listIndex: number, value: string): Promise<void> {
    const data = new EsnInputDialogModel({
      name: 'List name',
      value,
      maxLength: 32,
      submitButtonText: 'Rename'
    });
    const name = await this.dialogService
      .open(EsnInputDialogComponent, { data })
      .afterClosed()
      .toPromise();
    if (!name) return;
    this.notesService.renameList(listIndex, name);
  }

  public async openRemoveDialog(listIndex: number, listName: string): Promise<void> {
    const data = new EsnConfirmDialogModel({
      message: `Delete "${listName}"?`,
      confirmButtonText: 'Delete'
    });
    const confirmed = await this.dialogService
      .open(EsnConfirmDialogComponent, { data })
      .afterClosed()
      .toPromise();
    if (confirmed) this.notesService.removeList(listIndex);
  }

  public reorder(fromIndex: number, toIndex: number): void {
    this.notesService.reorderList(fromIndex, toIndex);
  }
}