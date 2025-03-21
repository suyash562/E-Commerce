import { Injectable } from '@angular/core';
import { Product } from '../entity/product';
import { UserService } from '../../user/services/user.service';
import { BehaviorSubject, catchError, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private _productsArray  : Product[]= [];
  private _categories : string[] = [];
  private _selectedProductNameSubject : BehaviorSubject<string> = new BehaviorSubject("");

  constructor(private userService : UserService, private http : HttpClient){
    // this._productsArray.push({id:1, name:'Dell Inspiron',category: 'Laptop',price:40000, rating : 7,url : 'dell.jpg'});
    // this._productsArray.push({id:2, name:'Logitech Keyboard',category: 'Appliances',price:20000, rating : 6, url : 'keyboard.jpg'});
    // this._productsArray.push({id:3, name:'Mouse',category: 'Appliances',price:2000, rating : 4, url : 'mouse.jpg'});
    // this._productsArray.push({id:4, name:'Samsung S23 FE',category: 'Mobile',price:40000, rating : 8, url : 'samsung.jpg'});
    this._categories.push('Laptop');
    this._categories.push('Appliances');
    this._categories.push('Mobile');
  }

  get selectedProductNameSubject(){
    return this._selectedProductNameSubject;
  }
  get categories(){
    return this._categories;
  }
  get productArray() : Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3200/products');
  }
  
  addProduct(product : Product){
    return this.http.post('http://localhost:3200/products',{"product" : product});
  }
  addToCart(productId : number){
    const token = this.userService.getUserToken();
    return this.http.post('http://localhost:3200/cart', {productId : productId});
  }
}
