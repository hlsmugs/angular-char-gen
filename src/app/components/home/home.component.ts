import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public title: string = 'Home';
  constructor(private readonly titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
