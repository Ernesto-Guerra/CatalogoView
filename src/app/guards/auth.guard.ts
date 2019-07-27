import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  
    constructor(
      private router: Router,
      private authenticationService: AuthenticationService
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.authenticationService.currentUserValue;
      const user = this.authenticationService.currentUserRole
      if (currentUser && user.user_type == 2) {
         
          // logged in so return true
          return true;
      }

      alert('No tienes permiso de entrar aquí')
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
      return false;
  }
}
