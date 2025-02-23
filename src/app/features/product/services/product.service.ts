import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { UserService } from '../../user/services/user.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _productsArray  : Product[]= [];
  private _selectedProductNameSubject : BehaviorSubject<string> = new BehaviorSubject("");

  constructor(private userService : UserService){
    this._productsArray.push({id:1, name:'Dell Inspiron',category: 'Laptop',price:40000, rating : 7,url : 'dell.jpg'});
    this._productsArray.push({id:2, name:'Logitech Keyboard',category: 'Appliances',price:20000, rating : 6, url : 'keyboard.jpg'});
    this._productsArray.push({id:3, name:'Mouse',category: 'Appliances',price:2000, rating : 4, url : 'mouse.jpg'});
    this._productsArray.push({id:4, name:'Samsung S23 FE',category: 'Mobile',price:40000, rating : 8, url : 'samsung.jpg'});
  }

  get productArray() : Product[] {
    return this._productsArray;
  }
  get selectedProductNameSubject(){
    return this._selectedProductNameSubject;
  }
  addProduct(product : Product){
    this._productsArray.push({...product, ...{id : this._productsArray.length+1}});
    return true;
  }
  addToCart(email : string, product : Product){
    try{
      // let success : boolean = false;
      let user = this.userService.getUser(email);
      if(!user){
        return false;
      }
      // let users : User[]= JSON.parse(localStorage.getItem('users')!) ?? [];

      // users.forEach((user) => {
      //   if(user.email == email){
      //     const productIndex = user.userCart.findIndex((existingProduct)=> existingProduct.id === product.id);
      //     if(productIndex != -1){
        //       user.userCart[productIndex].quantity++;
        //     }
        //     else{
          //       user.userCart.push(product);
          //     }
          //     success = true;
          //   }
          // });
      const productIndex = user.userCart.findIndex((existingProduct)=> existingProduct.id === product.id);
      if(productIndex == -1){
        user.userCart.push({...product, quantity : 1});
        user.bill += product.price;
        this.userService.setUser(email, user);
        return true;
      }
      return false;
    }
    catch(error){
      console.log(error);
      return false;
    }
  }
}
