import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../../features/user/services/user.service';
import { Router } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { FormControl } from '@angular/forms';
import { ProductService } from '../../../../features/product/services/product.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { User } from '../../../../features/user/model/user';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  // currentUser : User | undefined;
  loggedIn : boolean = false;
  selectedProductName : FormControl = new FormControl();
  matchedProductNames : string[] = [];
  items: MenuItem[] | undefined;
  dropDownOptions: MenuItem[] | undefined;
  @Input('productNamesList') productNamesList : string[] = [];
  @Output() displayDrawerEmitter : EventEmitter<boolean> = new EventEmitter();

  constructor(private userService : UserService, private router : Router, private confirmationService : ConfirmationService, private productService : ProductService){}

  ngOnInit(): void {
    // this.currentUser = this.userService.isLoggedIn();
    this.loggedIn = this.userService.isLoggedIn();
    
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
          if(this.userService.isLoggedIn()){
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
        // visible : this.currentUser?.email === 'admin@gmail.com' ? true : false,
        visible : false,
      }
    ];
    this.dropDownOptions = [
      {
        label: 'My Orders',
        icon: 'pi pi-shopping-cart',
        routerLink : '/orders/list'
      },
      {
        label: 'Wishlist',
        icon: 'pi pi-heart',
      },
      {
        label: 'Edit Profile',
        icon: 'pi pi-user-edit',
      },
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
  // logout(){
  //   this.userService.logout();
  //   this.router.navigateByUrl('/user/login');
  // }
}
