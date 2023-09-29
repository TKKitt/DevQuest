import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  isLoggedIn: boolean = false;
  username: string = localStorage.getItem('username') || '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService
      .validateToken(localStorage.getItem('authToken') || '')
      .subscribe((response) => {
        this.isLoggedIn = response;
      });
  }
}
