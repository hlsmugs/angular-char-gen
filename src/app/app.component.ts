import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './common/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-char-gen';
}
