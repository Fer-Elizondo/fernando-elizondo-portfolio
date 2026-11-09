export type EvidenceStatus =
  | 'implemented'
  | 'verified-in-ci'
  | 'deployed-previously'
  | 'in-development'
  | 'planned';

export interface TechnicalFeature {
  name: string;
  description: string;
  status: EvidenceStatus;
  technologies?: string[];
}

export interface CaseStudy {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly summary: string;
  readonly hero: {
    title: string;
    description: string;
    stack: string[];
    repositoryUrl: string;
  };
  readonly overview: string;
  readonly architecture: {
    currentTitle: string;
    currentDescription: string;
    targetTitle: string;
    targetDescription: string;
  };
  readonly technicalDetails: {
    backend: TechnicalFeature[];
    databaseAndTesting: TechnicalFeature[];
    cicd: TechnicalFeature[];
    infrastructure: TechnicalFeature[];
  };
  readonly roadmap: TechnicalFeature[];
}
