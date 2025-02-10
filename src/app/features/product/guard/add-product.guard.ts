import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AddProductGuard implements CanActivate{
  constructor(private router : Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let user = JSON.parse(localStorage.getItem('currentUser')!) ?? null;
    if(user && user.role === 'admin'){
      return true;
    }
    return this.router.createUrlTree(['/common/un-authorized']);
  }

}
