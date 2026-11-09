import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PROFESSIONAL_EXPERIENCE } from '../../data/professional-experience.data';
import { ProfessionalExperienceSection } from './professional-experience';

describe('ProfessionalExperienceSection', () => {
  let fixture: ComponentFixture<ProfessionalExperienceSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ProfessionalExperienceSection] }).compileComponents();
    fixture = TestBed.createComponent(ProfessionalExperienceSection);
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('renders the company, role, period and anchor section', () => {
    const root = fixture.nativeElement.querySelector('#experiencia') as HTMLElement | null;

    expect(root).not.toBeNull();
    expect(root?.querySelector('.experience-company')?.textContent?.trim()).toBe(PROFESSIONAL_EXPERIENCE.company);
    expect(root?.querySelector('#experience-role')?.textContent?.trim()).toBe(PROFESSIONAL_EXPERIENCE.role);
    expect(root?.querySelector('.experience-period')?.textContent?.trim()).toBe(PROFESSIONAL_EXPERIENCE.period);
  });

  it('renders the three contribution areas and their details', () => {
    const areas = Array.from(fixture.nativeElement.querySelectorAll('.contribution-area')) as HTMLElement[];

    expect(areas).toHaveLength(3);
    expect(areas.every((area) => area.getAttribute('tabindex') === '0')).toBe(true);
    expect(areas.map((area) => area.querySelector('h4')?.textContent?.trim())).toEqual(
      PROFESSIONAL_EXPERIENCE.areas.map((area) => area.title),
    );
    expect(areas[1].textContent).toContain('SGCM');
    expect(areas[1].textContent).toContain('PAPVEH');
    expect(areas[1].textContent).toContain('PAME');
  });

  it('communicates the time-bounded leadership stage', () => {
    const leadership = fixture.nativeElement.querySelector('#contribution-leadership')?.parentElement as HTMLElement | null;

    expect(leadership?.textContent).toContain('poco más de dos años');
    expect(leadership?.textContent).toContain('últimos seis a ocho meses');
    expect(leadership?.textContent).toContain('dos desarrolladores');
    expect(leadership?.textContent).toContain('Jira');
  });

  it('renders the confirmed professional technologies', () => {
    const technologies = Array.from(
      fixture.nativeElement.querySelectorAll('.experience-technologies li'),
      (element: Element) => element.textContent?.trim(),
    );

    expect(technologies).toEqual([...PROFESSIONAL_EXPERIENCE.technologies]);
    expect(technologies).toContain('Laravel');
  });
});
