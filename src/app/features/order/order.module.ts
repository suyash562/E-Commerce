import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './components/order-list/order-list.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../../shared/header/header.module';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    OrderListComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    DataViewModule,
    ButtonModule,
    HttpClientModule,
    RouterModule.forChild([
      {path : '', redirectTo : 'list', pathMatch : 'full'},
      {path : 'list', component : OrderListComponent},
    ])
  ]
})
export class OrderModule { }
