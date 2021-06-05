import { AfterViewInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Author } from 'src/app/models/Author';
import { AuthorService } from 'src/app/services/author.service';
import { AuthorEditFormComponent } from '../author-edit-form/author-edit-form.component';
import { AuthorsTableComponent } from '../authors-table/authors-table.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements AfterViewInit {

  AUTHOR_DATA: Author[];
  displayedColumns: string[] = [ 'authorId', 'firstName' ,'lastName','actions'];
  dataSource: MatTableDataSource<Author>;
  author: Author = new Author();

  firstNameFormControl;

  lastNameFormControl;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authorService: AuthorService, public dialog: MatDialog, private snackBar: MatSnackBar) { 
    
  }

  ngAfterViewInit(): void {
    this.getAllAuthors(true);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllAuthors(cached = false) : void{
    this.authorService.getAllAuthors(cached).subscribe(data =>{
    this.AUTHOR_DATA = data;
    this.dataSource = new MatTableDataSource(this.AUTHOR_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
  }

  openRequestDialog(author:Author) : void{
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      height: '150px',
      data: {
        message: "Are you sure you want to delete " + author.firstName + " " + author.lastName +" and all books asociated?",
        buttonText:{
          ok:'Yes',
          cancel:'Cancel'
        }
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      if(confirmed == true){
        this.authorService.deleteAuthor(author.authorId).subscribe(data => 
          {
            this.snackBar.open("Author deleted", "Dismiss", {
              duration: 5000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
          })

          var index = this.AUTHOR_DATA.indexOf(author);
          this.AUTHOR_DATA.splice(index,1);
          this.dataSource._updateChangeSubscription()
      }
    });
  }

  onSubmit(form: NgForm){
    this.authorService.createAuthor(this.author).subscribe(data => {
      console.log(data);
      this.AUTHOR_DATA.push(data);
      this.snackBar.open("Author created", "Dismiss", {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
    })
    form.reset();
  }

  openEditDialog(author: Author){
    let dialogRef = this.dialog.open(AuthorEditFormComponent, {
      width: '400px',
      height: '270px',
      data: author
      },
    );
  }
}
