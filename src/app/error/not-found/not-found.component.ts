import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  public title: string = '404 Error: Page Not Found';
  constructor(private readonly titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
