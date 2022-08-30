import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ["Chris", "Anna"];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('male', Validators.required),
      'hobbies': new FormArray([])
    });
    /** 
     * There is to observeable you can listen to 
     * statusChanges & valuChanges
     */
    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });
    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    });

    this.signupForm.setValue({
      'userData': {
        'username' : 'layla',
        'email': 'layla.gunner@gmail.com'
      },
      'gender': 'female',
      'hobbies': []
    });

    this.signupForm.patchValue({
      'userData': {
        'username' : 'Ruby',
        'email': 'layla.gunner@gmail.com'
      },
      'gender': 'female',
      'hobbies': []
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  getControls(attribute: string = "hobbies") {
    return (this.signupForm.get(attribute) as FormArray).controls;
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  /**
   * Custom Validation 
   * @param control FormCOntrol
   * @returns boolean | null
   */
  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }

    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>( (resolve, reject) => {
      setTimeout( () => {
        if ( control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        }else{
          resolve(null)
        }
      }, 1500);
    });

    return promise;
  }
}
