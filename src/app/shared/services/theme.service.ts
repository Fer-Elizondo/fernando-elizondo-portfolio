import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type PortfolioTheme = 'dark' | 'light';

export const PORTFOLIO_THEME_STORAGE_KEY = 'fernando-portfolio-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly theme = signal<PortfolioTheme>(this.readPreference());

  constructor() {
    this.applyTheme(this.theme());
  }

  toggleTheme(): void {
    this.setTheme(this.theme() === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: PortfolioTheme): void {
    this.theme.set(theme);
    this.applyTheme(theme);

    if (!this.isBrowser) return;

    try {
      this.document.defaultView?.localStorage.setItem(PORTFOLIO_THEME_STORAGE_KEY, theme);
    } catch {
      // The theme remains usable when browser storage is unavailable.
    }
  }

  private readPreference(): PortfolioTheme {
    if (!this.isBrowser) return 'dark';

    try {
      return this.document.defaultView?.localStorage.getItem(PORTFOLIO_THEME_STORAGE_KEY) === 'light'
        ? 'light'
        : 'dark';
    } catch {
      return 'dark';
    }
  }

  private applyTheme(theme: PortfolioTheme): void {
    if (!this.isBrowser) return;

    this.document.documentElement.setAttribute('data-theme', theme);
    this.document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'dark' ? '#05070b' : '#f3f5f8',
    );
  }
}
