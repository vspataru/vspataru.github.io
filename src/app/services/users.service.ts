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

  createUser(user: User){
    return this.http.post<User>(this.baseUrl+"/users/create",user);
  }

  generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

}
