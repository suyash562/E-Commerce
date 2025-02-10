import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginForm = new FormGroup({
    email : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });
  constructor(private userService : UserService, private router : Router){

  }
  login(){
    if(this.loginForm.valid){
      if(this.userService.login({email : this.loginForm.value.email!, password : this.loginForm.value.password!})){
        this.router.navigateByUrl('/');
      };
    }
    else{
      alert('Failed to Login. Please try again');
    }
  }
}
