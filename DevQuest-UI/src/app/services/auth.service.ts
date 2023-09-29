import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  datasource: string = 'http://localhost:5128/api/auth';
  loginEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  logoutEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  public register(user: User): Observable<any> {
    return this.http.post(this.datasource + '/register', user);
  }

  public login(user: User): Observable<string> {
    return this.http.post(this.datasource + '/login', user, {
      responseType: 'text',
    });
  }

  public logout(): void {
    this.logoutEvent.emit(true);
  }

  public getUserData(username: string): Observable<User> {
    return this.http
      .get<User>(this.datasource + '/user?username=' + username)
      .pipe(
        tap((user: User) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
        })
      );
  }

  public validateToken(token: string): Observable<boolean> {
    return this.http.get<boolean>(
      this.datasource + '/validateToken?token=' + token
    );
  }

  public updateUser(user: User): Observable<any> {
    return this.http.put(this.datasource + '/' + user.id, user);
  }
}
