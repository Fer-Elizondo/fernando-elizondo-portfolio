import { AfterViewInit, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { animate, inView } from 'motion';
import { LucideArrowDown, LucideArrowUpRight, LucideCheck, LucideCodeXml, LucideLayers3, LucideMail } from '@lucide/angular';
import { HOME_CONTENT, LEARNING_TECHNOLOGIES, TECHNOLOGY_GROUPS } from './home.data';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LucideArrowDown, LucideArrowUpRight, LucideCheck, LucideCodeXml, LucideLayers3, LucideMail],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements AfterViewInit {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly content = HOME_CONTENT;
  protected readonly skillGroups = TECHNOLOGY_GROUPS;
  protected readonly learning = LEARNING_TECHNOLOGIES;

  ngAfterViewInit(): void {
    const host = this.host.nativeElement;
    const cleanups: Array<() => void> = [];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reducedMotion) {
      const hero = host.querySelector('[data-hero]') as HTMLElement | null;
      if (hero) {
        animate(hero, { opacity: [0, 1], y: [12, 0] }, { duration: 0.75, ease: 'easeOut' });
      }

      const stopObserving = inView('[data-reveal]', (element) => {
        animate(element, { opacity: [0, 1], y: [18, 0] }, { duration: 0.65, ease: 'easeOut' });
      }, { amount: 0.12 });
      cleanups.push(stopObserving);
    }

    this.destroyRef.onDestroy(() => cleanups.forEach((cleanup) => cleanup()));
  }
}
