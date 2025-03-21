import { Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Product } from '../../../../features/product/entity/product';
import { ProductService } from '../../../../features/product/services/product.service';
// import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../../../../features/user/services/user.service';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { CartService } from '../../../../features/cart/services/cart.service';

@Component({
  selector: 'app-shared-list',
  standalone: false,
  templateUrl: './shared.list.component.html',
  styleUrl: './shared.list.component.css'
})
export class SharedListComponent implements OnInit, OnDestroy{
  productsToDisplay : Product[] = [];
  selectedProductSubscription! : Subscription;
  editProductId : number = -1;
  @Input() buttonTitle! : string;
  @Input() productsArray! : Product[];
  @Output() buttonClickedEvent = new EventEmitter<number>();
  @Output() quantityChangeEvent = new EventEmitter<{productId : number, productQuantity : number}>();

  constructor(private productService : ProductService,private userService : UserService,  private cartService : CartService, private confirmationService : ConfirmationService ,private router : Router){}
  
  ngOnInit(): void {
    if(this.buttonTitle !== 'Remove from Cart'){
      this.selectedProductSubscription = this.productService.selectedProductNameSubject.subscribe({
        next : (selectedProductName) => {      
          this.productsToDisplay = this.productsArray.filter(product => product.name.toLowerCase().includes(selectedProductName.toLowerCase()));
        }
      })
    }
  }

  addOrRemoveFromCart(productId : number){
    if(this.userService.isLoggedIn()){
      this.buttonClickedEvent.emit(productId);
    }
    else{
      this.confirmationService.confirm({
        header: 'Log In',
        message: 'Please Log In to proceed',
        accept: () => {
          this.router.navigate(['/user/login']);
        },
        // reject: () => {},
      });
    }
  }

  changeQuantity(productId : number, productQuantity : number){
    this.quantityChangeEvent.emit({productId : productId, productQuantity : productQuantity });
  }

  sortProducts(options : any){
    if(options.criteria === 'price'){
      if(options.order === 'LH'){
        this.productsToDisplay.sort((p1 , p2) => {return p1.price - p2.price})
      }
      else{
        this.productsToDisplay.sort((p1 , p2) => {return p2.price - p1.price})
      }
    }
    else{
      if(options.order === 'LH'){
        this.productsToDisplay.sort((p1 , p2) => {return p1.rating - p2.rating})
      }
      else{
        this.productsToDisplay.sort((p1 , p2) => {return p2.rating - p1.rating})
      }
    }
  }

  filterProducts(category : any){
    this.productsToDisplay = this.productsArray.filter(product => product.category.toLowerCase() === category.trim().toLowerCase())
  }

  clearFilter(){
    this.productsToDisplay = this.productsArray;
  }

  ngOnDestroy(): void {
    this.selectedProductSubscription?.unsubscribe();
  }
  
}
