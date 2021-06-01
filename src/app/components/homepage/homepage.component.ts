import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { Request } from 'src/app/models/Request';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  borrowedBooksRequests: Request[];
  borrowedBooks: Book[];
  currentUser: User;

  constructor(private requestService: RequestsService, private authenticationService: AuthenticationService ) {
    this.borrowedBooks = new Array();
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit(): void {
    this.getApprovedRequests();
  }

  getApprovedRequests(){
    this.requestService.getAllActiveRequests(this.currentUser.userId).subscribe(data =>{
      this.getBooks(data);
    })
  }

  getBooks(input: Request[]){
    console.log(input);
    input.forEach(element => {
      element.requestedBooks.forEach(element => {
        this.borrowedBooks.push(element);
      });
    });
  }

}
