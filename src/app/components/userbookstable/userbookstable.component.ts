import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Book } from 'src/app/models/Book';
import { Request } from 'src/app/models/Request';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookService } from 'src/app/services/book.service';
import { RequestsService } from 'src/app/services/requests.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-userbookstable',
  templateUrl: './userbookstable.component.html',
  styleUrls: ['./userbookstable.component.css']
})
export class UserbookstableComponent implements AfterViewInit {
  BOOKS_DATA: Book[];
  displayedColumns: string[] = [ 'title', 'authors' ,'categories','availability','actions'];
  dataSource: MatTableDataSource<Book>;
  currentUser: User;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private bookService: BookService, private requestsService: RequestsService, public dialog: MatDialog, private snackBar: SnackBarService,
    private authenticationService: AuthenticationService) { 

      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
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
    this.bookService.getAllBooks(true).subscribe(data =>{
    this.BOOKS_DATA = data;
    this.dataSource = new MatTableDataSource(this.BOOKS_DATA);
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
      newRequest.requester = this.currentUser;

    
      if(confirmed == true){
        this.requestsService.createRequest(newRequest).subscribe(data => 
          {
            this.snackBar.showSnackBar("The request has been created.")
          })
      }
      
    });
  }
}

