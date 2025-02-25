import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MenuModule } from 'primeng/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { DrawerComponent } from './components/drawer/drawer.component';
import { Ripple } from 'primeng/ripple';
import { StyleClass } from 'primeng/styleclass';

@NgModule({
  declarations: [
    HeaderComponent,
    DrawerComponent
  ],
  imports: [
    CommonModule,
    AutoCompleteModule,
    MenuModule,
    ReactiveFormsModule,
    MenubarModule,
    AvatarModule,
    ButtonModule,
    DrawerModule,
    Ripple,
    StyleClass,
    RouterModule.forChild([
      // {path: 'add-product', component: AddProductComponent},
    ])
  ],
  providers:[
    ConfirmationService
  ],
  exports: [
    HeaderComponent,
    DrawerComponent
  ]
})
export class HeaderModule { }
