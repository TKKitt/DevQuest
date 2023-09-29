import { Component } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent {
  newPost: Post = new Post();
  postId: number = 0;
  errorMessage: string = '';

  constructor(
    private postService: PostService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const routeId = this.actRoute.snapshot.paramMap.get('id');
    this.postId = parseInt(routeId || '0');

    this.postService.getPostById(this.postId).subscribe((response) => {
      this.newPost = response;
    });
  }

  onSubmit() {
    this.postService
      .editPost(this.postId, this.newPost)
      .subscribe((response) => {
        console.log(response);
        this.router.navigate(['/post/' + this.postId]);
      });
  }
}
