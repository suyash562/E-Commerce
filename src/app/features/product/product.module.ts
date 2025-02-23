import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../../shared/header/header.module';
import { AddProductComponent } from './components/add-product/add-product.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { ProductListModule } from '../../shared/product-list/product-list.module';
import { AddProductGuard } from './guard/add-product.guard';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    ListComponent,
    AddProductComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'list', component: ListComponent},
      {path: 'add-product', canActivate: [AddProductGuard] ,component: AddProductComponent},
    ]),
    HeaderModule,
    ProductListModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    InputTextModule
  ],
})
export class ProductModule { }
