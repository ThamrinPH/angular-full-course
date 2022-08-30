import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('formEle') signupForm: NgForm;
  defaultQuestion = "pet";
  answer = "";
  genders = ['male', 'female'];
  user = {
    username: "",
    email: "",
    secretQuestion: "",
    answer: "",
    gender: "",
  }
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // approacch 1 : setvalue to set the whole form
  //   this.signupForm.setValue({ userData: {
  //     username: suggestedName,
  //     email: ''
  //   },
  //   secret: 'pet',
  //   questionAnswer: 'answered',
  //   gender: 'male'
  //  });
  
    // patch value to override a part of the form
  this.signupForm.form.patchValue({
    userData: {
      username: suggestedName
    }
  })
  }


  onSubmit() {
    if(this.signupForm.invalid) {
      console.log(this.signupForm.errors);
    }
    
    console.log(this.signupForm);
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;
  }

  // onSubmitForm(form: NgForm) {
  //   console.log(form, form.value, form.valid);
  // }
}
