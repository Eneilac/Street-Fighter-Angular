import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ModificarLuchadorAtributosGuardService {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
  {
    if (isNaN(+route.params['id'])) {
      this.router.navigate(['/modificar-luchador-color-ubicacion',  parseInt(route.params['id'])]);
      return false;
    }
    return true;
  }

}
