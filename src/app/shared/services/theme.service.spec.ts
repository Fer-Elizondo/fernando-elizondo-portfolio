import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { PORTFOLIO_THEME_STORAGE_KEY, ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.removeItem(PORTFOLIO_THEME_STORAGE_KEY);
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    localStorage.removeItem(PORTFOLIO_THEME_STORAGE_KEY);
    document.documentElement.removeAttribute('data-theme');
    TestBed.resetTestingModule();
  });

  it('uses dark mode on a first visit without creating a stored preference', () => {
    const service = TestBed.inject(ThemeService);

    expect(service.theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem(PORTFOLIO_THEME_STORAGE_KEY)).toBeNull();
  });

  it('restores a saved theme without overwriting the stored preference during initialization', () => {
    localStorage.setItem(PORTFOLIO_THEME_STORAGE_KEY, 'light');

    const service = TestBed.inject(ThemeService);

    expect(service.theme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem(PORTFOLIO_THEME_STORAGE_KEY)).toBe('light');
  });

  it('switches themes and persists each manual selection', () => {
    const service = TestBed.inject(ThemeService);

    service.toggleTheme();
    expect(service.theme()).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem(PORTFOLIO_THEME_STORAGE_KEY)).toBe('light');

    service.toggleTheme();
    expect(service.theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem(PORTFOLIO_THEME_STORAGE_KEY)).toBe('dark');
  });

  it('ignores invalid stored values and falls back to dark mode', () => {
    localStorage.setItem(PORTFOLIO_THEME_STORAGE_KEY, 'sepia');

    const service = TestBed.inject(ThemeService);

    expect(service.theme()).toBe('dark');
    expect(localStorage.getItem(PORTFOLIO_THEME_STORAGE_KEY)).toBe('sepia');
  });
});
