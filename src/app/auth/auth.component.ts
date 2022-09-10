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

    if (this.isLoginMode) {
      return;
    }else{
      this.authSubscription = this.authService.signUp(formData.email, formData.password)
        .subscribe( responseData => {
          console.log(responseData);
          this.loginForm.reset();
        }, error => {
          console.log(error, error.message);
        });
    }
      
      
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
