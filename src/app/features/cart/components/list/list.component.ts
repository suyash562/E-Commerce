import { Component } from '@angular/core';
import { UserService } from '../../../user/services/user.service';
import { ProductService } from '../../../product/services/product.service';
import { User } from '../../../user/model/user';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-list',
  standalone: false,
  
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  user : User;
  constructor(private userService : UserService, private productService : ProductService, private cartService : CartService){
    // this.user = this.userService.getUser(userService.getCurrentUser())?.userCart ?? [];
    this.user = this.userService.getUser(userService.getCurrentUser())!;
    
  }
  removeFromCart(productId : number){   
    if(!this.cartService.removeFromCart(this.userService.getCurrentUser(), productId)){
      alert('Failed to remove product from cart.')
    }
  }
  confirmOrder(){
    if(this.cartService.confirmOrder(this.user.email)){
      alert('Your order has been confirmed.')
    }
    else{
      alert('Failed to confirm order.')
    }
  }
}
