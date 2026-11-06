import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { SiteHeader } from './site-header';

const SECTION_IDS = [
  'inicio',
  'sobre-mi',
  'proyectos',
  'experiencia',
  'tecnologias',
  'contacto'
] as const;

function getElement<T extends Element>(container: ParentNode, selector: string): T {
  const element = container.querySelector<T>(selector);
  if (!element) throw new Error(`Expected to find element matching "${selector}".`);
  return element;
}

describe('SiteHeader', () => {
  let fixture: ComponentFixture<SiteHeader>;
  let testSections: HTMLElement[];
  let frames: FrameRequestCallback[];
  let header: HTMLElement;
  let scrollHeightDescriptor: PropertyDescriptor | undefined;
  let scrollYDescriptor: PropertyDescriptor | undefined;
  let originalScrollPaddingTop: string;

  beforeEach(async () => {
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    scrollYDescriptor = Object.getOwnPropertyDescriptor(window, 'scrollY');
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
    frames = [];
    originalScrollPaddingTop = document.documentElement.style.scrollPaddingTop;
    scrollHeightDescriptor = Object.getOwnPropertyDescriptor(document.documentElement, 'scrollHeight');
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 10000 });
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      frames.push(callback);
      return frames.length;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());

    testSections = SECTION_IDS.map((id) => {
      const section = document.createElement('section');
      section.id = id;
      section.setAttribute('data-header-test-section', '');
      Object.defineProperty(section, 'scrollIntoView', { configurable: true, value: vi.fn() });
      document.body.append(section);
      return section;
    });

    await TestBed.configureTestingModule({ imports: [SiteHeader], providers: [provideRouter([])] }).compileComponents();
    fixture = TestBed.createComponent(SiteHeader);
    fixture.detectChanges();
    header = getElement<HTMLElement>(fixture.nativeElement, '.site-header');
    vi.spyOn(header, 'getBoundingClientRect').mockReturnValue({ top: 0, bottom: 76, left: 0, right: 0, width: 0, height: 76, x: 0, y: 0, toJSON: () => ({}) });
    positionSections(0);
    flushFrame();
  });

  afterEach(() => {
    fixture.destroy();
    testSections.forEach((section) => section.remove());
    document.documentElement.style.scrollPaddingTop = originalScrollPaddingTop;
    if (scrollHeightDescriptor) Object.defineProperty(document.documentElement, 'scrollHeight', scrollHeightDescriptor);
    else Reflect.deleteProperty(document.documentElement, 'scrollHeight');
    if (scrollYDescriptor) Object.defineProperty(window, 'scrollY', scrollYDescriptor);
    else Reflect.deleteProperty(window, 'scrollY');
    vi.unstubAllGlobals();
  });

  function positionSections(activeIndex: number, activeTop = 0): void {
    testSections.forEach((section, index) => {
      const top = (index - activeIndex) * (index % 2 ? 1800 : 450) + (index === activeIndex ? activeTop : 0);
      vi.spyOn(section, 'getBoundingClientRect').mockReturnValue({ top, bottom: top + (index % 2 ? 1800 : 450), left: 0, right: 0, width: 100, height: index % 2 ? 1800 : 450, x: 0, y: top, toJSON: () => ({}) });
    });
  }

  function flushFrame(): void {
    const callbacks = frames;
    frames = [];
    callbacks.forEach((callback) => callback(0));
    fixture.detectChanges();
  }

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
    const link = getElement<HTMLAnchorElement>(fixture.nativeElement, '#primary-navigation a[href="#tecnologias"]');

    button.click();
    fixture.detectChanges();
    link.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes the mobile menu after selecting Experience', () => {
    const button = getElement<HTMLButtonElement>(fixture.nativeElement, '.menu-toggle');
    const link = getElement<HTMLAnchorElement>(fixture.nativeElement, '#primary-navigation a[href="#experiencia"]');

    button.click();
    fixture.detectChanges();
    link.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it('starts with Inicio active and applies aria-current only to that link', () => {
    const activeLink = getElement<HTMLAnchorElement>(fixture.nativeElement, '#primary-navigation a[href="#inicio"]');
    const inactiveLinks = fixture.nativeElement.querySelectorAll('#primary-navigation a:not([href="#inicio"])') as NodeListOf<HTMLAnchorElement>;

    expect(activeLink.getAttribute('aria-current')).toBe('location');
    expect(Array.from(inactiveLinks).every((link) => !link.hasAttribute('aria-current'))).toBe(true);
  });

  it('tracks the reading line while scrolling in either direction across differently sized sections', () => {
    positionSections(3);
    window.dispatchEvent(new Event('scroll'));
    flushFrame();
    const activeLink = getElement<HTMLAnchorElement>(fixture.nativeElement, '#primary-navigation a[href="#experiencia"]');
    expect(activeLink.getAttribute('aria-current')).toBe('location');

    positionSections(1);
    window.dispatchEvent(new Event('scroll'));
    flushFrame();
    expect(getElement<HTMLAnchorElement>(fixture.nativeElement, '#primary-navigation a[href="#sobre-mi"]').getAttribute('aria-current')).toBe('location');
    expect(getElement<HTMLAnchorElement>(fixture.nativeElement, '#primary-navigation a[href="#experiencia"]').hasAttribute('aria-current')).toBe(false);
  });

  it('activates the selected link immediately and closes the mobile menu', () => {
    const button = getElement<HTMLButtonElement>(fixture.nativeElement, '.menu-toggle');
    button.click();
    getElement<HTMLAnchorElement>(fixture.nativeElement, '#primary-navigation a[href="#contacto"]').click();
    fixture.detectChanges();

    expect(getElement<HTMLAnchorElement>(fixture.nativeElement, '#primary-navigation a[href="#contacto"]').getAttribute('aria-current')).toBe('location');
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  it.each(SECTION_IDS)('activates #%s and updates aria-current immediately when selected', (section) => {
    const link = getElement<HTMLAnchorElement>(fixture.nativeElement, `#primary-navigation a[href="#${section}"]`);
    link.click();
    fixture.detectChanges();

    expect(link.getAttribute('aria-current')).toBe('location');
    expect(fixture.nativeElement.querySelectorAll('#primary-navigation a[aria-current="location"]')).toHaveLength(1);
    expect(window.location.hash).toBe(`#${section}`);
    expect(document.getElementById(section)?.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it.each(SECTION_IDS)('keeps #%s active when scroll events arrive before the destination', (section) => {
    getElement<HTMLAnchorElement>(fixture.nativeElement, `#primary-navigation a[href="#${section}"]`).click();
    fixture.detectChanges();

    positionSections(0);
    window.dispatchEvent(new Event('scroll'));
    flushFrame();

    expect(getElement<HTMLAnchorElement>(fixture.nativeElement, `#primary-navigation a[href="#${section}"]`).getAttribute('aria-current')).toBe('location');
  });

  it.each([
    ['contacto', 'sobre-mi'],
    ['tecnologias', 'proyectos'],
    ['experiencia', 'inicio'],
  ] as const)('switches immediately from #%s to #%s', (from, to) => {
    getElement<HTMLAnchorElement>(fixture.nativeElement, `#primary-navigation a[href="#${from}"]`).click();
    fixture.detectChanges();
    const destination = getElement<HTMLAnchorElement>(fixture.nativeElement, `#primary-navigation a[href="#${to}"]`);
    destination.click();
    fixture.detectChanges();

    expect(destination.getAttribute('aria-current')).toBe('location');
    expect(fixture.nativeElement.querySelectorAll('#primary-navigation a[aria-current="location"]')).toHaveLength(1);
  });

  it('keeps the clicked section active until it reaches the reading line, then resumes scroll detection', () => {
    getElement<HTMLAnchorElement>(fixture.nativeElement, '#primary-navigation a[href="#proyectos"]').click();
    fixture.detectChanges();

    positionSections(0);
    window.dispatchEvent(new Event('scroll'));
    flushFrame();
    expect(getElement<HTMLAnchorElement>(fixture.nativeElement, '#primary-navigation a[href="#proyectos"]').getAttribute('aria-current')).toBe('location');

    document.documentElement.style.scrollPaddingTop = '88px';
    positionSections(2, 88);
    window.dispatchEvent(new Event('scroll'));
    flushFrame();
    expect(getElement<HTMLAnchorElement>(fixture.nativeElement, '#primary-navigation a[href="#proyectos"]').getAttribute('aria-current')).toBe('location');

    positionSections(0);
    window.dispatchEvent(new Event('scroll'));
    flushFrame();
    expect(getElement<HTMLAnchorElement>(fixture.nativeElement, '#primary-navigation a[href="#inicio"]').getAttribute('aria-current')).toBe('location');
  });

  it('removes the scroll listener and cancels a pending animation frame on destroy', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const documentRemoveSpy = vi.spyOn(document, 'removeEventListener');
    window.dispatchEvent(new Event('scroll'));
    fixture.destroy();

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(documentRemoveSpy).toHaveBeenCalledWith('scrollend', expect.any(Function));
    expect(cancelAnimationFrame).toHaveBeenCalled();
  });
});
