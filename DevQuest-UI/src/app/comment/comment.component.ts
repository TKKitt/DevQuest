import { Component, Input } from '@angular/core';
import { Comment } from '../models/comment.model';
import { CommentService } from '../services/comment.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  @Input() comment: Comment = new Comment();

  isAuthor: boolean = false;
  isLoggedIn: boolean = false;

  authToken: string = localStorage.getItem('authToken') || '';

  formattedDate: string = '';

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const date = new Date(this.comment.createdAt);
    this.formattedDate = date.toLocaleString();

    const username = localStorage.getItem('username');
    if (username === this.comment.username) {
      this.isAuthor = true;
    }

    this.authService.validateToken(this.authToken).subscribe((response) => {
      this.isLoggedIn = response;
    });
  }

  deleteComment(): void {
    this.commentService.deleteComment(this.comment.id).subscribe((response) => {
      if (response === null) {
        console.log('Post deleted successfully');
        location.reload();
      }
    });
  }

  editComment(): void {}
}
