import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  /**
   * Constructor
   * @param router
   * @param auth
   */
  constructor(private router: Router, private auth: AuthService) {}

  /**
   * Guard Para evitar que un usuario ya logueado acceda de nuevo al loggin.
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const isLoggin = this.auth.isLoggedIn();
    if(isLoggin){
      this.router.navigate(["/bienvenida"]);
    }
  }

}
