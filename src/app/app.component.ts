import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component'
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavbarComponent,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'employee-manager';
  showNavbar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log("Current Route:", event.url); 
        this.showNavbar = !(event.url.startsWith('/login') || event.url.startsWith('/signup'));
      }
    });
  }
}
