import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { BookEditFormComponent } from '../book-edit-form/book-edit-form.component';
import { Book } from 'src/app/models/Book';
import {BookService} from 'src/app/services/book.service'
import { AuthorService } from 'src/app/services/author.service';
import { Author } from 'src/app/models/Author';
import { FormControl } from '@angular/forms';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';




@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css']
})
export class BooksTableComponent implements OnInit {
  
  BOOKS_DATA: Book[];
  AUTHOR_DATA: Author[];
  authorControl = new FormControl();
  displayedColumns: string[] = ['id', 'title', 'description', 'authors','categories', 'actions'];
  dataSource: MatTableDataSource<Book>;
  deleteConfirmation: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private bookService: BookService, private authorService : AuthorService, private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.getAllBooks();
    this.getAllAuthors();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditDialog(input:Book){

    let dialogRef = this.dialog.open(BookEditFormComponent, {
      width: '400px',
      height: '450px',
      data: {
        bookId: input.bookId,
        description: input.description,
        title: input.title,
        authors: input.authors
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {

      console.log(confirmed);

      if(confirmed){
        this.getAllBooks();
      }
    })
  }


  getAllBooks() : void{
    this.bookService.getAllBooks().subscribe(data =>{
    this.BOOKS_DATA = data;
    this.dataSource = new MatTableDataSource(this.BOOKS_DATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
  }

  getAllAuthors() : void{
    this.authorService.getAllAuthors().subscribe(data => this.AUTHOR_DATA = data);
  }


  openDeleteDialog(bookId) : void{
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      height: '150px',
      data: {
        message: "Are you sure you want to delete?",
        buttonText:{
          ok:'Delete',
          cancel:'Cancel'
        }
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      console.log(confirmed);

      if(confirmed == true){
        this.bookService.deleteBook(bookId).subscribe(response => 
          {this.snackBar.showSnackBar(response),
            this.getAllBooks();
          })
      }
      
    });
  }
}