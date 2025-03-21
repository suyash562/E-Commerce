import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit{
  orders : [] = [];

  constructor(private orderService : OrderService){}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next : (value) => {
        this.orders = (value as any).orders;
        console.log((value as any).orders);
      }
    })
  }
}
