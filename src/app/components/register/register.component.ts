import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomValidators } from 'src/app/custom-validators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registrationForm: FormGroup;

  hide = true;

  constructor(private fb: FormBuilder,@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<DeleteDialogComponent>, private authenticationService: AuthenticationService) { 
    this.registrationForm = this.createSignupForm();
  }

  ngOnInit(): void {
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {

        username: [null,Validators.required],
        firstName: [null,Validators.required],
        lastName: [null,Validators.required],
        emailAddress: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(8)
          ])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  registerUser(){

    if(!this.registrationForm.valid){
      console.log("form error")
      return;
    }

    console.log(this.registrationForm.value)

    this.authenticationService.register(this.registrationForm.value).subscribe(data =>{
      console.log(data);
    })

    this.dialogRef.close();

  }


}
