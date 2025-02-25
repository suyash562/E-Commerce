import { Component, DoCheck, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Product } from '../../../../features/product/model/product';
import { ProductService } from '../../../../features/product/services/product.service';
// import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../../../../features/user/services/user.service';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-shared-list',
  standalone: false,
  templateUrl: './shared.list.component.html',
  styleUrl: './shared.list.component.css'
})
export class SharedListComponent implements OnInit, OnDestroy{
  productsToDisplay : Product[] = [];
  selectedProductSubscription! : Subscription;
  @Input() buttonTitle! : string;
  @Input() productsArray! : Product[];
  @Output() buttonClickedEvent = new EventEmitter<number>();
  @Output() changeQuantityEvent = new EventEmitter<any>();

  constructor(private productService : ProductService,private userService : UserService, private confirmationService : ConfirmationService ,private router : Router){}
  
  ngOnInit(): void {
    if(this.buttonTitle !== 'Remove from Cart'){
      this.selectedProductSubscription = this.productService.selectedProductNameSubject.subscribe({
        next : (selectedProductName) => {      
          this.productsToDisplay = this.productsArray.filter(product => product.name.toLowerCase().includes(selectedProductName.toLowerCase()));
        }
      })
    }
  }

  addToCart(productId : number){
    if(this.userService.getCurrentUserEmail()){
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
  changeQuantity(productId : number, incrementOrDecrement : string){
    this.changeQuantityEvent.emit({
      productId : productId,
      increment : (incrementOrDecrement === 'increment' ? true : false),
    });
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
  ngOnDestroy(): void {
    this.selectedProductSubscription?.unsubscribe();
  }
}
