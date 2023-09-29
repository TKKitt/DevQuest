import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  datasource: string = 'http://localhost:5128/post';

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.datasource);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(this.datasource + '/' + id);
  }

  createPost(post: Post) {
    return this.http.post(this.datasource + '?username=' + post.username, post);
  }

  deletePost(id: number) {
    return this.http.delete(this.datasource + '/' + id);
  }

  editPost(id: number, edittedPost: Post) {
    return this.http.put(this.datasource + '/' + id, edittedPost);
  }

  getPostsByUsername(username: string): Observable<Post[]> {
    return this.http.get<Post[]>(this.datasource + '/username/' + username);
  }
}
