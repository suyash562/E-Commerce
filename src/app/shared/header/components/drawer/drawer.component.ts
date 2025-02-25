import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Drawer } from 'primeng/drawer';
import { UserService } from '../../../../features/user/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drawer',
  standalone: false,
  
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent implements OnInit{
  currentUserEmail! : string;
  @Input('isDrawerVisible') isDrawerVisible! : boolean[];
  @ViewChild('drawerRef') drawerRef!: Drawer;

  constructor(private userService : UserService,private router : Router){}
  ngOnInit(): void {
    this.currentUserEmail = this.userService.getCurrentUserEmail();
  }
  
  closeCallback(event : any): void {
    this.drawerRef.close(event);
  }

  logout(){
    this.userService.logout();
    this.router.navigateByUrl('/user/login');
  }
}
