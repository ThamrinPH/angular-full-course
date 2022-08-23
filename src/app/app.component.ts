import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('formEle') signupForm: NgForm;

  suggestUserName() {
    const suggestedName = 'Superuser';
  }

  onSubmit() {
    if(this.signupForm.invalid) {
      console.log(this.signupForm.errors);
    }
    
    console.log(this.signupForm);
    
  }

  // onSubmitForm(form: NgForm) {
  //   console.log(form, form.value, form.valid);
  // }
}
