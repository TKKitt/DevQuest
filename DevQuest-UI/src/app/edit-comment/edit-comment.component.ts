import { Component } from '@angular/core';
import { Comment } from '../models/comment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css'],
})
export class EditCommentComponent {
  newComment: Comment = new Comment();
  errorMessage: string = '';
  commentId: number = 0;

  constructor(
    private actRoute: ActivatedRoute,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const routeId = this.actRoute.snapshot.paramMap.get('id');
    this.commentId = parseInt(routeId || '0');

    this.commentService.getCommentById(this.commentId).subscribe((response) => {
      this.newComment = response;
    });
  }

  onSubmit() {
    this.commentService
      .updateComment(this.commentId, this.newComment)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/post/' + this.newComment.postId]);
      });
  }
}
