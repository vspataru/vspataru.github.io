import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from 'src/app/models/Author';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.css']
})
export class UserEditFormComponent implements OnInit {

  user: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: User, private userService: UsersService, 
  private dialogRef: MatDialogRef<UserEditFormComponent>, private snack: MatSnackBar, public dialog: MatDialog) { 
    this.user = data;
  }

  ngOnInit(): void {
  }


  onSubmit(){
    this.userService.updateUser(this.user).subscribe(data => {
      this.snack.open("User " + this.user.username+  " was updated", "Dismiss", {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
    });

    this.dialogRef.close();
  }

}
