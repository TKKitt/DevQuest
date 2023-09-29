import { Component } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent {
  newPost: Post = new Post();

  errorMessage: string = '';

  constructor(private postService: PostService) {}

  onSubmit(): void {
    this.newPost.username = localStorage.getItem('username')!;
    this.postService.createPost(this.newPost).subscribe(
      (response) => {
        console.log(response);
        location.reload();
      },
      (error) => {
        console.log(error);
        this.errorMessage = 'Could not create post, please try again.';
      }
    );
  }
}
