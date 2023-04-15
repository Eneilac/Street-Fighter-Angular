import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AntesLucharGuardService implements CanActivate{
  /**
   * Constructor
   * @param router
   */
  constructor(private router: Router) {}

  /**
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
  {
    if (isNaN(+route.params['id'])) {
      this.router.navigate(['/bienvenida']);
      return false;
    }
    return true;
  }
}
