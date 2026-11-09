import { Component } from '@angular/core';
import { LucideAward, LucideBadgeCheck, LucideGraduationCap } from '@lucide/angular';

@Component({
  selector: 'app-education-section',
  standalone: true,
  imports: [LucideAward, LucideBadgeCheck, LucideGraduationCap],
  templateUrl: './education-section.html',
  styleUrl: './education-section.scss',
})
export class EducationSection {}
