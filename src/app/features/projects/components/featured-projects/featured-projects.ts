import { Component, input } from '@angular/core';
import { LucideArrowUpRight } from '@lucide/angular';
import { FEATURED_PROJECTS, PROJECTS_PARTICIPATION_NOTE } from '../../data/projects.data';
import type { ProfessionalProject } from '../../models/project.model';

@Component({
  selector: 'app-featured-projects',
  standalone: true,
  imports: [LucideArrowUpRight],
  templateUrl: './featured-projects.html',
  styleUrl: './featured-projects.scss',
})
export class FeaturedProjects {
  protected readonly projects = input<readonly ProfessionalProject[]>(FEATURED_PROJECTS);
  protected readonly participationNote = PROJECTS_PARTICIPATION_NOTE;
}
