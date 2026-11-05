import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { SiteHeader } from './site-header';

const SECTION_IDS = [
  'inicio',
  'sobre-mi',
  'proyectos',
  'tecnologias',
  'contacto'
] as const;

class MockIntersectionObserver implements IntersectionObserver {
  static latest: MockIntersectionObserver | undefined;
  readonly scrollMargin = '0px 0px 0px 0px';
  readonly root: Element | Document | null = null;
  readonly rootMargin = '-25% 0px -60% 0px';
  readonly thresholds: readonly number[] = [0, 0.2, 0.5, 1];
  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.latest = this;
  }

  observe(_target: Element): void {}

  unobserve(_target: Element): void {}

  disconnect(): void {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  emit(entry: IntersectionObserverEntry): void {
    this.callback([entry], this);
  }
}

function getElement<T extends Element>(container: ParentNode, selector: string): T {
  const element = container.querySelector<T>(selector);
  if (!element) throw new Error(`Expected to find element matching "${selector}".`);
  return element;
}

describe('SiteHeader', () => {
  let fixture: ComponentFixture<SiteHeader>;
  let intersectionObserverDescriptor: PropertyDescriptor | undefined;
  let testSections: HTMLElement[];

  beforeEach(async () => {
    intersectionObserverDescriptor = Object.getOwnPropertyDescriptor(window, 'IntersectionObserver');
    MockIntersectionObserver.latest = undefined;
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      value: MockIntersectionObserver,
    });

    testSections = SECTION_IDS.map((id) => {
      const section = document.createElement('section');
      section.id = id;
      section.setAttribute('data-header-test-section', '');
      document.body.append(section);
      return section;
    });

    await TestBed.configureTestingModule({ imports: [SiteHeader] }).compileComponents();
    fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    testSections.forEach((section) => section.remove());
    if (intersectionObserverDescriptor) {
      Object.defineProperty(window, 'IntersectionObserver', intersectionObserverDescriptor);
    } else {
      Reflect.deleteProperty(window, 'IntersectionObserver');
    }
  });

  it('creates the standalone site header', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders a link for each portfolio section', () => {
    const links = fixture.nativeElement.querySelectorAll('#primary-navigation a') as NodeListOf<HTMLAnchorElement>;

    expect(Array.from(links, (link) => link.getAttribute('href'))).toEqual(SECTION_IDS.map((id) => `#${id}`));
  });

  it('gives the mobile menu button an accessible name and collapsed state', () => {
    const button = getElement<HTMLButtonElement>(fixture.nativeElement, '.menu-toggle');

    expect(button.getAttribute('aria-label')).toBe('Abrir menú');
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('opens and closes the mobile menu when its button is activated', () => {
    const button = getElement<HTMLButtonElement>(fixture.nativeElement, '.menu-toggle');

    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(button.getAttribute('aria-label')).toBe('Cerrar menú');

    button.click();
    fixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(button.getAttribute('aria-label')).toBe('Abrir menú');
  });

  it('closes the mobile menu after a navigation link is selected', () => {
    const button = getElement<HTMLButtonElement>(fixture.nativeElement, '.menu-toggle');
    const link = getElement<HTMLAnchorElement>(fixture.nativeElement, 'a[href="#tecnologias"]');

    button.click();
    fixture.detectChanges();
    link.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('marks only the section reported as visible with aria-current="location"', () => {
    const activeSection = testSections.find((section) => section.id === 'tecnologias');
    if (!activeSection) throw new Error('Expected a test section for technologies.');

    const observer = MockIntersectionObserver.latest;
    if (!observer) throw new Error('Expected SiteHeader to create an IntersectionObserver.');
    observer.emit({
      boundingClientRect: activeSection.getBoundingClientRect(),
      intersectionRatio: 1,
      intersectionRect: activeSection.getBoundingClientRect(),
      isIntersecting: true,
      rootBounds: null,
      target: activeSection,
      time: 0,
    });
    fixture.detectChanges();

    const activeLink = getElement<HTMLAnchorElement>(fixture.nativeElement, 'a[href="#tecnologias"]');
    const inactiveLinks = fixture.nativeElement.querySelectorAll('#primary-navigation a:not([href="#tecnologias"])') as NodeListOf<HTMLAnchorElement>;

    expect(activeLink.getAttribute('aria-current')).toBe('location');
    expect(Array.from(inactiveLinks).every((link) => !link.hasAttribute('aria-current'))).toBe(true);
  });
});
