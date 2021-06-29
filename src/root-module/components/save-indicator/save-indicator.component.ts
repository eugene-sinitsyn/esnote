import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { concatMap, delay, mapTo, startWith, tap } from 'rxjs/operators';
import { EsnNotesService } from '../../../services/notes.service';
@Component({
  selector: 'esn-save-indicator',
  templateUrl: './save-indicator.component.html',
  styleUrls: ['./save-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnSaveIndicatorComponent {
  public constructor(notesService: EsnNotesService) {
    this.disketVisible$ = notesService.save$.pipe(concatMap(() => {
      return timer(750).pipe(mapTo(false), startWith(true));
    }));
    this.checkmarkVisible$ = this.disketVisible$.pipe(delay(150));
  }

  public readonly disketVisible$: Observable<boolean>;
  public readonly checkmarkVisible$: Observable<boolean>;
}