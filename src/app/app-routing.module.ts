import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './features/user/guards/login.guard';

const routes: Routes = [
  {path: '', redirectTo: 'products/list', pathMatch: 'full'},
  {path: 'products' , loadChildren: ()=> import('./features/product/product.module').then(m => m.ProductModule)},
  {path: 'cart', canActivate: [LoginGuard] ,loadChildren: ()=> import('./features/cart/cart.module').then(m => m.CartModule)},
  {path: 'user', loadChildren: ()=> import('./features/user/user.module').then(m => m.UserModule)},
  {path: 'orders', loadChildren: ()=> import('./features/order/order.module').then(m => m.OrderModule)},
  {path: 'common', loadChildren: ()=> import('./shared/common/common.module').then(m => m.CommonComponentsModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy : PreloadAllModules
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
