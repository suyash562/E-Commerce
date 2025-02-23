import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MenuModule } from 'primeng/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { DrawerComponent } from './components/drawer/drawer.component';

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
