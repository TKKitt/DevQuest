import { Component } from '@angular/core';
import { Post } from '../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent {
  formattedDate: string = '';
  routeId: string = '';
  post: Post = new Post();
  commentList: Comment[] = [];
  isLoggedIn: boolean = false;

  constructor(
    private actRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.routeId = this.actRoute.snapshot.paramMap.get('id') || '';
    const postId = parseInt(this.routeId);
    this.postService.getPostById(postId).subscribe((response) => {
      this.post = response;
    });

    this.commentService.getCommentsByPostId(postId).subscribe((response) => {
      this.commentList = response;
    });

    this.authService
      .validateToken(localStorage.getItem('authToken')!)
      .subscribe((response) => {
        this.isLoggedIn = response;
      });
  }
}
