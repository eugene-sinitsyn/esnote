import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EsnNoteModel } from '../../../models/note.model';
import { EsnNotesService } from '../../../services/notes.service';

@Component({
  selector: 'esn-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnListPageComponent implements OnInit, OnDestroy {
  public constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly notesService: EsnNotesService,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  private readonly subscription: Subscription = new Subscription();
  public listIndex: number;
  public notes: EsnNoteModel[];

  public ngOnInit(): void {
    this.subscription.add(combineLatest([
      this.notesService.lists$,
      this.activatedRoute.params.pipe(map(params => Number(params.index)))
    ]).subscribe(([lists, listIndex]) => {
      this.listIndex = listIndex;
      if (lists && Number.isInteger(listIndex) && listIndex >= lists.length)
        this.router.navigate(['/'], { replaceUrl: true });
      else {
        this.notes = (lists && lists[listIndex]?.notes) ?? [];
        this.changeDetectorRef.markForCheck();
      }
    }));
  }

  public ngOnDestroy(): void { this.subscription.unsubscribe(); }
}