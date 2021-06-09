import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Author } from 'src/app/models/Author';
import { Book } from 'src/app/models/Book';
import { Category } from 'src/app/models/Category';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-book-edit-form',
  templateUrl: './book-edit-form.component.html',
  styleUrls: ['./book-edit-form.component.css']
  
})

export class BookEditFormComponent implements OnInit {

  book: Book;

  authors: Author[];

  categories: Category[];

  authorsFormControl;

  categoriesFormControl;

  selectedAuthors;

  selectedCategories;



  constructor(@Inject(MAT_DIALOG_DATA) public data: Book, private authorService: AuthorService, 
  private bookService: BookService, private dialogRef: MatDialogRef<BookEditFormComponent>, private categoryService: CategoryService ) { 
    this.book = data
    
    //selects the id's of the authors that will be preselected on the dropdownlist
    this.selectedAuthors = this.book.authors.map(a => a.authorId);
    this.authorsFormControl = new FormControl(this.selectedAuthors);
  }

  ngOnInit(): void {
    this.getAuthorsForChecklist();
    this.getCategoriesForChecklist();
  }


  onSubmit(form: NgForm){
    this.book.title = form.value.title;
    this.book.authors = form.value.authors;
    this.book.description = form.value.description;
    this.book.authors = this.authors.filter(a => this.authorsFormControl.value.includes(a.authorId));  
    // this.book.category = this.categories.find(a => this.categoriesFormControl.value == a.categoryId);
    let response;
    console.log(this.book);
    this.bookService.updateBook(this.book).subscribe(data => response = data);
    console.log(response);
  }

  getAuthorsForChecklist(){
    this.authorService.getAllAuthors(true).subscribe(data => this.authors = data);
  }

  getCategoriesForChecklist(){
    this.categoryService.getAllCategories(true).subscribe(data => this.categories = data);
  }

  onSaveClick(){
    this.dialogRef.close(true);
  }

}
