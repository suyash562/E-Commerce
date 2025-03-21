import { Component, OnInit } from '@angular/core';
import { Product } from '../../entity/product';
import { ProductService } from '../../services/product.service';
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

  constructor(private productService: ProductService, private router: Router, private activatedRoute : ActivatedRoute ,private messageService : MessageService){  }
 
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
    
    this.productService.productArray
    // .pipe(
    //   retry(3)
    // )
    .subscribe({
      next : (value) => {                        
        this.productsArray = value;
        this.productsArray.forEach(product => {
          this.productNamesList.push(product.name);
        })
      }
    })
  }

  addToCart(productId : number){    
    this.productService.addToCart(productId).subscribe({
      next : (value)=>{
        if(value){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added to cart.', life: 1500 });
        }
        else{
          this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Product is already added to cart.', life: 3000 });
        }
      }
    })
  }
  
  displayDrawer(event : any){       
    this.isDrawerVisible[0] = event;        
  }
}
