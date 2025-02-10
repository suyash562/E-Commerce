import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedListComponent } from './components/list/shared.list.component';



@NgModule({
  declarations: [
    SharedListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SharedListComponent
  ]
})
export class ProductListModule { }
