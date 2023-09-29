import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  newUser: User = new User();
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.newUser).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
        this.errorMessage = 'Registration failed. Please try again';
      }
    );
  }
}
