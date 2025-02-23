import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { LoginPopupDialogueComponent } from './login-popup-dialogue.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [
    LoginPopupDialogueComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ConfirmDialogModule
  ],
  exports:[
    LoginPopupDialogueComponent
  ]
})
export class LoginPopupDialogueModule { }
