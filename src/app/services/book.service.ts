import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../models/Book';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl: string = environment.apiUrl;

  constructor( private http: HttpClient) { }



getAllBooks(cache = false){
  let headers: HttpHeaders;

  if(cache){
    headers = new HttpHeaders({'cache-response': 'true'});
  }

  return this.http.get<Book[]>(this.baseUrl + "/books",{headers});
}

updateBook(book:Book) : Observable<Book>{
  return this.http.put<Book>(this.baseUrl+ "/books", book);
}

addBook(book: Book) : Observable<Book>{
  return this.http.post<Book>(this.baseUrl+"/books",book);
}

deleteBook(bookID: any){
  return this.http.delete(this.baseUrl+"/books/"+bookID, {responseType: 'text'});
}

}
