export interface TechnologyGroup {
  readonly category: string;
  readonly note: string;
  readonly technologies: readonly string[];
}

interface SectionHeading {
  readonly lead: string;
  readonly emphasis: string;
}

export const HOME_CONTENT = {
  hero: {
    eyebrow: 'DESARROLLO WEB · FULL STACK',
    title: {
      lead: 'Construyo productos digitales',
      emphasis: 'de principio a fin.',
    } satisfies SectionHeading,
    introduction: 'Soy',
    name: 'Fernando Elizondo',
    professionalIntro: 'desarrollador Full Stack con más de 3 años de experiencia profesional.',
    professionalDetails: 'Integro interfaces, APIs REST, reglas de negocio y bases de datos para crear aplicaciones web completas.',
    availability: 'Abierto a oportunidades profesionales',
    primaryAction: 'Hablemos',
    projectsAction: 'Explorar proyectos',
    technologiesLabel: 'Tecnologías principales',
    stackLabel: 'Enfoque principal',
    technologies: ['React', 'TypeScript', 'Node.js', 'MySQL'],
    visualDescription: 'Una aplicación conecta tres capas: interfaz de usuario, API REST y base de datos.',
    scrollLabel: 'DESLIZA PARA EXPLORAR',
    scrollDescription: 'Continuar a la sección sobre mí',
  },
  about: {
    sectionNumber: '01',
    sectionLabel: 'SOBRE MÍ',
    title: {
      lead: 'Tecnología que resuelve problemas',
      emphasis: 'reales.',
    } satisfies SectionHeading,
    paragraphs: [
      'Durante más de tres años he participado en el desarrollo y despliegue de aplicaciones web de extremo a extremo. Mi trabajo combina frontend, backend y datos para convertir necesidades de producto en soluciones que funcionan en producción.',
      'También he coordinado a un equipo de tres desarrolladores, cuidando la colaboración y la calidad técnica durante la entrega.',
    ],
    linkLabel: 'Conoce mi experiencia',
    factsLabel: 'Áreas de experiencia',
    facts: [
      { index: '01', title: 'Desarrollo Full Stack', description: 'Del frontend a la base de datos' },
      { index: '02', title: 'Entrega y operación', description: 'CI/CD, contenedores y despliegues' },
      { index: '03', title: 'Colaboración técnica', description: 'Liderazgo y coordinación de equipo' },
    ],
  },
  projects: {
    index: '02 / PORTAFOLIO',
    note: 'Los casos de estudio estarán disponibles próximamente.',
  },
  technology: {
    sectionNumber: '04',
    sectionLabel: 'HERRAMIENTAS',
    title: {
      lead: 'Un stack pensado',
      emphasis: 'para entregar.',
    } satisfies SectionHeading,
    description: 'Tecnologías que uso para desarrollar, integrar y poner en marcha productos web.',
    learningTitle: 'En aprendizaje y proyectos personales',
    learningDescription: 'Amplío mi perfil con nuevas herramientas y prácticas.',
  },
  contact: {
    sectionNumber: '05',
    sectionLabel: 'CONTACTO',
    title: {
      lead: '¿Tienes una idea',
      emphasis: 'en mente?',
    } satisfies SectionHeading,
    description: 'Si buscas a alguien que pueda conectar producto, interfaz y backend, me encantará conocer más.',
    action: 'Escríbeme',
    emailLabel: 'Correo electrónico',
    email: 'fernando.alexis.elizondo@gmail.com',
    linkedInLabel: 'LinkedIn',
    linkedInUrl: 'https://linkedin.com/in/fernando-elizondo',
    linkedInText: 'linkedin.com/in/fernando-elizondo',
  },
  footer: {
    name: 'Fernando Elizondo · Desarrollador Full Stack',
    backToTop: 'Volver arriba ↑',
  },
} as const;

export const TECHNOLOGY_GROUPS = [
  {
    category: 'Frontend',
    note: 'Interfaces claras, accesibles y mantenibles.',
    technologies: ['React', 'TypeScript', 'Material UI'],
  },
  {
    category: 'Backend',
    note: 'APIs REST, lógica de negocio e integraciones.',
    technologies: ['Node.js', 'Express', 'Puppeteer'],
  },
  {
    category: 'Bases de datos',
    note: 'Modelado relacional y consultas eficientes.',
    technologies: ['MySQL', 'Procedimientos almacenados'],
  },
  {
    category: 'DevOps',
    note: 'Despliegues, automatización y operación.',
    technologies: ['Docker', 'Jenkins', 'PM2', 'CI/CD'],
  },
] as const satisfies readonly TechnologyGroup[];

export const LEARNING_TECHNOLOGIES = [
  'Angular',
  'ASP.NET Core',
  'Google Cloud',
  'Terraform',
  'PostgreSQL',
  'GitHub Actions',
] as const;
