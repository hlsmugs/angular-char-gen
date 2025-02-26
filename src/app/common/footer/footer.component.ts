import { Component } from '@angular/core';
import { VersionService } from '../../services/version.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  buildDate?: string;
  constructor(private versionService: VersionService) {
    this.buildDate = versionService.getBuildDate();
  }
}
