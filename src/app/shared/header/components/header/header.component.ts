import { Component } from '@angular/core';
import { UserService } from '../../../../features/user/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private userService : UserService, private router : Router){}
  logout(){
    this.userService.logout();
    this.router.navigateByUrl('/user/login');
  }
}
