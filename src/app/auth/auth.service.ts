import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localI: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api_key = "AIzaSyC2RSIpIh4IsMWN4olE-UWzNqxhWLE1GUM";

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+this.api_key, {
        email: email,
        password: password,
        returnSecureToken: true
        }
      )
      .pipe(catchError(errorRes => {
        let errorMessage = "An unknown error occured!";
        if( !errorRes.error || !errorRes.error.error ) {
          return throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = "The email address is already in use by another account.";
            break;
          case 'OPERATION_NOT_ALLOWED':
            errorMessage = "Password sign-in is disabled for this project.";
            break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = "We have blocked all requests from this device due to unusual activity. Try again later.";
            break;          
          default:
            errorMessage = errorRes.message;
            break;
        }

        return throwError(errorMessage);
      }))
  }

  login(email: string, password: string) {
    return this.http
    .post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+this.api_key, {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
  }
}
