import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [
    MatCardModule, 
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule, 
    RouterModule,
    NgIf 
  ]
})
export class SignupComponent {
  user: User = new User();
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.authService.register(this.user)) {
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Email already registered';
    }
  }
}
