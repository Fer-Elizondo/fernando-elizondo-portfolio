import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { routes } from '../../app.routes';
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

    await TestBed.configureTestingModule({ imports: [HomePage], providers: [provideRouter(routes)] }).compileComponents();
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
    const sections = fixture.nativeElement.querySelectorAll(
      'main > section[id], main > app-featured-projects section[id], main > app-professional-experience section[id], main > app-personal-projects section[id], main > app-education-section section[id]',
    ) as NodeListOf<HTMLElement>;

    expect(Array.from(sections, (section) => section.id)).toEqual([
      'inicio',
      'sobre-mi',
      'proyectos',
      'experiencia',
      'proyectos-personales',
      'tecnologias',
      'formacion',
      'contacto',
    ]);

    const ids = Array.from(fixture.nativeElement.querySelectorAll('[id]'), (element: Element) => element.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('places Formation after Technologies and before Contact', () => {
    const technology = fixture.nativeElement.querySelector('#tecnologias') as HTMLElement;
    const education = fixture.nativeElement.querySelector('#formacion') as HTMLElement;
    const contact = fixture.nativeElement.querySelector('#contacto') as HTMLElement;

    expect(technology.compareDocumentPosition(education) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(education.compareDocumentPosition(contact) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('renders Cloud Backend Lab with its technologies and case-study route', () => {
    const section = fixture.nativeElement.querySelector('#proyectos-personales') as HTMLElement | null;
    const technologies = Array.from(section?.querySelectorAll('.project-technologies li') ?? [], (tag: Element) => tag.textContent?.trim());
    const caseStudyLink = section?.querySelector('a.case-study-link') as HTMLAnchorElement | null;

    expect(section?.querySelector('h3')?.textContent?.trim()).toBe('Cloud Backend Lab');
    expect(section?.textContent).toContain('Laboratorio personal enfocado en desarrollo backend, diseño de APIs REST, automatización CI/CD e infraestructura en Google Cloud.');
    expect(technologies).toEqual(['Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'GitHub Actions', 'Terraform', 'Google Cloud']);
    expect(caseStudyLink?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Ver caso de estudio');
    expect(caseStudyLink?.getAttribute('href')).toBe('/case-studies/cloud-backend-lab');
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

  it('renders accessible Spanish and English CV download links in Contact', () => {
    const card = fixture.nativeElement.querySelector('.resume-card') as HTMLElement | null;
    const links = Array.from(card?.querySelectorAll('a') ?? []) as HTMLAnchorElement[];

    expect(card?.querySelector('h3')?.textContent?.trim()).toBe('Mi currículum');
    expect(links.map((link) => link.textContent?.replace(/\s+/g, ' ').trim())).toEqual([
      'Descargar CV en español',
      'Download CV in English',
    ]);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/documents/cv-fernando-elizondo-es.pdf',
      '/documents/cv-fernando-elizondo-en.pdf',
    ]);
    expect(links.map((link) => link.getAttribute('download'))).toEqual([
      'cv-fernando-elizondo-es.pdf',
      'cv-fernando-elizondo-en.pdf',
    ]);
    expect(links.map((link) => link.getAttribute('aria-label'))).toEqual([
      'Descargar CV en español',
      'Download CV in English',
    ]);
  });
});
