import { Injectable } from '@angular/core';
import { EsnThemeEnum } from '../enums/theme.enum';

@Injectable({ providedIn: 'root' })
export class EsnThemeService {
  public constructor() {
    const rawTheme = localStorage.getItem(this.localStorageKey);
    this.theme = EsnThemeEnum[rawTheme] ?? this.detectTheme();
    this.applyTheme(this.theme);
  }

  private readonly localStorageKey: string = 'esnTheme';
  private theme: EsnThemeEnum;
  public get dark(): boolean { return this.theme === EsnThemeEnum.dark; }
  public get light(): boolean { return this.theme === EsnThemeEnum.light; }

  public toggle(): void {
    this.theme = this.theme === EsnThemeEnum.light ? EsnThemeEnum.dark : EsnThemeEnum.light;
    this.applyTheme(this.theme);
    localStorage.setItem(this.localStorageKey, this.theme);
  }

  private applyTheme(value: EsnThemeEnum): void {
    if (value === EsnThemeEnum.dark) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }

  private detectTheme(): EsnThemeEnum {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)')?.matches;
    return prefersLight ? EsnThemeEnum.light : EsnThemeEnum.dark;
  }
}