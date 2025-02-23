import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../../features/user/services/user.service';
import { Router } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { FormControl } from '@angular/forms';
import { ProductService } from '../../../../features/product/services/product.service';
import { ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  currentUserEmail! : string;
  selectedProductName : FormControl = new FormControl();
  matchedProductNames : string[] = [];
  items: MenuItem[] | undefined;
  dropDownOptions: MenuItem[] | undefined;
  @Input('productNamesList') productNamesList : string[] = [];
  @Output() displayDrawerEmitter : EventEmitter<boolean> = new EventEmitter();

  constructor(private userService : UserService, private router : Router, private confirmationService : ConfirmationService, private productService : ProductService){}

  ngOnInit(): void {
    this.currentUserEmail = this.userService.getCurrentUserEmail();
    
    this.items = [
      {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink : '/'
      },
      {
        label: 'Cart',
        icon: 'pi pi-cart-plus',
        command: () => {
          if(this.currentUserEmail){
            this.router.navigate(['/cart/list']);
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
      },
      {
        label: 'Add Products',
        icon: 'pi pi-plus-circle',
        routerLink : '/products/add-product',
        visible : this.currentUserEmail === 'admin@gmail.com' ? true : false,
      }
    ];
    this.dropDownOptions = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command : ()=>{
          this.logout();
        }
      }
    ]
    // if(this.currentUserEmail === 'admin@gmail.com'){
    //   this.items.push({
    //     label: 'Add Products',
    //     icon: 'pi pi-plus-circle',
    //     routerLink : '/products/add-product',
    //     visible : this.currentUserEmail === 'admin@gmail.com' ? true : false;
    //   })
    // }
    this.selectedProductName.valueChanges.subscribe({
      next : (value) => {
        this.productService.selectedProductNameSubject.next(value);
      }
    })
  }
  getOptions(event: AutoCompleteCompleteEvent) {
    this.matchedProductNames = this.productNamesList.filter(productName => productName.toLowerCase().includes(event.query.toLowerCase()));
  }
  displayDrawer(){
    this.displayDrawerEmitter.emit(true);
  }
  logout(){
    this.userService.logout();
    this.router.navigateByUrl('/user/login');
  }
}
