import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideArrowUpRight } from '@lucide/angular';
import { CLOUD_BACKEND_LAB_DATA } from '../../../case-studies/data/cloud-backend-lab.data';

@Component({
  selector: 'app-personal-projects',
  standalone: true,
  imports: [RouterLink, LucideArrowUpRight],
  templateUrl: './personal-projects.html',
  styleUrl: './personal-projects.scss',
})
export class PersonalProjects {
  protected readonly project = CLOUD_BACKEND_LAB_DATA;
  protected readonly description =
    'Laboratorio personal enfocado en desarrollo backend, diseño de APIs REST, automatización CI/CD e infraestructura en Google Cloud.';
}
