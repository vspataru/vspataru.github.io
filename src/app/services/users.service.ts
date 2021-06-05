import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getAllUsers(){
    return this.http.get<User[]>(this.baseUrl+"/users");
  }

  updateUser(user: User){
    return this.http.put(this.baseUrl+"/users",user);
  }

  deleteUser(userId){
    return this.http.delete(this.baseUrl+"/users/"+userId);
  }
}
