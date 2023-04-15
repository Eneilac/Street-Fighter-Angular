import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ILuchador} from "../interfaces/iluchador";
import {CargarLuchadoresService} from "./cargar-luchadores.service";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CargarLuchadoresResolveService implements Resolve<ILuchador> {

  /**
   * Constructor
   * @param cargaLuchador
   */
  constructor(private cargaLuchador: CargarLuchadoresService) {}

  /**
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<ILuchador[]> | any {
    return this.cargaLuchador.getLuchadores().pipe(
      catchError(error => {
        return of(null);
      })
    )
  }
}
