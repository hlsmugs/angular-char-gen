import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [],
  templateUrl: './roadmap.component.html',
  styleUrl: './roadmap.component.scss',
})
export class RoadmapComponent {
  title: string = 'Roadmap';
  constructor(private readonly titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
