import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../../product/entity/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http : HttpClient) {}
  
  getUserCartAndBill(){
    return this.http.get<{userCart : Product[], totalBill : number}>('http://localhost:3200/cart');
  }
  
  confirmOrder(){
    return this.http.get('http://localhost:3200/user/confirmOrder');
  }

  changeQuantity(productId : number, quantityNumber : number){
    return this.http.post<{totalBill : number}>('http://localhost:3200/update-product-quantity',{productId : productId, quantityNumber : quantityNumber});
  }

  removeFromCart(productId : number){
    return this.http.delete<{totalBill : number}>(`http://localhost:3200/cart/${productId}`,);
  }
}
