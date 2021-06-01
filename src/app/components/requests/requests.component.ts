import { Component, OnInit} from '@angular/core';
import { RequestsService } from 'src/app/services/requests.service';
import {Request} from 'src/app/models/Request';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  REQ_DATA_ACTIVE: Request[];
  REQ_DATA_HISTORY: Request[];
  currentUser: User;
  
  constructor(private requestService: RequestsService, private authenticationService: AuthenticationService ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.getAllRequests();
  }


  //to add implementation of userID 
  getAllRequests(cache = false) : void{
    this.requestService.getAllRequests(this.currentUser.userId,cache).subscribe(data =>{
    this.REQ_DATA_HISTORY = data;
    this.REQ_DATA_ACTIVE = this.REQ_DATA_HISTORY.filter(item => item.active == true);
  })
  }

  cancelRequest(requestId: any){
    this.requestService.cancelRequest(requestId).subscribe(data =>{
      console.log(data);
    })
    location.reload();
  }

}

