import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Drawer } from 'primeng/drawer';
import { UserService } from '../../../../features/user/services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../../features/user/model/user';

@Component({
  selector: 'app-drawer',
  standalone: false,
  
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css'
})
export class DrawerComponent implements OnInit{
  // currentUser! : User | undefined;
  loggedIn : boolean = false;
  @Input('isDrawerVisible') isDrawerVisible! : boolean[];
  @ViewChild('drawerRef') drawerRef!: Drawer;

  constructor(private userService : UserService,private router : Router){}
  ngOnInit(): void {
    // this.currentUser = this.userService.user;
    this.loggedIn = this.userService.isLoggedIn();
  }
  
  closeCallback(event : any): void {
    this.drawerRef.close(event);
  }

  logout(){
    this.userService.logout();
    this.router.navigateByUrl('/user/login');
  }
}
