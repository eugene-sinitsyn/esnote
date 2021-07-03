import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { EsnNotesService } from '../services/notes.service';

@Injectable({ providedIn: 'root' })
export class EsnNoListsGuard implements CanActivate {
  public constructor(
    private readonly notesService: EsnNotesService,
    router: Router
  ) {
    this.firstListUrlTree = router.createUrlTree(['/list', 0]);
  }

  private readonly firstListUrlTree: UrlTree;

  public canActivate(): boolean | UrlTree {
    return this.notesService.empty || this.firstListUrlTree;
  }
}