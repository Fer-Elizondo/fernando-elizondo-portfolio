import { AfterViewInit, Component, DestroyRef, HostListener, inject, signal } from '@angular/core';
import { LucideArrowUpRight, LucideMenu, LucideX } from '@lucide/angular';

const SECTIONS = ['inicio', 'sobre-mi', 'tecnologias', 'contacto'] as const;

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

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) this.activeSection.set(visible.target.id);
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.2, 0.5, 1] },
    );

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    this.destroyRef.onDestroy(() => observer.disconnect());
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
