import { Component, DoCheck } from '@angular/core';
import { UserService } from '../../../user/services/user.service';
import { ProductService } from '../../../product/services/product.service';
import { User } from '../../../user/model/user';
import { CartService } from '../../services/cart.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list',
  standalone: false,
  
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent{
  user : User;
  // userCart : Product[] = [];

  constructor(private userService : UserService, private cartService : CartService, private messageService : MessageService){
    // this.user = this.userService.getUser(userService.getCurrentUser())?.userCart ?? [];
    this.user = this.userService.getUser(userService.getCurrentUserEmail())!;    
  }
  
  removeFromCart(productId : number){   
    if(!this.cartService.removeFromCart(this.userService.getCurrentUserEmail(), productId)){
      alert('Failed to remove product from cart.')
    }
  }
  
  changeQuantity(changeDetails : {productId : number, increment : boolean}){
    this.cartService.changeQuantity(this.user.email, changeDetails.productId , changeDetails.increment ? 1 : -1);
  }

  confirmOrder(){
    if(this.cartService.confirmOrder(this.user.email)){
      // alert('Your order has been confirmed.')
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your order has been confirmed.', sticky: true });
    }
    else{
      alert('Failed to confirm order.')
    }
  }
}
