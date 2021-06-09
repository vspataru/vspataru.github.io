import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Author } from 'src/app/models/Author';
import { Book } from 'src/app/models/Book';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { BookEditFormComponent } from '../book-edit-form/book-edit-form.component';
import { BooksTableComponent } from '../books-table/books-table.component';



@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})


export class BooksComponent implements OnInit {

  bookToCreate: Book = new Book();

  AUTHOR_DATA: Author[];

  authorsFormControl = new FormControl();

  @ViewChild(BooksTableComponent) table: BooksTableComponent

  constructor(private authorService: AuthorService, private bookService: BookService, private snack: MatSnackBar) {


  }

  ngOnInit(): void {
    this.getAllAuthors();
  }

  onSubmit(form: NgForm){

    this.bookToCreate.bookId = null;
    if(this.authorsFormControl.value != null){
      this.bookToCreate.authors = this.AUTHOR_DATA.filter(a => this.authorsFormControl.value.includes(a.authorId));  
    }
    
    let response;
    this.bookService.addBook(this.bookToCreate).subscribe(data => data = response);

    this.snack.open(this.bookToCreate.title + " has been created", "Dismiss", {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });

    form.reset();
    this.authorsFormControl.reset();
    
    this.table.getAllBooks();
  }

  getAllAuthors() : void{
    this.authorService.getAllAuthors(true).subscribe(data => this.AUTHOR_DATA = data);
  }

}

