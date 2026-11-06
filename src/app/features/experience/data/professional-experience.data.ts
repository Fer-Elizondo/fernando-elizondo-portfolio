import type { ProfessionalExperience } from '../models/professional-experience.model';

export const PROFESSIONAL_EXPERIENCE: ProfessionalExperience = {
  company: 'INAP',
  role: 'Full Stack Developer',
  period: 'Marzo 2023 – Agosto 2026',
  summary: 'Participé en el desarrollo, mantenimiento y evolución de aplicaciones web empresariales, colaborando con usuarios en el análisis de requerimientos y la atención de incidencias.',
  areas: [
    {
      id: 'development',
      title: 'Desarrollo de software',
      description: 'Trabajo de extremo a extremo en interfaces, servicios, datos y reglas de negocio.',
      details: [
        'Desarrollé interfaces y funcionalidades con React, TypeScript y Material UI.',
        'Implementé y mantuve backend con Node.js y Express, e integré APIs REST.',
        'Implementé validaciones y reglas de negocio; elaboré consultas SQL y procedimientos almacenados, conectando frontend, backend y bases de datos.',
        'Generé documentos PDF a partir de plantillas HTML con Puppeteer.',
      ],
    },
    {
      id: 'projects',
      title: 'Proyectos empresariales',
      description: 'Colaboré en tres sistemas que llegaron a producción, con responsabilidades distintas según el proyecto.',
      details: [
        'SGCM: desarrollo Full Stack y responsabilidades de liderazgo técnico.',
        'PAPVEH: desarrollo principalmente frontend y colaboración ocasional en backend.',
        'PAME: desarrollo principalmente frontend e integración con servicios REST.',
      ],
    },
    {
      id: 'leadership',
      title: 'Liderazgo técnico y colaboración',
      description: 'Asumí responsabilidades adicionales durante poco más de dos años. En los últimos seis a ocho meses coordiné directamente a dos desarrolladores, formando un equipo de tres personas.',
      details: [
        'Organicé y asigné tareas, con seguimiento en Jira y sprints de dos semanas.',
        'Orienté al equipo en código y reglas de negocio; identifiqué bloqueos y pendientes.',
        'Comuniqué avances al responsable del proyecto.',
      ],
    },
  ],
  technologies: [
    'React', 'JavaScript', 'TypeScript', 'Material UI', 'Zustand', 'Node.js', 'Express',
    'PHP', 'Laravel', 'MySQL', 'MariaDB',
  ],
  projects: ['SGCM', 'PAPVEH', 'PAME'],
};
