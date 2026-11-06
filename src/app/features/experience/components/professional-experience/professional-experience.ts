import { Component } from '@angular/core';
import { PROFESSIONAL_EXPERIENCE } from '../../data/professional-experience.data';

@Component({
  selector: 'app-professional-experience',
  standalone: true,
  templateUrl: './professional-experience.html',
  styleUrl: './professional-experience.scss',
})
export class ProfessionalExperienceSection {
  protected readonly experience = PROFESSIONAL_EXPERIENCE;
}
