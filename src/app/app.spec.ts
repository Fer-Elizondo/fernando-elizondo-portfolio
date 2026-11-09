import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { vi } from 'vitest';
import { App } from './app';
import { routes } from './app.routes';
import { HomePage } from './features/home/home-page';
import { HOME_CONTENT } from './features/home/home.data';
import { PORTFOLIO_THEME_STORAGE_KEY } from './shared/services/theme.service';

describe('home routes', () => {
  it('uses the portfolio home page for the root URL', () => {
    expect(routes.find((route) => route.path === '')).toMatchObject({ path: '', component: HomePage });
  });

  it('configures case studies by slug and redirects unmatched paths to Home', () => {
    expect(routes.find((route) => route.path === 'case-studies/:slug')?.loadComponent).toBeTypeOf('function');
    expect(routes.at(-1)).toMatchObject({ path: '**', redirectTo: '' });
  });

  it('navigates to the Cloud Backend Lab detail route', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create();

    await harness.navigateByUrl('/case-studies/cloud-backend-lab');

    const detail = harness.routeNativeElement as HTMLElement;
    expect(detail.querySelector('h1')?.textContent?.trim()).toBe('Cloud Backend Lab');
    expect(detail.textContent).toContain('Verificado en CI');
    expect(detail.textContent).toContain('Desplegado anteriormente');
    expect(detail.textContent).toContain('En desarrollo');
    expect(detail.textContent).toContain('Planeado');
    expect(detail.textContent).toContain('no significa que la versión actual del backend esté desplegada en GCP');
  });

  it('retains the selected theme while navigating between Home and Cloud Backend Lab', async () => {
    const matchMediaDescriptor = Object.getOwnPropertyDescriptor(window, 'matchMedia');
    localStorage.removeItem(PORTFOLIO_THEME_STORAGE_KEY);
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => ({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }) as unknown as MediaQueryList),
    });

    try {
      TestBed.configureTestingModule({ imports: [App], providers: [provideRouter(routes)] });
      const fixture = TestBed.createComponent(App);
      fixture.detectChanges();
      const router = TestBed.inject(Router);
      const toggle = fixture.nativeElement.querySelector('.theme-toggle') as HTMLButtonElement;

      toggle.click();
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
      expect(localStorage.getItem(PORTFOLIO_THEME_STORAGE_KEY)).toBe('light');

      await router.navigateByUrl('/case-studies/cloud-backend-lab');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('h1')?.textContent?.trim()).toBe('Cloud Backend Lab');
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
      expect(fixture.nativeElement.querySelector('.theme-toggle')?.getAttribute('aria-label'))
        .toBe('Cambiar a tema oscuro');

      fixture.destroy();
    } finally {
      localStorage.removeItem(PORTFOLIO_THEME_STORAGE_KEY);
      document.documentElement.removeAttribute('data-theme');
      if (matchMediaDescriptor) {
        Object.defineProperty(window, 'matchMedia', matchMediaDescriptor);
      } else {
        Reflect.deleteProperty(window, 'matchMedia');
      }
    }
  });

  it('redirects an unknown URL to the portfolio Home page', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const matchMediaDescriptor = Object.getOwnPropertyDescriptor(window, 'matchMedia');
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: () => ({ matches: true }) as MediaQueryList,
    });

    try {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl('/this-route-does-not-exist');

      const expectedHeading = `${HOME_CONTENT.hero.title.lead} ${HOME_CONTENT.hero.title.emphasis}`;
      expect(harness.routeNativeElement?.querySelector('h1')?.textContent?.trim()).toBe(expectedHeading);
    } finally {
      if (matchMediaDescriptor) {
        Object.defineProperty(window, 'matchMedia', matchMediaDescriptor);
      } else {
        Reflect.deleteProperty(window, 'matchMedia');
      }
    }
  });
});
