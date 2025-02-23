import { Injectable } from '@angular/core';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/model/user';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private userService : UserService) { }
  
  confirmOrder(email : string){
    try{
      const user : User = this.userService.getUser(email)!;
      user.bill = 0;
      user.userCart = [];
      this.userService.setUser(email, user);
      return true;
    }catch(error){
      return false;
    }
  }
  changeQuantity(email : string, productId : number, quantity : number){
    let user = this.userService.getUser(email);
    if(!user){
      return false;
    }
    let productIndex : number = user.userCart.findIndex((product) => product.id == productId);
    if(productIndex !== -1){
      if(quantity === -1 && user.userCart[productIndex].quantity === 1){
        return this.removeFromCart(email, productId);
      }
      user.userCart[productIndex].quantity += quantity;
      user.bill += user.userCart[productIndex].price * quantity;
      this.userService.setUser(email,user);
      return true
    }
    return false;
  }
  removeFromCart(email : string, productId : number){
    // let userCart : Product[] = [];
    // let users : User[]= JSON.parse(localStorage.getItem('users')!) ?? [];
    let user = this.userService.getUser(email);
    if(!user){
      return false;
    }
    // users.forEach((user) =>{
    //   if(user.email == email){
    //     userCart = user.userCart;
    //   }
    // })
    
    let productIndex : number= user.userCart.findIndex((product) => product.id == productId);
    if(productIndex != -1){
      user.bill -= user.userCart[productIndex].price * user.userCart[productIndex].quantity;
      user.userCart.splice(productIndex,1).length
      this.userService.setUser(email,user);
      
      // for (let i = 0; i < users.length; i++) {
      //   if(users[i].email === email){
      //     users[i].userCart = userCart;
      //   }
      // }
      // localStorage.setItem('users' , JSON.stringify(users));
      return true;
    }
    return false;
  }
}
