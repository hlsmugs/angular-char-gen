import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { NavigationComponent } from './common/navigation/navigation.component';
import { FooterComponent } from './common/footer/footer.component';
import { DrawerComponent } from './common/drawer/drawer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    NavigationComponent,
    FooterComponent,
    DrawerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-char-gen';
  // isHome?: boolean;
  // constructor(private router: Router) {
  //   this.onPageChange();
  // }

  // onPageChange() {
  //   this.router.events.subscribe((evt) => {
  //     if (evt instanceof NavigationEnd && this.router.url == '/') {
  //       this.isHome = true;
  //     } else {
  //       this.isHome = false;
  //     }
  //   });
  //   console.log(this.isHome);
  // }
}
