import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

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

    this.isLoading = true;
    if (this.isLoginMode) {
      return;
    }else{
      this.authSubscription = this.authService.signUp(formData.email, formData.password)
        .subscribe( responseData => {
          console.log(responseData);
          this.loginForm.reset();
          this.isLoading = false;
        }, error => {
          console.log(error.error.error)
          this.error = error.message;
          this.isLoading = false;
        });
    }
      
      
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
