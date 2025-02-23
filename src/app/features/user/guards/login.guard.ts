import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate{
  constructor(private router : Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let user = JSON.parse(localStorage.getItem('currentUser')!) ?? null;
    if(user){
      return true;
    }
    return this.router.navigate(['/user/login']);
  }

}
