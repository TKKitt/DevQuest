import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { CommentComponent } from './comment/comment.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AlertComponent,
    NavigationComponent,
    PostComponent,
    CreatePostComponent,
    PostDetailsComponent,
    CommentComponent,
    CreateCommentComponent,
    ProfileComponent,
    EditProfileComponent,
    EditPostComponent,
    EditCommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
