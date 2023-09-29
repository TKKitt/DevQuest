import { Component, Input } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  @Input() post: Post = new Post();

  isAuthor: boolean = false;
  isLoggedIn: boolean = false;

  authToken: string = localStorage.getItem('authToken') || '';

  formattedDate: string = '';

  username: string = localStorage.getItem('username') || '';
  postId: number = 0;
  constructor(
    private postService: PostService,
    private authService: AuthService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.username === this.post.username) {
      this.isAuthor = true;
    }
    this.authService.validateToken(this.authToken).subscribe((response) => {
      this.isLoggedIn = response;
    });

    const date = new Date(this.post.createdAt);
    this.formattedDate = date.toLocaleString();
  }

  deletePost() {
    this.postService.deletePost(this.post.id).subscribe((response) => {
      if (response === null) {
        console.log('Post deleted successfully');
        location.reload();
      }
    });
  }

  editPost() {}

  shouldRenderViewButton(): boolean {
    const currentId = this.actRoute.snapshot.paramMap.get('id');
    return currentId !== this.post.id.toString();
  }
}
