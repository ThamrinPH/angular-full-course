import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './user.model';
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api_key = "AIzaSyC2RSIpIh4IsMWN4olE-UWzNqxhWLE1GUM";
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+this.api_key, {
        email: email,
        password: password,
        returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError)
      );
  }

  login(email: string, password: string) {
    return this.http
    .post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+this.api_key, {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(
        this.handleError        
      ),
      tap( resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      })
    )
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );

    this.user.next(user);
  }

  private handleError( errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occured!";

    if( !errorRes.error || !errorRes.error.error ) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "The email address is already in use by another account.";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "This email does not exists.";
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = "Password sign-in is disabled for this project.";
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
        break;          
      case 'INVALID_PASSWORD':
        errorMessage = "This password is not correct.";
        break;
    }

    return throwError(errorMessage);
  }
}
