import { Component, DoCheck, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../../user/services/user.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{
  productsArray : Product[] = [];
  productNamesList : string[] = [];
  isDrawerVisible : boolean[] = [false];

  constructor(private productService: ProductService, private userService : UserService, private router: Router, private activatedRoute : ActivatedRoute ,private messageService : MessageService){
    this.productsArray = this.productService.productArray;
  }
  ngOnInit(): void {
    this.router.events.subscribe({
      next : (event) =>{
        if(event instanceof NavigationEnd){
          if(this.activatedRoute.snapshot.queryParams['redirected']){
            this.messageService.add({ severity: 'error', summary: 'Un-Authorized', detail: 'Only Admin can add new Product', life: 1500 });
          }
        }
      }
    })
    this.productsArray.forEach(product => {
      this.productNamesList.push(product.name);
    })
  }
  addToCart(productId : number){
    const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    const product = this.productsArray.find((product) => product.id == productId);
    
    if(this.productService.addToCart(currentUser.email, product!)){
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added to cart.', life: 1500 });
      // alert('Product added to cart.')
    }
    else{
      // alert('Product is already added to cart.')
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Product is already added to cart.', life: 3000 });
    }
  }
  displayDrawer(event : any){       
    this.isDrawerVisible[0] = event;        
    console.log('drawer enabled');
    
  }
  disableDrawer(){
    this.isDrawerVisible[0] = false;
    console.log('drawer diabled');
    
  }
}
