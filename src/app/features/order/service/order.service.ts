import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http : HttpClient) { }

  getOrders(){
    return this.http.get('http://localhost:3200/user/orders');
  }
}
