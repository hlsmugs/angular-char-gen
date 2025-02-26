import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  isHome?: boolean;
  constructor(private router: Router){
    router.events.subscribe((evt) => {
      if(evt instanceof NavigationEnd && this.router.url == '/'){
        this.isHome = true;
      } else {
        this.isHome = false;
      }
    });
  }
}
