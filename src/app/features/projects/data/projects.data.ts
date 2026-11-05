import type { ProfessionalProject } from '../models/project.model';

export const FEATURED_PROJECTS = [
  {
    id: 'sgcm',
    number: '01',
    acronym: 'SGCM',
    title: 'Sistema de Gestión de Créditos a Municipios',
    summary: 'Sistema web empresarial para gestionar créditos dirigidos a municipios. Participé desde una etapa temprana y llegó a producción inicialmente en dos municipios.',
    category: 'Experiencia profesional',
    contribution: 'Full Stack Development / Technical Leadership',
    highlights: [
      'Flujos de crédito, reglas de negocio y validaciones financieras.',
      'APIs REST y generación de documentos PDF con Puppeteer.',
      'Consultas SQL y procedimientos almacenados en MySQL/MariaDB.',
      'Controles de disponibilidad y porcentajes en fuentes de pago.',
      'Coordinación técnica de dos desarrolladores y seguimiento de tareas en Jira.',
    ],
    technologies: ['React', 'TypeScript', 'Material UI', 'Node.js', 'Express', 'MySQL/MariaDB', 'Puppeteer'],
    status: 'Implementado en producción',
    featured: true,
  },
  {
    id: 'papveh',
    number: '02',
    acronym: 'PAPVEH',
    title: 'Plataforma de Administración de Parque Vehicular',
    summary: 'Plataforma para administrar el parque vehicular. Mi participación fue principalmente frontend, con colaboración ocasional en backend y ajustes menores en base de datos.',
    category: 'Experiencia profesional',
    contribution: 'Frontend Development / Backend Collaboration',
    highlights: [
      'Formularios y tablas con filtros, búsqueda y control por estatus.',
      'Integración con APIs REST y cambios puntuales en endpoints Node.js/Express.',
    ],
    technologies: ['TypeScript', 'Material UI', 'Node.js', 'Express', 'APIs REST'],
    status: 'Implementado en producción',
  },
  {
    id: 'pame',
    number: '03',
    acronym: 'PAME',
    title: 'Plataforma para la Administración de Mantenimientos de Edificios',
    summary: 'Plataforma para administrar mantenimientos de edificios. Mi participación fue principalmente frontend e integración con servicios REST.',
    category: 'Experiencia profesional',
    contribution: 'Frontend Development',
    highlights: [
      'Formularios, listados y filtros por roles, permisos y estatus.',
      'Integración con servicios REST y validación de datos en el cliente.',
    ],
    technologies: ['TypeScript', 'Material UI', 'APIs REST'],
    status: 'Implementado en producción',
  },
] as const satisfies readonly ProfessionalProject[];

export const PROJECTS_PARTICIPATION_NOTE = 'Los tres proyectos llegaron a producción. La participación descrita corresponde a las etapas indicadas y no implica mantenimiento continuo posterior.';
