import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
  newUser: User = new User();
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const username = this.actRoute.snapshot.paramMap.get('username') || '';
    this.authService.getUserData(username).subscribe(
      (response) => {
        console.log(response);
        this.newUser = response;
      },
      (error) => {
        console.log(error);
        this.errorMessage = 'Could not update user. Please try again';
      }
    );
  }

  onSubmit() {
    this.authService.updateUser(this.newUser).subscribe((response) => {
      console.log(response);
    });
  }
}
