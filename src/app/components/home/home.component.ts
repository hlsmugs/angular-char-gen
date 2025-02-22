import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import linkboxJson from '../../../../public/json/link-box-content.json';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public title: string = 'Home';
  public linkboxes: any[] = linkboxJson;

  constructor(private readonly titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
