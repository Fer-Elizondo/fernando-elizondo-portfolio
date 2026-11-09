import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationSection } from './education-section';

describe('EducationSection', () => {
  let fixture: ComponentFixture<EducationSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EducationSection] }).compileComponents();
    fixture = TestBed.createComponent(EducationSection);
    fixture.detectChanges();
  });

  afterEach(() => fixture.destroy());

  it('renders the requested education anchor and heading', () => {
    const section = fixture.nativeElement.querySelector('#formacion') as HTMLElement | null;

    expect(section?.getAttribute('aria-labelledby')).toBe('education-title');
    expect(section?.querySelector('h2')?.textContent?.replace(/\s+/g, ' ').trim())
      .toBe('Formación y certificaciones.');
  });

  it('renders the university details and both certifications without additional credentials', () => {
    const cards = Array.from(fixture.nativeElement.querySelectorAll('.education-card')) as HTMLElement[];
    const certifications = fixture.nativeElement.querySelector('.certifications-list') as HTMLElement | null;

    expect(cards).toHaveLength(3);
    expect(cards[0].classList.contains('academic-card')).toBe(true);
    expect(cards[0].querySelector('.education-kind-row .education-icon')).not.toBeNull();
    expect(cards[0].querySelector('.education-kind-row .education-kind')?.textContent?.trim()).toBe('FORMACIÓN ACADÉMICA');
    expect(certifications?.getAttribute('role')).toBe('group');
    expect(certifications?.querySelectorAll('.certification-card')).toHaveLength(2);
    expect(cards[0].textContent).toContain('Universidad Autónoma de Nuevo León (UANL)');
    expect(cards[0].textContent).toContain('Facultad de Ciencias Físico Matemáticas (FCFM)');
    expect(cards[0].textContent).toContain('Licenciatura en Ciencias Computacionales');
    expect(cards[0].textContent).toContain('2017–2022');
    expect(cards[1].textContent).toContain('Power BI Intermedio');
    expect(cards[1].textContent).toContain('Análisis y modelado de datos.');
    expect(cards[2].textContent).toContain('Scrum Fundamentals Certified (SFC™)');
    expect(cards[2].textContent).toContain('SCRUMstudy.');
    expect(cards.slice(1).some((card) => /\b20\d{2}\b/.test(card.textContent ?? ''))).toBe(false);
  });
});
