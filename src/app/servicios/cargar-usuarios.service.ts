import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {IUsuario} from "../interfaces/iusuario";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CargarUsuariosService {
  /**
   *Constructor
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Funcion GET para traer todos los usuarios
   */
  getUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(environment.apiRest+"moises_usuarios");
  }
  /**
   * Funcion POST para subir usuarios
   */
  subirUsuario(data: any): Observable<IUsuario> {
    return this.http.post<IUsuario>(environment.apiRest+"moises_usuarios", data);
  }
  /**
   * Funcion DEL para borrar un usuario determinado por una id
   */
  borrarUsuario(usuarioID: any): Observable<any> {
    return this.http.delete(environment.apiRest+"moises_usuarios" + '/' + usuarioID);
  }
  /**
   * Funcion GET para traer un usuario determinado por una id
   */
  getUsuario(usuarioID: any): Observable<IUsuario> {
    return this.http.get<IUsuario>(environment.apiRest+"moises_usuarios" + '/' + usuarioID);
  }
}
