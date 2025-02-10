import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnAuthorizedComponent } from './un-authorized/un-authorized.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UnAuthorizedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'un-authorized', component: UnAuthorizedComponent},
    ])
  ]
})
export class CommonComponentsModule { }
