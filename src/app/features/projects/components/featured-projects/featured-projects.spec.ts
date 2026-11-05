import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FEATURED_PROJECTS } from '../../data/projects.data';
import type { ProfessionalProject } from '../../models/project.model';
import { FeaturedProjects } from './featured-projects';

function getElement<T extends Element>(container: ParentNode, selector: string): T {
  const element = container.querySelector<T>(selector);
  if (!element) throw new Error(`Expected to find element matching "${selector}".`);
  return element;
}

describe('FeaturedProjects', () => {
  let fixture: ComponentFixture<FeaturedProjects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [FeaturedProjects] }).compileComponents();
    fixture = TestBed.createComponent(FeaturedProjects);
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('renders the three featured professional projects', () => {
    const cards = fixture.nativeElement.querySelectorAll('.project-card') as NodeListOf<HTMLElement>;
    const acronyms = Array.from(cards, (card) => card.querySelector('.project-acronym')?.textContent?.trim());

    expect(cards).toHaveLength(3);
    expect(acronyms).toEqual(FEATURED_PROJECTS.map((project) => project.acronym));
  });

  it('renders each project title from the project data', () => {
    const titles = Array.from(fixture.nativeElement.querySelectorAll('.project-card h3'), (title: Element) => title.textContent?.trim());

    expect(titles).toEqual(FEATURED_PROJECTS.map((project) => project.title));
  });

  it('renders the expanded SGCM participation details while preserving PAPVEH and PAME highlights', () => {
    const cards = Array.from(fixture.nativeElement.querySelectorAll('.project-card')) as HTMLElement[];
    const highlights = cards.map((card) => Array.from(card.querySelectorAll('.project-highlights li'), (item: Element) => item.textContent?.trim()));

    expect(highlights[0]).toHaveLength(5);
    expect(highlights[0]).toContain('Consultas SQL y procedimientos almacenados en MySQL/MariaDB.');
    expect(highlights[0]).toContain('Controles de disponibilidad y porcentajes en fuentes de pago.');
    expect(highlights[0]).toContain('Coordinación técnica de dos desarrolladores y seguimiento de tareas en Jira.');
    expect(highlights[1]).toEqual([...FEATURED_PROJECTS[1].highlights]);
    expect(highlights[2]).toEqual([...FEATURED_PROJECTS[2].highlights]);
  });

  it('renders the technologies associated with each project', () => {
    const cards = Array.from(fixture.nativeElement.querySelectorAll('.project-card')) as HTMLElement[];

    cards.forEach((card, index) => {
      const technologies = Array.from(card.querySelectorAll('.project-technologies li'), (tag: Element) => tag.textContent?.trim());
      expect(technologies).toEqual([...FEATURED_PROJECTS[index].technologies]);
    });
  });

  it('identifies professional category and contribution for each project', () => {
    const cards = Array.from(fixture.nativeElement.querySelectorAll('.project-card')) as HTMLElement[];

    cards.forEach((card, index) => {
      expect(card.querySelector('.project-category')?.textContent?.trim()).toBe(FEATURED_PROJECTS[index].category);
      expect(card.querySelector('.project-contribution strong')?.textContent?.trim()).toBe(FEATURED_PROJECTS[index].contribution);
    });
  });

  it('marks each project as implemented in production', () => {
    const statuses = Array.from(fixture.nativeElement.querySelectorAll('.project-status'), (status: Element) => status.textContent?.trim());

    expect(statuses).toEqual(FEATURED_PROJECTS.map((project) => project.status));
  });

  it('does not render project links when the data has no URLs', () => {
    expect(fixture.nativeElement.querySelectorAll('.case-study-link, .project-external-link')).toHaveLength(0);
    expect(fixture.nativeElement.querySelectorAll('.case-study-pending')).toHaveLength(3);
  });

  it('renders optional links only for a project that provides URLs', () => {
    const linkedProject: ProfessionalProject = {
      ...FEATURED_PROJECTS[0],
      caseStudyUrl: '/case-studies/sgcm',
      repositoryUrl: 'https://example.invalid/sgcm',
      demoUrl: 'https://demo.example.invalid/sgcm',
    };
    fixture.componentRef.setInput('projects', [linkedProject]);
    fixture.detectChanges();

    const card = getElement<HTMLElement>(fixture.nativeElement, '.project-card');
    expect(getElement<HTMLAnchorElement>(card, '.case-study-link').getAttribute('href')).toBe(linkedProject.caseStudyUrl);
    expect(getElement<HTMLAnchorElement>(card, 'a[href="https://example.invalid/sgcm"]').getAttribute('rel')).toBe('noopener noreferrer');
    expect(getElement<HTMLAnchorElement>(card, 'a[href="https://demo.example.invalid/sgcm"]').getAttribute('rel')).toBe('noopener noreferrer');
  });
});
