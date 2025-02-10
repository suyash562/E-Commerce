import { Component } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'app-list',
  standalone: false,
  
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  productsArray : Product[] = [];

  constructor(private productService: ProductService, private userService : UserService){
    this.productsArray = this.productService.productArray;
  }
  addToCart(productId : number){
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    const product = this.productsArray.find((product) => product.id == productId);
    
    if(this.productService.addToCart(currentUser.email, product!)){
      alert('Product added to cart.')
    }
    else{
      alert('Failed to add product added to cart.')
    }
  }
}
