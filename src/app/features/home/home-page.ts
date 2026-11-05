import { AfterViewInit, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { animate, inView } from 'motion';
import { LucideArrowDown, LucideArrowUpRight, LucideCheck, LucideCodeXml, LucideLayers3, LucideMail } from '@lucide/angular';

interface SkillGroup {
  category: string;
  note: string;
  technologies: string[];
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LucideArrowDown, LucideArrowUpRight, LucideCheck, LucideCodeXml, LucideLayers3, LucideMail],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements AfterViewInit {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly skillGroups: SkillGroup[] = [
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
  ];

  protected readonly learning = ['Angular', 'ASP.NET Core', 'Google Cloud', 'Terraform', 'PostgreSQL', 'GitHub Actions'];

  ngAfterViewInit(): void {
    const host = this.host.nativeElement;
    const cleanups: Array<() => void> = [];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reducedMotion) {
      const hero = host.querySelector('[data-hero]') as HTMLElement | null;
      if (hero) {
        animate(hero, { opacity: [0, 1], y: [12, 0] }, { duration: 0.75, ease: 'easeOut' });
      }

      const stopObserving = inView('[data-reveal]', (element) => {
        animate(element, { opacity: [0, 1], y: [18, 0] }, { duration: 0.65, ease: 'easeOut' });
      }, { amount: 0.12 });
      cleanups.push(stopObserving);
    }

    this.destroyRef.onDestroy(() => cleanups.forEach((cleanup) => cleanup()));
  }
}
