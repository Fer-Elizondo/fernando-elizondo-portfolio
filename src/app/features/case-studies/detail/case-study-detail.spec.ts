import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CaseStudyDetailComponent } from './case-study-detail';

describe('CaseStudyDetailComponent', () => {
  let fixture: ComponentFixture<CaseStudyDetailComponent>;
  let reducedMotionPreference = false;
  const matchMediaDescriptor = Object.getOwnPropertyDescriptor(window, 'matchMedia');

  beforeEach(async () => {
    vi.useFakeTimers();
    reducedMotionPreference = false;
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn((media: string) => ({
        matches: media.includes('prefers-reduced-motion') && reducedMotionPreference,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }) as unknown as MediaQueryList),
    });

    await TestBed.configureTestingModule({
      imports: [CaseStudyDetailComponent],
      providers: [{
        provide: ActivatedRoute,
        useValue: { snapshot: { paramMap: { get: () => 'cloud-backend-lab' } } },
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseStudyDetailComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture?.destroy();
    vi.useRealTimers();
    vi.restoreAllMocks();
    if (matchMediaDescriptor) {
      Object.defineProperty(window, 'matchMedia', matchMediaDescriptor);
    } else {
      Reflect.deleteProperty(window, 'matchMedia');
    }
  });

  it('integrates the existing overview in the project header and presents five roadmap steps', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Cloud Backend Lab');
    expect(element.querySelector('.overview-copy')?.textContent).toContain('Este laboratorio funciona como un entorno de práctica');
    expect(element.querySelector('.overview')).toBeNull();
    expect(element.querySelectorAll('.roadmap-step')).toHaveLength(5);
    expect(element.textContent).toContain('Pipeline de CD independiente');
    expect(element.textContent).toContain('Verificación postdespliegue');
    expect(element.textContent).toContain('Automatizar el despliegue de cloud-backend-api mediante un flujo de entrega separado del proceso actual de CI.');
    expect(element.textContent).toContain('Incorporar validaciones automatizadas para comprobar la disponibilidad y el funcionamiento de la API después del despliegue.');
  });

  it('shows one technical category and supports buttons, indicators and keyboard navigation', () => {
    const element = fixture.nativeElement as HTMLElement;
    const visibleSlides = () => Array.from(element.querySelectorAll('.details-card'))
      .filter((slide) => slide.getAttribute('aria-hidden') !== 'true');

    const slides = Array.from(element.querySelectorAll('.details-card'));
    expect(slides).toHaveLength(4);
    expect(slides.filter((slide) => slide.getAttribute('aria-hidden') === 'true')
      .every((slide) => slide.hasAttribute('inert'))).toBe(true);
    expect(slides.find((slide) => slide.getAttribute('aria-hidden') !== 'true')?.hasAttribute('inert')).toBe(false);
    expect(visibleSlides()).toHaveLength(1);
    expect(visibleSlides()[0].getAttribute('aria-label')).toContain('Desarrollo backend');

    (element.querySelector('[aria-label="Categoría siguiente"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(visibleSlides()[0].getAttribute('aria-label')).toContain('Base de datos y pruebas');

    (element.querySelector('[aria-label="Categoría anterior"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(visibleSlides()[0].getAttribute('aria-label')).toContain('Desarrollo backend');

    (element.querySelector('[aria-label="Categoría siguiente"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(visibleSlides()[0].getAttribute('aria-label')).toContain('Base de datos y pruebas');

    (element.querySelector('[aria-label="Mostrar Infraestructura y nube"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(visibleSlides()[0].getAttribute('aria-label')).toContain('Infraestructura y nube');

    const previousButton = element.querySelector('[aria-label="Categoría anterior"]') as HTMLButtonElement;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    previousButton.focus();
    previousButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    fixture.detectChanges();
    expect(visibleSlides()[0].getAttribute('aria-label')).toContain('Evolución de CI/CD');
  });

  it('has no autoplay control and keeps touch navigation available', () => {
    const element = fixture.nativeElement as HTMLElement;
    const carousel = element.querySelector('.carousel') as HTMLElement;
    const activeLabel = () => Array.from(element.querySelectorAll('.details-card'))
      .find((slide) => slide.getAttribute('aria-hidden') !== 'true')?.getAttribute('aria-label');

    expect(element.querySelector('.autoplay-toggle')).toBeNull();
    expect(element.textContent).not.toContain('Reanudar reproducción automática');

    const touchStart = new Event('touchstart', { bubbles: true });
    Object.defineProperty(touchStart, 'changedTouches', { value: [{ clientX: 180 }] });
    carousel.dispatchEvent(touchStart);
    const touchEnd = new Event('touchend', { bubbles: true });
    Object.defineProperty(touchEnd, 'changedTouches', { value: [{ clientX: 100 }] });
    carousel.dispatchEvent(touchEnd);
    fixture.detectChanges();

    expect(activeLabel()).toContain('Base de datos y pruebas');
  });

  it('advances every seven seconds and wraps from the last category to the first', async () => {
    const element = fixture.nativeElement as HTMLElement;
    const activeLabel = () => Array.from(element.querySelectorAll('.details-card'))
      .find((slide) => slide.getAttribute('aria-hidden') !== 'true')?.getAttribute('aria-label');

    await vi.advanceTimersByTimeAsync(6999);
    fixture.detectChanges();
    expect(activeLabel()).toContain('Desarrollo backend');

    await vi.advanceTimersByTimeAsync(1);
    fixture.detectChanges();
    expect(activeLabel()).toContain('Base de datos y pruebas');

    await vi.advanceTimersByTimeAsync(21000);
    fixture.detectChanges();
    expect(activeLabel()).toContain('Desarrollo backend');
  });

  it('stops the interval on hover and resumes a single fresh interval on exit', async () => {
    const element = fixture.nativeElement as HTMLElement;
    const carousel = element.querySelector('.carousel') as HTMLElement;
    const activeLabel = () => Array.from(element.querySelectorAll('.details-card'))
      .find((slide) => slide.getAttribute('aria-hidden') !== 'true')?.getAttribute('aria-label');

    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    const setIntervalSpy = vi.spyOn(window, 'setInterval');
    carousel.dispatchEvent(new MouseEvent('mouseenter'));
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(21000);
    fixture.detectChanges();
    expect(activeLabel()).toContain('Desarrollo backend');

    carousel.dispatchEvent(new MouseEvent('mouseleave'));
    carousel.dispatchEvent(new MouseEvent('mouseleave'));
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(6999);
    fixture.detectChanges();
    expect(activeLabel()).toContain('Desarrollo backend');
    await vi.advanceTimersByTimeAsync(1);
    fixture.detectChanges();
    expect(activeLabel()).toContain('Base de datos y pruebas');
  });

  it('pauses while focus stays in the carousel and resumes when focus leaves', async () => {
    const element = fixture.nativeElement as HTMLElement;
    const previousButton = element.querySelector('[aria-label="Categoría anterior"]') as HTMLButtonElement;
    const activeLabel = () => Array.from(element.querySelectorAll('.details-card'))
      .find((slide) => slide.getAttribute('aria-hidden') !== 'true')?.getAttribute('aria-label');

    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');
    const setIntervalSpy = vi.spyOn(window, 'setInterval');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
    previousButton.focus();
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(14000);
    fixture.detectChanges();
    expect(activeLabel()).toContain('Desarrollo backend');

    previousButton.dispatchEvent(new FocusEvent('focusout', {
      bubbles: true,
      relatedTarget: document.body,
    }));
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(7000);
    fixture.detectChanges();
    expect(activeLabel()).toContain('Base de datos y pruebas');
  });

  it('resets autoplay after manual interaction without disabling it', async () => {
    const element = fixture.nativeElement as HTMLElement;
    const activeLabel = () => Array.from(element.querySelectorAll('.details-card'))
      .find((slide) => slide.getAttribute('aria-hidden') !== 'true')?.getAttribute('aria-label');

    await vi.advanceTimersByTimeAsync(5000);
    (element.querySelector('[aria-label="Categoría siguiente"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(activeLabel()).toContain('Base de datos y pruebas');
    expect(vi.getTimerCount()).toBe(1);

    await vi.advanceTimersByTimeAsync(6999);
    fixture.detectChanges();
    expect(activeLabel()).toContain('Base de datos y pruebas');
    await vi.advanceTimersByTimeAsync(1);
    fixture.detectChanges();
    expect(activeLabel()).toContain('Evolución de CI/CD');
  });

  it('cleans up the interval when the component is destroyed', () => {
    expect(vi.getTimerCount()).toBe(1);
    fixture.destroy();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('respects reduced-motion preferences while retaining manual navigation', async () => {
    fixture.destroy();
    reducedMotionPreference = true;
    fixture = TestBed.createComponent(CaseStudyDetailComponent);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const activeLabel = () => Array.from(element.querySelectorAll('.details-card'))
      .find((slide) => slide.getAttribute('aria-hidden') !== 'true')?.getAttribute('aria-label');

    expect(vi.getTimerCount()).toBe(0);
    await vi.advanceTimersByTimeAsync(14000);
    (element.querySelector('[aria-label="Categoría siguiente"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(activeLabel()).toContain('Base de datos y pruebas');
    expect(vi.getTimerCount()).toBe(0);
  });

  it('emphasizes each requested heading and preserves all roadmap states', () => {
    const element = fixture.nativeElement as HTMLElement;
    const titles = Array.from(element.querySelectorAll('.section-title'));

    expect(titles.map((title) => title.textContent?.replace(/\s+/g, ' ').trim())).toEqual([
      'Arquitectura del sistema',
      'Implementación técnica',
      'Hoja de ruta',
    ]);
    expect(titles.map((title) => title.querySelector('span')?.textContent)).toEqual([
      'sistema',
      'técnica',
      'ruta',
    ]);
    expect(Array.from(element.querySelectorAll('.roadmap-step .status-label')).map((label) => label.textContent?.trim())).toEqual([
      'En desarrollo',
      'Planeado',
      'En desarrollo',
      'Planeado',
      'Planeado',
    ]);
    expect(element.querySelector('.roadmap-step:last-child')?.classList.contains('status-planned')).toBe(true);
  });

  it('shows the historical and proposed architecture relationships with accessible labels and real statuses', () => {
    const element = fixture.nativeElement as HTMLElement;
    const diagrams = Array.from(element.querySelectorAll('.diagram-container svg')) as SVGSVGElement[];
    const [historical, target] = diagrams;

    expect(diagrams).toHaveLength(2);
    expect(Array.from(element.querySelectorAll('.architecture-card h3'), (heading) => heading.textContent?.trim())).toEqual([
      'Despliegue anterior: hello-function',
      'Arquitectura objetivo: cloud-backend-api',
    ]);
    expect(diagrams.map((diagram) => diagram.getAttribute('viewBox'))).toEqual(['0 0 960 320', '0 0 960 320']);
    expect(historical.getAttribute('role')).toBe('img');
    expect(historical.querySelector('title')?.textContent).toContain('Despliegue histórico');
    expect(historical.getAttribute('aria-labelledby')).toContain('historic-diagram-desc');
    expect(historical.querySelector('.cloud-boundary')).not.toBeNull();
    expect(historical.querySelector('.function-node .node-title')?.textContent).toBe('hello-function');
    expect(historical.textContent).toContain('Google Cloud Functions');
    expect(historical.textContent).toContain('DESPLIEGUE HISTÓRICO');

    expect(target.getAttribute('role')).toBe('img');
    expect(target.querySelector('title')?.textContent).toContain('Arquitectura objetivo');
    expect(target.getAttribute('aria-labelledby')).toContain('target-diagram-desc');
    expect(target.querySelector('.cloud-run-node .api-node .application-title')?.textContent).toBe('cloud-backend-api');
    expect(target.querySelector('.cloud-sql-node .database-title')?.textContent).toBe('Cloud SQL');
    expect(target.querySelector('.diagram-connector[marker-end="url(#target-db-arrow)"]')).not.toBeNull();
    expect(target.querySelector('.status-chip.status-development')?.textContent).toContain('EN DESARROLLO');
    expect(target.querySelector('.status-chip.status-planned')?.textContent).toContain('PLANEADO');
    expect(target.textContent).toContain('PostgreSQL');
    const connectionLabel = Array.from(target.querySelectorAll('.connection-label text'), (text) => text.textContent?.trim()).join(' ');
    expect(connectionLabel).toBe('Conexión a base de datos');
    expect(element.querySelector('.status-implemented')).not.toBeNull();
    expect(element.querySelector('.status-verified')).not.toBeNull();
    expect(element.querySelector('.status-deployed')).not.toBeNull();
  });

  it('retains the category selected through the indicators on the final slide', () => {
    const element = fixture.nativeElement as HTMLElement;

    (element.querySelector('[aria-label="Mostrar Infraestructura y nube"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(vi.getTimerCount()).toBe(1);
  });
});
