import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Request } from '../models/Request';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllRequests(){
    return this.http.get<Request[]>(this.baseUrl+"/requests");
  }


  getAllRequestsByUser(userId:any,cache = false){
    let headers: HttpHeaders;

    
    if(cache){
      headers = new HttpHeaders({'cache-response': 'true'});
    }

    return this.http.get<Request[]>(this.baseUrl+"/requests/"+userId,{headers});

  }

  getAllActiveRequestsByUser(userId:any,cache = false){
    let headers: HttpHeaders;

    if(cache){
      headers = new HttpHeaders({'cache-response': 'true'});
    }

    return this.http.get<Request[]>(this.baseUrl+"/requests/active/"+userId,{headers});

  }

  getAllActiveRequests(){
    return this.http.get<Request[]>(this.baseUrl+"/requests/active");
  }

  createRequest(request:Request){

    return this.http.post<Request>(this.baseUrl+"/requests/add",request);
  }

  cancelRequest(requestId: any){
    return this.http.put(this.baseUrl+"/requests/cancel/"+requestId,null);  
  }

  approveRequest(requestId: any){
    return this.http.put(this.baseUrl+"/requests/approve/"+requestId,null,{responseType:'text'});
  }

  rejectRequest(requestId: any){
    return this.http.put(this.baseUrl+"/requests/reject/"+requestId,null,{responseType:'text'});
  }

  reactivateRequest(requestId: any){
    return this.http.put(this.baseUrl+"/requests/reactivate/"+requestId,null,{responseType:'text'})
  }

}
