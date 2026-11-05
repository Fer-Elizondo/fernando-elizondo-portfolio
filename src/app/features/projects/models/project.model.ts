export type ProjectCategory = 'Experiencia profesional';
export type ProjectStatus = 'Implementado en producción';

export interface ProfessionalProject {
  readonly id: string;
  readonly number: string;
  readonly acronym: string;
  readonly title: string;
  readonly summary: string;
  readonly category?: ProjectCategory;
  readonly contribution?: string;
  readonly highlights: readonly string[];
  readonly technologies?: readonly string[];
  readonly status?: ProjectStatus;
  readonly featured?: boolean;
  readonly slug?: string;
  readonly repositoryUrl?: string;
  readonly demoUrl?: string;
  readonly caseStudyUrl?: string;
}
