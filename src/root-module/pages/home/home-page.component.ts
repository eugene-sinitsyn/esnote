import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EsnInputDialogModel } from '../../../models/input-dialog.model';
import { EsnListModel } from '../../../models/list.model';
import { EsnNotesService } from '../../../services/notes.service';
import { EsnInputDialogComponent } from '../../components/input-dialog/input-dialog.component';

@Component({
  selector: 'esn-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnHomePageComponent {
  public constructor(
    private readonly notesService: EsnNotesService,
    private readonly dialogService: MatDialog,
    private readonly router: Router
  ) {}

  public readonly empty$: Observable<boolean> = this.notesService.empty$;

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