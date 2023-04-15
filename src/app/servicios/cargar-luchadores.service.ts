import {Injectable} from '@angular/core';
import {ILuchador} from "../interfaces/iluchador";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CargarLuchadoresService {
  /**
   * Constructor
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   * Funcion GET para traer todos los luchadores
   */
  getLuchadores(): Observable<ILuchador[]> {
    return this.http.get<ILuchador[]>(environment.apiRest+"moises_luchadores");
  }

  /**
   * Función GET para traer un luchador determinado por una id
   * @param luchID
   */
  getLuchador(luchID:any): Observable<ILuchador> {
    return this.http.get<ILuchador>(environment.apiRest+"moises_luchadores"+ '/'+ luchID);
  }

  /**
   * Funcion POST para subir luchadores
   * @param data
   */
  subirLuchador(data: any): Observable<ILuchador> {
    return this.http.post<ILuchador>(environment.apiRest+"moises_luchadores", data);
  }

  /**
   * Función PATCH para modificar un luchador determinado por una id
   * @param luchID
   * @param data
   */
  guardaLuchador(luchID: any, data: any): Observable<any> {
    return this.http.patch<any>(environment.apiRest+"moises_luchadores" + '/' + luchID, data);
  }

  /**
   * Funcion DEL para borrar un luchador determinado por una id
   * @param luchID
   */
  borrarLuchador(luchID: any): Observable<any> {
    return this.http.delete(environment.apiRest+"moises_luchadores"+ '/' + luchID);
  }
}
