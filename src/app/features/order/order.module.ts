import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './components/order-list/order-list.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../../shared/header/header.module';



@NgModule({
  declarations: [
    OrderListComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule.forChild([
      {path : 'list', component : OrderListComponent},
    ])
  ]
})
export class OrderModule { }
