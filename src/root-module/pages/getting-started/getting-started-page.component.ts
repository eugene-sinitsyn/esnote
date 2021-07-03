import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EsnInputDialogModel } from '../../../models/input-dialog.model';
import { EsnListModel } from '../../../models/list.model';
import { EsnNotesService } from '../../../services/notes.service';
import { EsnInputDialogComponent } from '../../components/input-dialog/input-dialog.component';

@Component({
  selector: 'esn-getting-started-page',
  templateUrl: './getting-started-page.component.html',
  styleUrls: ['./getting-started-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnGettingStartedPageComponent {
  public constructor(
    private readonly notesService: EsnNotesService,
    private readonly dialogService: MatDialog,
    private readonly router: Router
  ) {}

  public async openCreateListDialog(): Promise<void> {
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
    this.router.navigate(['/list', 0]);
  }
}