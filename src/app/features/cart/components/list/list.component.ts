import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';
import { Product } from '../../../product/entity/product';
import { SharedListComponent } from '../../../../shared/product-list/components/list/shared.list.component';

@Component({
  selector: 'app-list',
  standalone: false,
  
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
  userCart : Product[] = [];
  totalBill : number = 0;
  @ViewChild('sharedList') childSharedList! : SharedListComponent;

  constructor(private cartService : CartService, private messageService : MessageService){  }
 
  ngOnInit(): void {
    this.cartService.getUserCartAndBill().subscribe({
      next : (value) => {
        this.userCart = value.userCart;
        this.totalBill = value.totalBill;
      }
    })
  }
  changeQuantity(changeDetails : {productId : number, productQuantity : number}){
    this.cartService.changeQuantity(changeDetails.productId, changeDetails.productQuantity).subscribe({
      next : (value) => {
        if(value){
          this.childSharedList.editProductId = -1;
          this.totalBill = value.totalBill;
        }
        else{
          alert('Failed')
        }
      }
    })
  }
  removeFromCart(productId : number){   
    this.cartService.removeFromCart(productId).subscribe({
      next : (value) => {
        if(value){
          for(let i = 0; i<this.userCart.length; i++){
            if(this.userCart[i].id === productId){
              this.userCart.splice(i,1);
              this.totalBill = value.totalBill;
              break;
            }
          }
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to remove Product from Cart.', life : 3000});
        }
      }
    })
  }

  confirmOrder(){
    this.cartService.confirmOrder().subscribe({
      next : (value) => {
        if(value){
          this.userCart = [];
          this.totalBill = 0;
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to confirm your Order.', life : 3000});
        }
      }
    })
  }
}
