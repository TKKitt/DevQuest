import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = new User();

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.user).subscribe(
      (response) => {
        localStorage.setItem('authToken', response);
        this.authService
          .getUserData(this.user.username)
          .subscribe((response) => {
            localStorage.setItem('username', response.username);
          });
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
        this.errorMessage = 'Invalid credentials, please try again.';
      }
    );
  }
}
