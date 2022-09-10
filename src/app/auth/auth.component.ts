import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = false;
  loginForm: FormGroup;
  email: string;
  password: string;
  authSubscription: Subscription;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(this.email, [Validators.required, Validators.email]),
      'password': new FormControl(this.password, [Validators.required, Validators.minLength(6)])
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    const formData = this.loginForm.value;
    
    if (!this.loginForm.valid) {
      return;
    }

    let authObs: Observable<AuthResponseData>

    this.isLoading = true;
    this.error = null;
    if (this.isLoginMode) {
      authObs = this.authService.login(formData.email, formData.password);
    }else{
      authObs = this.authService.signUp(formData.email, formData.password);
    }
      
    authObs.subscribe(
      responseData => {
        console.log(responseData);
        this.loginForm.reset();
        this.isLoading = false;
      }, errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
      
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
