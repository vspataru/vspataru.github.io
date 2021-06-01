import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../models/Request';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  baseUrl: string = "http://localhost:8080/api/";

  constructor(private http: HttpClient) { }


  getAllRequests(userId:any,cache = false){
    let headers: HttpHeaders;

    if(cache){
      headers = new HttpHeaders({'cache-response': 'true'});
    }

    return this.http.get<Request[]>(this.baseUrl+"requests/"+userId,{headers});

  }

  getAllActiveRequests(userId:any,cache = false){
    let headers: HttpHeaders;

    if(cache){
      headers = new HttpHeaders({'cache-response': 'true'});
    }

    return this.http.get<Request[]>(this.baseUrl+"requests/active/"+userId,{headers});

  }

  createRequest(request:Request){

    return this.http.post<Request>(this.baseUrl+"requests/add",request);
  }

  cancelRequest(requestId: any){
    return this.http.put(this.baseUrl+"requests/cancel/"+requestId,null);  
  }

}
