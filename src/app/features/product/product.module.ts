import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../../shared/header/header.module';
import { AddProductComponent } from './components/add-product/add-product.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { ProductListModule } from '../../shared/product-list/product-list.module';
import { AddProductGuard } from './guard/add-product.guard';



@NgModule({
  declarations: [
    ListComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'list', component: ListComponent},
      {path: 'add-product', canActivate: [AddProductGuard] ,component: AddProductComponent},
    ]),
    HeaderModule,
    ProductListModule
  ]
})
export class ProductModule { }
