import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from 'src/app/models/Author';
import { AuthorService } from 'src/app/services/author.service';


@Component({
  selector: 'app-author-edit-form',
  templateUrl: './author-edit-form.component.html',
  styleUrls: ['./author-edit-form.component.css']
})
export class AuthorEditFormComponent implements OnInit {

  author: Author;

  firstNameFormControl;

  lastNameFormControl;


  constructor(@Inject(MAT_DIALOG_DATA) public data: Author, private authorService: AuthorService, 
  private dialogRef: MatDialogRef<AuthorEditFormComponent>, private snack: MatSnackBar){
    this.author = data;
  }
   

  ngOnInit(): void {
  }


  onSubmit(){
    this.authorService.updateAuthor(this.author).subscribe(data => {
      this.snack.open(JSON.stringify(data), "Dismiss", {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
    })
  }


}
