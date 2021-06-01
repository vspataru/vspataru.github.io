import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
  });
    
    hide = true;    
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        public dialog: MatDialog
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['home/start']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.authenticationService.login(this.loginForm.get('username').value,this.loginForm.get('password').value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/home/start']);
                },
                error => {
                    this.error = error;
                });
    }

    openRegistrationForm() : void{
        let dialogRef = this.dialog.open(RegisterComponent, {
          width: '500px',
          height: '700px'
        });
      }
}