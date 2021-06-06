import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Request } from 'src/app/models/Request';
import { RequestsService } from 'src/app/services/requests.service';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-request-administration',
  templateUrl: './request-administration.component.html',
  styleUrls: ['./request-administration.component.css']
})
export class RequestAdministrationComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  ACTIVE_REQUESTS: Request[] = [];
  ALL_REQUESTS: Request[] = [];

  constructor(private requestService : RequestsService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.getHistoricRequests();
  }

  getHistoricRequests(){
    this.requestService.getAllRequests().subscribe(data =>{
      this.ALL_REQUESTS = data;
      this.ACTIVE_REQUESTS = data.filter(request => request.active == true && request.approved == null)
    })
  }

  approveRequest(requestId){
    this.requestService.approveRequest(requestId).subscribe(data => {
      this.snack.open(data, "Dismiss", {
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      },
      error =>{
        this.snack.open("Something went wrong", "Dismiss", {
          duration: 7000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        return;
      }
  
    )
    this.removeReqFromActiveArray(requestId);
  }

  rejectRequest(requestId){
    this.requestService.rejectRequest(requestId).subscribe(data => {
      this.snack.open(data, "Dismiss", {
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
    },
    error =>{
      this.snack.open("Something went wrong", "Dismiss", {
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }
    )
    this.removeReqFromActiveArray(requestId);
  }

  reactivateRequest(requestId){
    this.requestService.reactivateRequest(requestId).subscribe(data =>{
      this.snack.open(data, "Dismiss", {
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      this.getHistoricRequests();
    },
    error =>{
      this.snack.open("Something went wrong", "Dismiss", {
        duration: 7000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
      return;
    }
    );
  }


  private removeReqFromActiveArray(requestId){
    var index;

    for(var i = 0; i<this.ACTIVE_REQUESTS.length; i++){
      if(this.ACTIVE_REQUESTS[i].requestID == requestId){
        index = i;
        break;
      }
    }

    this.ACTIVE_REQUESTS.splice(index,1);
  }

  private removeReqFromHistoryArray(requestId){
    var index;

    for(var i = 0; i<this.ALL_REQUESTS.length; i++){
      if(this.ACTIVE_REQUESTS[i].requestID == requestId){
        index = i;
        break;
      }
    }

    this.ALL_REQUESTS.splice(index,1);
  }

}
