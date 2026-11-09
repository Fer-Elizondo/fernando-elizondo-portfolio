import { CaseStudy } from '../models/case-study.model';

export const CLOUD_BACKEND_LAB_DATA: CaseStudy = {
  id: 'cloud-backend-lab',
  slug: 'cloud-backend-lab',
  title: 'Cloud Backend Lab',
  subtitle: 'Proyecto personal',
  summary: 'Un laboratorio técnico para explorar arquitecturas backend modernas, la evolución de CI/CD y la automatización de infraestructura en la nube.',
  hero: {
    title: 'Cloud Backend Lab',
    description: 'Explorando la integración entre un backend robusto y despliegues automatizados en la nube.',
    stack: ['Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'GitHub Actions', 'Terraform', 'Google Cloud'],
    repositoryUrl: 'https://github.com/Fer-Elizondo/cloud-backend-lab'
  },
  overview: 'Este laboratorio funciona como un entorno de práctica para implementar patrones de desarrollo backend y automatizar su ciclo de vida mediante prácticas modernas de DevOps. El objetivo es construir un sistema escalable, verificable y automatizado desde sus fundamentos.',
  architecture: {
    currentTitle: 'Despliegue anterior: hello-function',
    currentDescription: 'Una versión anterior del proyecto se desplegó mediante Google Cloud Functions para ejecutar funciones sin servidor. Este despliegue es histórico y no significa que la versión actual del backend esté desplegada en GCP.',
    targetTitle: 'Arquitectura objetivo: cloud-backend-api',
    targetDescription: 'Arquitectura propuesta para ejecutar el backend como un servicio en Cloud Run y utilizar una base de datos relacional administrada. Esta arquitectura todavía se encuentra en desarrollo.'
  },
  technicalDetails: {
    backend: [
      { name: 'Node.js y TypeScript', description: 'Entorno de ejecución robusto y con seguridad de tipos.', status: 'implemented' },
      { name: 'Express', description: 'Herramienta minimalista y flexible para crear aplicaciones web.', status: 'implemented' },
      { name: 'Controlador-servicio-repositorio', description: 'Patrón de arquitectura limpia que separa responsabilidades.', status: 'implemented' },
      { name: 'API REST', description: 'Comunicación estandarizada mediante una API.', status: 'implemented' },
      { name: 'Autenticación con JWT', description: 'Gestión segura de sesiones sin estado.', status: 'implemented' },
      { name: 'bcrypt', description: 'Protección de contraseñas mediante funciones de resumen criptográfico.', status: 'implemented' },
      { name: 'Validación con Zod', description: 'Validación de esquemas en tiempo de ejecución para proteger la integridad de los datos.', status: 'implemented' },
    ],
    databaseAndTesting: [
      { name: 'PostgreSQL', description: 'Base de datos relacional para datos estructurados.', status: 'implemented' },
      { name: 'Esquema relacional', description: 'Estructura relacional diseñada con restricciones.', status: 'implemented' },
      { name: 'Vitest y Supertest', description: 'Pruebas unitarias y de integración exhaustivas.', status: 'verified-in-ci' },
    ],
    cicd: [
      { name: 'CI con GitHub Actions', description: 'Flujo actual de CI para ejecutar pruebas y verificar el paquete; no despliega el backend.', status: 'verified-in-ci' },
      { name: 'Canalización histórica de CD', description: 'Despliegue anterior de Cloud Functions mediante Workload Identity Federation, independiente del flujo actual de CI.', status: 'deployed-previously' },
    ],
    infrastructure: [
      { name: 'Terraform', description: 'Infraestructura como código para administrar entornos de forma predecible.', status: 'implemented' },
      { name: 'Google Cloud Platform', description: 'Proveedor de infraestructura en la nube escalable.', status: 'implemented' },
      { name: 'IAM y Secret Manager', description: 'Administración segura de identidades y secretos.', status: 'implemented' },
      { name: 'Workload Identity Federation', description: 'Autenticación segura y sin claves para CI/CD.', status: 'deployed-previously' },
    ],
  },
  roadmap: [
    { name: 'Migración a Cloud Run', description: 'Migración de funciones sin servidor a servicios basados en contenedores.', status: 'in-development' },
    { name: 'Cloud SQL administrado', description: 'Transición a un servicio de base de datos relacional administrado.', status: 'planned' },
    { name: 'Infraestructura independiente para la API', description: 'Administración de la nueva API mediante una configuración propia de Terraform.', status: 'in-development' },
    { name: 'Pipeline de CD independiente', description: 'Automatizar el despliegue de cloud-backend-api mediante un flujo de entrega separado del proceso actual de CI.', status: 'planned' },
    { name: 'Verificación postdespliegue', description: 'Incorporar validaciones automatizadas para comprobar la disponibilidad y el funcionamiento de la API después del despliegue.', status: 'planned' },
  ]
};
