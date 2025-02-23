import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  
  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private userService : UserService, private router : Router){}

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
  getNgClass(field : string){
    return this.loginForm.get(field)?.touched && this.loginForm.get(field)?.invalid ? 'ng-invalid ng-dirty' : '';
  }
}
