import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  datasource: string = 'http://localhost:5128/comment';

  currentUsername: string = localStorage.getItem('username') || '';

  constructor(private http: HttpClient) {}

  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(this.datasource + '/' + id);
  }

  getCommentsByPostId(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.datasource + '?postId=' + postId);
  }

  createComment(comment: Comment, postId: number) {
    return this.http.post(
      this.datasource +
        '?username=' +
        this.currentUsername +
        '&postId=' +
        postId,
      comment
    );
  }

  deleteComment(id: number) {
    return this.http.delete(this.datasource + '/' + id);
  }

  updateComment(id: number, edittedComment: Comment) {
    return this.http.put(this.datasource + '/' + id, edittedComment);
  }
}
