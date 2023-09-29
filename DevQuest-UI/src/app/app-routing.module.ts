import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'post/:id',
    component: PostDetailsComponent,
  },
  {
    path: 'post/edit/:id',
    component: EditPostComponent,
  },
  {
    path: 'post/comment/edit/:id',
    component: EditCommentComponent,
  },
  {
    path: 'profile/:username',
    component: ProfileComponent,
  },
  {
    path: 'profile/edit/:username',
    component: EditProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
