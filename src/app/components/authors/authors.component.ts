import { AfterViewInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Author } from 'src/app/models/Author';
import { Book } from 'src/app/models/Book';
import { Request } from 'src/app/models/Request';
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


  constructor(private authorService: AuthorService, public dialog: MatDialog, private snackBar: SnackBarService) { 
    
  }

  ngAfterViewInit(): void {
    this.getAllBooks();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllBooks() : void{
    this.authorService.getAllAuthors().subscribe(data =>{
    this.AUTHOR_DATA = data;
    this.dataSource = new MatTableDataSource(this.AUTHOR_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
  }

  openRequestDialog(book:Book) : void{
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      height: '150px',
      data: {
        message: "Are you sure you want to create a request for " + book.title +"?",
        buttonText:{
          ok:'Yes',
          cancel:'Cancel'
        }
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      let newRequest : Request = new Request();
      newRequest.active = true;
      newRequest.requestedDate = Date.now();
      newRequest.requestedBooks = [book];

    
      // if(confirmed == true){
      //   this.requestsService.createRequest(newRequest).subscribe(data => 
      //     {
      //       this.snackBar.showSnackBar("The request has been created.")
      //     })
      // }
      
    });
  }

  onSubmit(){
    
  }
}
