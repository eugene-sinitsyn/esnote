import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'esn-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnListPageComponent {
  public constructor(private readonly activatedRoute: ActivatedRoute) {}

  public readonly listIndex$: Observable<number> =
    this.activatedRoute.params.pipe(map(params => Number(params.index)));
}