import { Component } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  isLoggedIn: boolean = false;

  postList: Post[] = [];

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe((response) => {
      this.postList = response;
    });

    this.authService
      .validateToken(localStorage.getItem('authToken') || '')
      .subscribe((response) => {
        this.isLoggedIn = response;
      });
  }
}
