import { AfterViewInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Author } from 'src/app/models/Author';
import { AuthorService } from 'src/app/services/author.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
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
            this.snackBar.open("test", "Dismiss", {
              duration: 5000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
            this.getAllAuthors();

          })
      }
    });
  }

  onSubmit(){
    
  }
}
