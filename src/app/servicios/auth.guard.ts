import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * @param router
   * @param auth
   */
  constructor(private router: Router, private auth: AuthService) {}

  /**
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const isLoggin = this.auth.isLoggedIn(); //Comprueba si hay un usuario logueado
    if (isLoggin) {
      if (this.auth.getRole() == 'ROLE_ADMIN') { //si el usuario es un admin le da acceso en caso contrario lo redirecciona a seleccion de personajes
        return true;
      }
      this.router.navigate(['/seleccion']);
      return false;
    }
    this.router.navigate(["/login"]); // Si no hay ningun usuario conectado lo redirecciona al loggin
  }
}
