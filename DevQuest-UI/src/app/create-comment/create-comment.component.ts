import { Component } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css'],
})
export class CreateCommentComponent {
  newComment: Comment = new Comment();
  errorMessage: string = '';
  postId: number = 0;

  constructor(
    private commentService: CommentService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeId = this.actRoute.snapshot.paramMap.get('id');
    this.postId = parseInt(routeId || '0');
  }

  onSubmit(): void {
    this.newComment.username = localStorage.getItem('username')!;
    this.commentService.createComment(this.newComment, this.postId).subscribe(
      (response) => {
        location.reload();
      },
      (error) => {
        console.log(error);
        this.errorMessage = 'Could not create comment, please try again.';
      }
    );
  }
}
