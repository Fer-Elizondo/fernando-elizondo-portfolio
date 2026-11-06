export interface ContributionArea {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly details: readonly string[];
}

export interface ProfessionalExperience {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly summary: string;
  readonly areas: readonly ContributionArea[];
  readonly technologies: readonly string[];
  readonly projects: readonly string[];
}
