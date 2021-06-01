import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../models/Category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllCategories(cache = true){

    let headers: HttpHeaders;

    if(cache){
      headers = new HttpHeaders({'cache-response': 'true'});
    }

    return this.http.get<Category[]>(this.baseUrl+"categories",{headers});
  }
}
