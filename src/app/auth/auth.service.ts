import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localI: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endPoint = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC2RSIpIh4IsMWN4olE-UWzNqxhWLE1GUM";

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(this.endPoint, {
        email: email,
        password: password,
        returnSecureToken: true
      })
  }

  login() {

  }
}
