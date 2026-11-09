import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CaseStudy, EvidenceStatus, TechnicalFeature } from '../models/case-study.model';
import { CLOUD_BACKEND_LAB_DATA } from '../data/cloud-backend-lab.data';
import { LucideArrowUpRight, LucideCheck, LucideCodeXml, LucideDatabase, LucideServer, LucideShieldCheck, LucideExternalLink } from '@lucide/angular';

@Component({
  selector: 'app-case-study-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideArrowUpRight, LucideCheck, LucideCodeXml, LucideDatabase, LucideServer, LucideShieldCheck, LucideExternalLink],
  templateUrl: './case-study-detail.html',
  styleUrl: './case-study-detail.scss'
})
export class CaseStudyDetailComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private autoplayTimer?: number;
  private touchStartX: number | null = null;
  private pointerInside = false;
  private focusInside = false;
  private keyboardNavigation = false;
  private reducedMotion = false;
  private reducedMotionQuery?: MediaQueryList;

  protected caseStudy!: CaseStudy;
  protected readonly activeSlide = signal(0);
  protected readonly technicalCategories: readonly {
    key: 'backend' | 'databaseAndTesting' | 'cicd' | 'infrastructure';
    title: string;
    items: readonly TechnicalFeature[];
  }[] = [
    { key: 'backend', title: 'Desarrollo backend', items: CLOUD_BACKEND_LAB_DATA.technicalDetails.backend },
    { key: 'databaseAndTesting', title: 'Base de datos y pruebas', items: CLOUD_BACKEND_LAB_DATA.technicalDetails.databaseAndTesting },
    { key: 'cicd', title: 'Evolución de CI/CD', items: CLOUD_BACKEND_LAB_DATA.technicalDetails.cicd },
    { key: 'infrastructure', title: 'Infraestructura y nube', items: CLOUD_BACKEND_LAB_DATA.technicalDetails.infrastructure },
  ];

  private readonly reducedMotionChangeHandler = (event: MediaQueryListEvent): void => {
    this.reducedMotion = event.matches;
    this.syncAutoplay();
  };
  private readonly visibilityChangeHandler = (): void => {
    this.syncAutoplay();
  };
  private readonly keyboardNavigationHandler = (): void => {
    this.keyboardNavigation = true;
  };
  private readonly pointerNavigationHandler = (): void => {
    this.keyboardNavigation = false;
    this.focusInside = false;
    this.syncAutoplay();
  };

  ngOnInit(): void {
    // In a real app, we would fetch by slug. Here we use the hardcoded data for the demo.
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug === 'cloud-backend-lab') {
      this.caseStudy = CLOUD_BACKEND_LAB_DATA;
    }

    this.reducedMotionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    this.reducedMotion = this.reducedMotionQuery?.matches ?? false;
    this.reducedMotionQuery?.addEventListener('change', this.reducedMotionChangeHandler);
    document.addEventListener('visibilitychange', this.visibilityChangeHandler);
    document.addEventListener('keydown', this.keyboardNavigationHandler);
    document.addEventListener('pointerdown', this.pointerNavigationHandler);
    this.syncAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
    this.reducedMotionQuery?.removeEventListener('change', this.reducedMotionChangeHandler);
    document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
    document.removeEventListener('keydown', this.keyboardNavigationHandler);
    document.removeEventListener('pointerdown', this.pointerNavigationHandler);
  }

  protected showPrevious(): void {
    this.showSlide((this.activeSlide() - 1 + this.technicalCategories.length) % this.technicalCategories.length);
  }

  protected showNext(): void {
    this.showSlide((this.activeSlide() + 1) % this.technicalCategories.length);
  }

  protected showSlide(index: number): void {
    if (index < 0 || index >= this.technicalCategories.length) return;
    this.activeSlide.set(index);
    this.stopAutoplay();
    this.syncAutoplay();
  }

  protected getSlideTransform(index: number): string {
    const length = this.technicalCategories.length;
    let offset = (index - this.activeSlide() + length) % length;
    if (offset > length / 2) offset -= length;
    return `translateX(${offset * 100}%)`;
  }

  protected setPointerInside(inside: boolean): void {
    this.pointerInside = inside;
    this.syncAutoplay();
  }

  protected onFocusIn(): void {
    this.focusInside = this.keyboardNavigation;
    this.syncAutoplay();
  }

  protected onFocusOut(event: FocusEvent): void {
    const carousel = event.currentTarget as HTMLElement;
    this.focusInside = this.keyboardNavigation && event.relatedTarget instanceof Node &&
      carousel.contains(event.relatedTarget);
    this.syncAutoplay();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.showPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.showNext();
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.showSlide(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.showSlide(this.technicalCategories.length - 1);
    }
  }

  protected onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0]?.clientX ?? null;
  }

  protected onTouchEnd(event: TouchEvent): void {
    const startX = this.touchStartX;
    this.touchStartX = null;
    if (startX === null) return;
    const deltaX = (event.changedTouches[0]?.clientX ?? startX) - startX;
    if (Math.abs(deltaX) < 45) return;
    deltaX < 0 ? this.showNext() : this.showPrevious();
  }

  private canAutoplay(): boolean {
    return !this.pointerInside && !this.focusInside && !document.hidden && !this.reducedMotion;
  }

  private syncAutoplay(): void {
    if (!this.canAutoplay()) {
      this.stopAutoplay();
      return;
    }

    if (this.autoplayTimer === undefined) {
      this.autoplayTimer = window.setInterval(() => {
        this.activeSlide.update((slide) => (slide + 1) % this.technicalCategories.length);
      }, 7000);
    }
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer === undefined) return;
    window.clearInterval(this.autoplayTimer);
    this.autoplayTimer = undefined;
  }

  getStatusClass(status: string): string {
    return {
      'implemented': 'status-implemented',
      'verified-in-ci': 'status-verified',
      'deployed-previously': 'status-deployed',
      'in-development': 'status-development',
      'planned': 'status-planned'
    }[status] || 'status-planned';
  }

  getStatusLabel(status: EvidenceStatus): string {
    return {
      implemented: 'Implementado',
      'verified-in-ci': 'Verificado en CI',
      'deployed-previously': 'Desplegado anteriormente',
      'in-development': 'En desarrollo',
      planned: 'Planeado',
    }[status];
  }
}
