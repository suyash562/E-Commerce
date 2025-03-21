import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // user : User | undefined;

  constructor(private http : HttpClient) {}
  
  // addUser(user: any){
  //   this.users.push(user);
  // }
  // getCurrentUserEmail(){
  //   return JSON.parse(localStorage.getItem('currentUser')!)?.email;
  // }
  login(user : Partial<User>){            
    return this.http.post<User>("http://localhost:3200/user/login", {'email' : user.email, 'password' : user.password});
  }
  
  logout(){
    // this.user = undefined;
    localStorage.removeItem('USER-TOKEN');
  }
  isLoggedIn(){
    if(localStorage.getItem('USER-TOKEN')){
      return true;
    }
    return false;
  }
  getUserToken(){
    return localStorage.getItem('USER-TOKEN');
  }
}

