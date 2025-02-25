import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedListComponent } from './components/list/shared.list.component';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { SelectButton } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ConfirmationService } from 'primeng/api';
import { LoginPopupDialogueModule } from '../login-popup-dialogue/login-popup-dialogue.module';
import { TreeSelectModule } from 'primeng/treeselect';
import { OptionsComponent } from './components/options/options.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';

@NgModule({
  declarations: [
    SharedListComponent,
    OptionsComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DataViewModule,
    SelectButton,
    FormsModule,
    TagModule,
    LoginPopupDialogueModule,
    TreeSelectModule,
    RadioButtonModule,
    SelectModule
  ],
  providers:[
    ConfirmationService
  ],
  exports: [
    SharedListComponent,
    OptionsComponent
  ]
})
export class ProductListModule { }
