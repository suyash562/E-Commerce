import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      // {path: 'add-product', component: AddProductComponent},
    ])
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
