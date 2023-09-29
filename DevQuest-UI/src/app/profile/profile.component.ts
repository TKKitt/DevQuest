import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  profile: User = new User();
  postList: Post[] = [];
  username = this.actRoute.snapshot.paramMap.get('username');
  formattedDate: string = '';

  isAccountOwner: boolean = false;
  authToken: string = localStorage.getItem('authToken') || '';
  currentUser: string = localStorage.getItem('username') || '';

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUserData(this.username || '').subscribe((response) => {
      this.profile = response;

      const date = new Date(this.profile.createdAt);
      this.formattedDate = date.toLocaleString();

      if (
        this.profile.username === this.currentUser &&
        this.authService.validateToken(this.authToken)
      ) {
        this.isAccountOwner = true;
      }
    });

    this.postService
      .getPostsByUsername(this.username || '')
      .subscribe((response) => {
        this.postList = response;
      });
  }

  editProfile() {
    this.router.navigate(['/profile/edit', this.username]);
  }
}
