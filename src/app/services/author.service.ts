import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Author } from '../models/Author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  baseUrl: string = "http://localhost:8080/api/";

  constructor(private http: HttpClient) { }

  getAllAuthors(cache = true){

    let headers: HttpHeaders;

    if(cache){
      headers = new HttpHeaders({'cache-response': 'true'});
    }

    return this.http.get<Author[]>(this.baseUrl+"authors",{headers});
  }
}
