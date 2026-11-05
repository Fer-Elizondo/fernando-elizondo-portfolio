import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { HomePage } from './home-page';
import { HOME_CONTENT, LEARNING_TECHNOLOGIES, TECHNOLOGY_GROUPS } from './home.data';

vi.mock('motion', () => ({
  animate: vi.fn(),
  inView: vi.fn(() => vi.fn()),
}));

describe('HomePage', () => {
  let fixture: ComponentFixture<HomePage>;
  let matchMediaDescriptor: PropertyDescriptor | undefined;

  beforeEach(async () => {
    matchMediaDescriptor = Object.getOwnPropertyDescriptor(window, 'matchMedia');
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => ({ matches: true }) as MediaQueryList),
    });

    await TestBed.configureTestingModule({ imports: [HomePage] }).compileComponents();
    fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    if (matchMediaDescriptor) {
      Object.defineProperty(window, 'matchMedia', matchMediaDescriptor);
    } else {
      Reflect.deleteProperty(window, 'matchMedia');
    }
  });

  it('creates the standalone home page', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the main heading from the page content data', () => {
    const heading = fixture.nativeElement.querySelector('h1') as HTMLHeadingElement | null;

    expect(heading?.textContent?.trim()).toBe(`${HOME_CONTENT.hero.title.lead} ${HOME_CONTENT.hero.title.emphasis}`);
  });

  it('renders the main portfolio sections', () => {
    const sections = fixture.nativeElement.querySelectorAll('main > section[id]') as NodeListOf<HTMLElement>;

    expect(Array.from(sections, (section) => section.id)).toEqual([
      'inicio',
      'sobre-mi',
      'proyectos',
      'tecnologias',
      'contacto',
    ]);
  });

  it('renders the technology groups and their technologies from the data module', () => {
    const rows = fixture.nativeElement.querySelectorAll('.skill-row') as NodeListOf<HTMLElement>;
    const categories = Array.from(rows, (row) => row.querySelector('h3')?.textContent?.trim());
    const renderedTechnologies = Array.from(fixture.nativeElement.querySelectorAll('.skill-tags span'), (tag: Element) => tag.textContent?.trim());

    expect(categories).toEqual(TECHNOLOGY_GROUPS.map((group) => group.category));
    expect(renderedTechnologies).toEqual(TECHNOLOGY_GROUPS.flatMap((group) => [...group.technologies]));
  });

  it('renders the learning technologies from the data module', () => {
    const renderedTechnologies = Array.from(fixture.nativeElement.querySelectorAll('.learning-tags span'), (tag: Element) => tag.textContent?.trim());

    expect(renderedTechnologies).toEqual([...LEARNING_TECHNOLOGIES]);
  });
});
