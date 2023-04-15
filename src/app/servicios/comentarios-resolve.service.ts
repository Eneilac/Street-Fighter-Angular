import {Injectable} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {IComentario} from "../interfaces/IComentario";
import {CargarComentariosService} from "./cargar-comentarios.service";

@Injectable({
  providedIn: 'root'
})
export class ComentariosResolveService {
  /**
   * Constructor
   * @param cargaComentarios
   */
  constructor(private cargaComentarios: CargarComentariosService) {}

  /**
   * Resolve que precarga los comentarios.
   */
  resolve(): Observable<IComentario[]> | any {
    return this.cargaComentarios.getComentarios().pipe(
      catchError(error => {
        return of(null);
      })
    )
  }
}
