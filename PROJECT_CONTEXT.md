# Portafolio de Fernando Elizondo

## Objetivo

Crear el sitio profesional de Fernando Elizondo como desarrollador Full Stack. Esta primera versión establece la identidad visual, la arquitectura Angular y una página principal responsive. Los casos de estudio y cualquier backend quedan para una siguiente etapa.

## Stack

- Angular 22.2, TypeScript 6 estricto y componentes standalone.
- Angular Router con la página de inicio como ruta principal.
- SCSS global y por componente; Tailwind CSS 4 integrado mediante `ng add tailwindcss`.
- Vitest mediante el builder de pruebas de Angular.
- Motion para las animaciones de entrada y aparición en viewport.
- `@lucide/angular` para iconos SVG.
- Node.js 24.21.0 y npm 11.19.0 usados para crear el workspace.

## Arquitectura

```text
src/
  app/
    shared/components/site-header/  Navegación sticky y menú adaptable
    features/
      home/                          Página, datos tipados y estilos de inicio
        home.data.ts                 Contenido estático y tecnologías tipadas
      projects/
        models/project.model.ts      Modelo tipado con enlaces opcionales
        data/projects.data.ts        Datos de los tres proyectos destacados
        components/featured-projects/
                                       Sección y tarjetas destacadas
      experience/
        models/professional-experience.model.ts  Tipos de trayectoria y contribuciones
        data/professional-experience.data.ts     Datos profesionales estáticos tipados
        components/professional-experience/      Sección standalone y estilos
    app.config.ts                    Providers de aplicación y router
    app.routes.ts                    Definición de rutas
    app.ts                            Composición raíz
  styles.scss                        Tokens de color, tipografía y resets
  tailwind.css                       Entrada de Tailwind CSS 4
```

La cabecera concentra el estado del menú móvil y la sección activa. La página de inicio mantiene los grupos de tecnologías como datos tipados y gestiona las animaciones de viewport. No hay componentes separados para piezas de contenido que no requieren estado propio.

El contenido estático de HomePage se centraliza en `features/home/home.data.ts` (`HOME_CONTENT`, `TECHNOLOGY_GROUPS` y `LEARNING_TECHNOLOGIES`). `HomePage` conserva la presentación y las animaciones; no se añadió un servicio para datos constantes. `SiteHeader` expone `aria-current="location"` únicamente en el enlace correspondiente a la sección activa.

La sección de proyectos se integra después de la presentación profesional. `ProfessionalProject` mantiene separados el modelo y los datos, y admite campos opcionales para slug y enlaces de caso de estudio, repositorio o demo. Actualmente no hay URLs configuradas, así que las tarjetas muestran que los casos de estudio están pendientes sin crear enlaces ficticios. SGCM aparece como proyecto principal con cinco detalles de participación; PAPVEH y PAME conservan sus detalles y presentan explícitamente el alcance correspondiente a cada participación. Las tarjetas tienen elevación y escala moderadas al pasar el punter o al recibir foco; el hover solo aplica a dispositivos con puntero preciso y se respeta `prefers-reduced-motion`.

La sección standalone `ProfessionalExperienceSection` se integra después de los proyectos destacados y antes de tecnologías, con el ancla `#experiencia`. Sus datos tipados describen el puesto Full Stack en INAP entre marzo de 2023 y agosto de 2026, tres áreas de contribución, los sistemas SGCM/PAPVEH/PAME, tecnologías profesionales y la etapa acotada de coordinación técnica. La descripción complementa las tarjetas de proyectos sin repetir sus resúmenes.

## Diseño

La dirección visual usa minimalismo oscuro, superficies diferenciadas, bordes azul grisáceos, acentos azules y una composición de código abstracta hecha con HTML y SCSS. No utiliza fotografía ni métricas inventadas. El layout prioriza el contraste, jerarquía de lectura, navegación por anclas y cambios de layout para móvil. Motion y las transiciones se reducen con `prefers-reduced-motion`.

Tokens principales: fondo `#05070B`, fondo secundario `#0A0F18`, superficie `#101827`, borde `#23334D`, primario `#3B82F6`, acento `#38BDF8`, texto `#F4F7FB` y texto secundario `#A6B4C8`.

El presupuesto de estilos por componente se ajustó a 16 kB de advertencia y 20 kB de error porque los estilos responsive del home ocupan 14.14 kB compilados. El presupuesto total inicial se mantiene sin cambios; la salida inicial medida es de unos 354 kB sin comprimir.

## Contenido profesional

La página declara más de tres años de experiencia Full Stack, React, TypeScript, Material UI, Node.js, Express, MySQL y procedimientos almacenados, Jenkins, Docker, PM2, CI/CD, Puppeteer y coordinación de dos desarrolladores durante una etapa específica. Angular, ASP.NET Core, Google Cloud, Terraform, PostgreSQL y GitHub Actions aparecen expresamente como aprendizaje y proyectos personales. Correo y LinkedIn son los únicos canales de contacto publicados.

## Dependencias

Versiones verificadas: Angular `22.2.4`, CLI y build `22.2.5`, TypeScript `6.0.3`, Vitest `5.1.0`, jsdom `30.1.3`, Tailwind CSS y `@tailwindcss/postcss` `4.3.4`, Motion `14.9.0` y `@lucide/angular` `1.67.0`. npm administra dependencias y scripts.

## Estado
 
- Workspace Angular generado directamente en la raíz del proyecto.
- Router, SCSS, standalone, modo estricto, Vitest y Tailwind configurados.
- Cabecera, hero, perfil, proyectos destacados, experiencia profesional, tecnologías y contacto implementados.
- El contenido estático de HomePage está centralizado en `home.data.ts`.
- SiteHeader utiliza `aria-current="location"` para identificar la sección activa.
- SiteHeader incluye el enlace Experiencia a `#experiencia`, observa la sección para actualizar `aria-current` y cierra el menú móvil al seleccionarla.
- La experiencia profesional está organizada en `features/experience/` con modelo, datos tipados, componente standalone y pruebas. Presenta desarrollo de software, proyectos empresariales y liderazgo técnico, diferenciando los últimos seis a ocho meses de coordinación directa.
- Los proyectos destacados están centralizados en `features/projects/data/projects.data.ts`, utilizando el modelo tipado `ProfessionalProject`.
- SGCM se presenta como proyecto principal; PAPVEH y PAME muestran explícitamente el alcance de participación.
- Los enlaces de los proyectos en la experiencia profesional ahora utilizan un tema cian (`rgba(56, 189, 248, 0.12)` para fondo y `#7DD3FC` para texto) con navegación por anclas hacia los IDs de los proyectos.
- La navegación principal es pegajosa (sticky) y mantiene la visibilidad durante el scroll. Se ha configurado `scroll-padding-top` en los estilos globales para asegurar el alineamiento correcto de las anclas.
- Contacto incluye una tarjeta compacta de currículum con enlaces accesibles para descargar las versiones española e inglesa. Los PDF se publican localmente desde `public/documents/cv-fernando-elizondo-es.pdf` y `public/documents/cv-fernando-elizondo-en.pdf`.
- La suite de pruebas (Vitest) y la compilación de producción han sido validadas con éxito.

## Próximas funcionalidades
 
- Añadir casos de estudio cuando se definan proyectos y evidencia verificable.
- Definir estrategia de despliegue y dominio.
- Valorar pruebas de componentes para el menú móvil y la navegación activa.