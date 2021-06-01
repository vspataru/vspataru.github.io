import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Author } from '../models/Author';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllAuthors(cache = true){

    let headers: HttpHeaders;

    if(cache){
      headers = new HttpHeaders({'cache-response': 'true'});
    }

    return this.http.get<Author[]>(this.baseUrl+"/authors",{headers});
  }
}
