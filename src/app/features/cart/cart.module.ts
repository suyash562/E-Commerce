import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { ProductListModule } from '../../shared/product-list/product-list.module';
import { HeaderModule } from '../../shared/header/header.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ProductListModule,
    HeaderModule,
    RouterModule.forChild([
      {path: 'list', component: ListComponent},
    ]),
  ]
})
export class CartModule { }
