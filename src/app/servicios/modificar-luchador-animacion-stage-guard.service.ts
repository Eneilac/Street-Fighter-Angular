import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ModificarLuchadorAnimacionStageGuardService {
  /**
   * Costructor
   * @param router
   */
  constructor(private router: Router) { }

  /**
   *
   * @param route
   */
  canActivate(route: ActivatedRouteSnapshot): boolean
  {
    if (isNaN(+route.params['id'])) {
      this.router.navigate(['/modificar-luchador-atributos',  parseInt(route.params['id'])]);
      return false;
    }
    return true;

  }
}
