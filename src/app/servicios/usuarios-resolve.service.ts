import { Injectable } from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {CargarUsuariosService} from "./cargar-usuarios.service";
import {IUsuario} from "../interfaces/iusuario";

@Injectable({
  providedIn: 'root'
})
export class UsuariosResolveService {

  constructor(private cargaUsuarios: CargarUsuariosService) { }

  resolve():
    Observable<IUsuario[]> | any {
    return this.cargaUsuarios.getUsuarios().pipe(
      catchError(error => {
        return of(null);
      })
    )
  }
}
