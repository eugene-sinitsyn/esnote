import { Directive, NgZone, OnInit } from '@angular/core';
import { MatSidenav, MatDrawerMode } from '@angular/material/sidenav';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';
import { filter, startWith, map } from 'rxjs/operators';

@Directive({ selector: 'mat-sidenav[esnResponsive]' })
export class ResponsiveSidenavDirective implements OnInit {
  public constructor(
    private readonly sidenav: MatSidenav,
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) {}

  private readonly subscription: Subscription = new Subscription();
  private readonly sideNavBreakpointPx: number = 1024;

  public ngOnInit(): void {
    this.subscription.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => this.sidenav.mode === 'over' && this.sidenav.close())
    );
    this.ngZone.runOutsideAngular(() => this.subscription.add(
      fromEvent(window, 'resize').pipe(
        startWith(null),
        map(() => window.innerWidth >= this.sideNavBreakpointPx ? 'side' : 'over'),
        filter(newMode => newMode !== this.sidenav.mode)
      ).subscribe((newMode: MatDrawerMode) => this.ngZone.run(() => {
        this.sidenav.mode = newMode;
        if (newMode === 'side') this.sidenav.open();
        else this.sidenav.close();
      }))
    ));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}