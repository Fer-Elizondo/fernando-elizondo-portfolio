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
    features/home/                  Página, datos tipados y estilos de inicio
      home.data.ts                  Contenido estático y tecnologías tipadas
    app.config.ts                   Providers de aplicación y router
    app.routes.ts                   Definición de rutas
    app.ts                          Composición raíz
  styles.scss                       Tokens de color, tipografía y resets
  tailwind.css                      Entrada de Tailwind CSS 4
```

La cabecera concentra el estado del menú móvil y la sección activa. La página de inicio mantiene los grupos de tecnologías como datos tipados y gestiona las animaciones de viewport. No hay componentes separados para piezas de contenido que no requieren estado propio.

El contenido estático de la página se centraliza en `features/home/home.data.ts` (`HOME_CONTENT`, `TECHNOLOGY_GROUPS` y `LEARNING_TECHNOLOGIES`). `HomePage` conserva la presentación y las animaciones; no se añadió un servicio para datos constantes. `SiteHeader` expone `aria-current="location"` únicamente en el enlace correspondiente a la sección activa.

## Diseño

La dirección visual usa minimalismo oscuro, superficies diferenciadas, bordes azul grisáceos, acentos azules y una composición de código abstracta hecha con HTML y SCSS. No utiliza fotografía ni métricas inventadas. El layout prioriza el contraste, jerarquía de lectura, navegación por anclas y cambios de layout para móvil. Motion y las transiciones se reducen con `prefers-reduced-motion`.

Tokens principales: fondo `#05070B`, fondo secundario `#0A0F18`, superficie `#101827`, borde `#23334D`, primario `#3B82F6`, acento `#38BDF8`, texto `#F4F7FB` y texto secundario `#A6B4C8`.

El presupuesto de estilos por componente se ajustó a 16 kB de advertencia y 20 kB de error porque los estilos responsive del home ocupan 14.14 kB compilados. El presupuesto total inicial se mantiene sin cambios; la salida inicial medida es de unos 354 kB sin comprimir.

## Contenido profesional

La página declara más de tres años de experiencia Full Stack, React, TypeScript, Material UI, Node.js, Express, MySQL y procedimientos almacenados, Jenkins, Docker, PM2, CI/CD, Puppeteer y coordinación de tres desarrolladores. Angular, ASP.NET Core, Google Cloud, Terraform, PostgreSQL y GitHub Actions aparecen expresamente como aprendizaje y proyectos personales. Correo y LinkedIn son los únicos canales de contacto publicados.

## Dependencias

Versiones verificadas: Angular `22.2.4`, CLI y build `22.2.5`, TypeScript `6.0.3`, Vitest `5.1.0`, jsdom `30.1.3`, Tailwind CSS y `@tailwindcss/postcss` `4.3.4`, Motion `14.9.0` y `@lucide/angular` `1.67.0`. npm administra dependencias y scripts.

## Estado

- Workspace Angular generado directamente en la raíz del proyecto.
- Router, SCSS, standalone, modo estricto, Vitest y Tailwind configurados.
- Cabecera, hero, perfil, tecnologías, nota de proyectos y contacto implementados.
- Antes de esta iteración, el build de producción pasó con `npm run build`.
- Antes de esta iteración, Vitest aprobó una prueba de configuración de rutas con `npm test -- --watch=false`.
- `ng serve` inició en `http://127.0.0.1:4200/` y devolvió HTTP 200.
- Tailwind generó `.sr-only` en el CSS de producción.
- Motion está integrado en la entrada del hero y las apariciones por viewport, respetando `prefers-reduced-motion`.
- Esta iteración deja 12 pruebas definidas en total: la prueba previa de rutas más 5 pruebas de HomePage y 6 de SiteHeader. Cubren creación, contenido desde los datos, secciones, navegación, control del menú móvil y `aria-current`. Motion y las APIs del navegador se aíslan con mocks de prueba; las animaciones de producción siguen intactas. La ejecución de estas 12 pruebas está pendiente.
- Build y pruebas de esta iteración están pendientes de ejecución: npm no inicia porque el entorno indica que no hay una versión activa de Node.js.

## Próximas funcionalidades

- Añadir casos de estudio cuando se definan proyectos y evidencia verificable.
- Revisar y publicar el CV descargable si Fernando proporciona el archivo.
- Definir estrategia de despliegue y dominio.
- Valorar pruebas de componentes para el menú móvil y la navegación activa.
