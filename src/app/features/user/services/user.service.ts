import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Product } from '../../product/model/product';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users : User[] = [];
  constructor() {
    console.log('user service instance');
    if(!localStorage.getItem('users')){
      localStorage.setItem('users', JSON.stringify([] as User[]));
    }
    this.users = JSON.parse(localStorage.getItem('users')!) ?? [];
  }
  
  // addUser(user: any){
  //   this.users.push(user);
  // }
  getCurrentUser(){
    return JSON.parse(localStorage.getItem('currentUser')!).email;
  }
  login(user : Partial<User>){
    localStorage.setItem('currentUser' , JSON.stringify({email : user.email!, role : user.email === 'admin@gmail.com' ? 'admin' : 'user'}));
    this.users = JSON.parse(localStorage.getItem('users')!);
    this.users.push({...user, name : 'abc', contact: '9876543021', bill : 0 , userCart : []} as User);
    
    localStorage.setItem('users' , JSON.stringify(this.users));
  
    return true;
  }
  getUser(email : string){
    // this.users = JSON.parse(localStorage.getItem('users')!);
    // let userCart = this.users.find((user) => user.email == email)?.userCart;
    return this.users.find((user) => user.email == email);
  }
  setUser(email : string, updatedUser : User){
    console.log(this.users.length);
    for (let i = 0; i < this.users.length; i++) {
      if(this.users[i].email === email){
        this.users[i] = updatedUser;
        localStorage.setItem('users' , JSON.stringify(this.users));
        // return true;
      }
    }
    // return false;
  }
  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('users');
    localStorage.setItem('users', JSON.stringify([] as User[]));
    // this.users = [];
  }
}

