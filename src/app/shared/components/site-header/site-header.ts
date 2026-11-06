import { AfterViewInit, Component, DestroyRef, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { LucideArrowUpRight, LucideMenu, LucideX } from '@lucide/angular';

const SECTIONS = [
  'inicio',
  'sobre-mi',
  'proyectos',
  'experiencia',
  'tecnologias',
  'contacto'
] as const;

@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [LucideArrowUpRight, LucideMenu, LucideX],
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
})
export class SiteHeader implements AfterViewInit {
  protected readonly menuOpen = signal(false);
  protected readonly activeSection = signal<string>('inicio');
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private frameId: number | undefined;
  private pendingSection: string | undefined;
  private readonly onScroll = (): void => this.scheduleSectionCheck();
  private readonly onScrollEnd = (): void => {
    if (!this.pendingSection) return;
    this.pendingSection = undefined;
    this.scheduleSectionCheck();
  };

  ngAfterViewInit(): void {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    document.addEventListener('scrollend', this.onScrollEnd);
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.scheduleSectionCheck());

    this.scheduleSectionCheck();
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', this.onScroll);
      document.removeEventListener('scrollend', this.onScrollEnd);
      if (this.frameId !== undefined) cancelAnimationFrame(this.frameId);
    });
  }

  protected selectSection(section: string, event: MouseEvent): void {
    const target = document.getElementById(section);
    if (!target) return;

    // Make state and scrolling happen in a known order instead of racing the anchor default action.
    event.preventDefault();
    this.activeSection.set(section);
    this.closeMenu();

    const targetTop = target.getBoundingClientRect().top;
    if (Math.abs(targetTop) <= 1) {
      this.pendingSection = undefined;
    } else {
      this.pendingSection = section;
    }

    if (window.location.hash !== `#${section}`) {
      window.history.pushState(null, '', `#${section}`);
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  private scheduleSectionCheck(): void {
    if (this.frameId !== undefined) return;
    this.frameId = requestAnimationFrame(() => {
      this.frameId = undefined;
      if (this.pendingSection && !this.hasPendingSectionReachedReadingLine()) return;
      this.pendingSection = undefined;
      this.updateActiveSection();
    });
  }

  private hasPendingSectionReachedReadingLine(): boolean {
    const target = this.pendingSection ? document.getElementById(this.pendingSection) : null;
    if (!target) return true;

    const readingLine = this.getReadingLine();
    const targetBounds = target.getBoundingClientRect();
    const atDocumentEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
    return (targetBounds.top <= readingLine && targetBounds.bottom > readingLine) || atDocumentEnd;
  }

  private getReadingLine(): number {
    const headerBottom = document.querySelector<HTMLElement>('.site-header')?.getBoundingClientRect().bottom ?? 0;
    const scrollPaddingTop = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    return Math.max(headerBottom, scrollPaddingTop) + 1;
  }

  private updateActiveSection(): void {
    const readingLine = this.getReadingLine();
    const sections = SECTIONS
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const atDocumentEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
    const lastSection = sections.at(-1);
    if (atDocumentEnd && lastSection) {
      this.activeSection.set(lastSection.id);
      return;
    }

    let active = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= readingLine) active = section;
      else break;
    }
    this.activeSection.set(active.id);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closeMenu();
  }
}
