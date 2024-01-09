// login.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
        console.log(this.loginService.isAuthenticated());
        
    if (this.loginService.isAuthenticated()) {
      return true;
    } else {
        this.router.navigate(['/auth/login']);
      return false;
    }
  }
}