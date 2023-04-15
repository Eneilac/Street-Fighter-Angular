import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {catchError, Observable, of} from "rxjs";
import {ILuchador} from "../interfaces/iluchador";
import {CargarLuchadoresService} from "./cargar-luchadores.service";

@Injectable({
  providedIn: 'root'
})
export class ModificarLuchadorResolveService {

  constructor(private cargaLuchador: CargarLuchadoresService, private router:Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<ILuchador> | any {
    return this.cargaLuchador.getLuchador(route.params['id']).pipe(
      catchError(error => {
        this.router.navigate(['/modificar-luchador']);
        return of(null);
      })
    )
  }
}
