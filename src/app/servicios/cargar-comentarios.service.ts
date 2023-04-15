import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IComentario} from "../interfaces/IComentario";

@Injectable({
  providedIn: 'root'
})
export class CargarComentariosService {
  /**
   * Constructor
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   * Funcion GET que devuelve todos los comentarios
   */
  getComentarios(): Observable<IComentario[]> {
    return this.http.get<IComentario[]>(environment.apiRest+"moises_comentarios");
  }

  /**
   * Funcion POST para subir comentarios
   * @param data
   */
  subirComentario(data: any): Observable<IComentario> {
    return this.http.post<IComentario>(environment.apiRest+"moises_comentarios", data);
  }

  /**
   * Función DEL para borrar comentarios mediante una id
   * @param comentID
   */
  borrarComentario(comentID: any): Observable<any> {
    return this.http.delete(environment.apiRest+"moises_comentarios" + '/' + comentID);
  }
}
