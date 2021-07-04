import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener } from '@angular/core';

@Component({
  selector: 'esn-install',
  templateUrl: './esn-install.component.html',
  styleUrls: ['./esn-install.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EsnOnstallComponent {
  public constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}

  public promptEvent: any = null;

  @HostListener('window:beforeinstallprompt', ['$event'])
  public beforeInstall(event: any): void {
    event.preventDefault();
    this.promptEvent = event;
    this.changeDetectorRef.markForCheck();
  }

  @HostListener('window:appinstalled')
  public installed(): void {
    this.promptEvent = null;
    this.changeDetectorRef.markForCheck();
  }

  public async install(): Promise<void> {
    this.promptEvent.prompt();
    await this.promptEvent.userChoice;
    this.promptEvent = null;
    this.changeDetectorRef.markForCheck();
  }
}