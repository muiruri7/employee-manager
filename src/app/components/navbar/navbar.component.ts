import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, NgIf]
})
export class NavbarComponent implements OnInit {
  userName: string = '';

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.updateUserName();
  }

  updateUserName() {
    const user = this.authService.getCurrentUser();
    this.userName = user ? user.fullName : '';
  }

  logout() {
    this.authService.logout();
    this.userName = '';
  }
}
