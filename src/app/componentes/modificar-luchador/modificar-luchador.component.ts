import {Component,OnInit} from '@angular/core';
import {CargarLuchadoresService} from "../../servicios/cargar-luchadores.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ILuchador} from "../../interfaces/iluchador";

@Component({
  selector: 'app-modificar-luchador',
  templateUrl: './modificar-luchador.component.html',
  styleUrls: ['./modificar-luchador.component.scss']
})
export class ModificarLuchadorComponent implements OnInit {

  luchadores: ILuchador[] | any;
  longitudLista: boolean | any;


  constructor(private route: ActivatedRoute, private cargaLuchador: CargarLuchadoresService, private routes: Router) {
  }


  ngOnInit() {
    this.luchadores = this.route.snapshot.data['luchadores'];   //Con esta variable aplicamos el valor obtenido del Resolve al array de luchadores
    this.comprobarLongitud(); //booleano para saber si puede borrar mas jugadores
  }

  ngOnDestroy() {
    let loader = document.querySelector(".loader") as HTMLElement | any;
    loader.classList.remove("loaderVisible")
  }


  comprobarLongitud() {
    if (this.luchadores.length <= 4) {
      this.longitudLista = true;
    } else {
      this.longitudLista = false;
    }
  }

  borrarLuchador(id: number) {
    if (confirm("¿Estas seguro de que desea eliminar el luchador?")) {

      this.cargaLuchador.borrarLuchador(id).subscribe(() => {
        },
        error => console.log(error),
        () => this.cargaLuchador.getLuchadores().subscribe(
          luchadores => {
            this.luchadores = luchadores
            this.comprobarLongitud()
          },
        )
      );
    } else {
      alert("Cancelado");
    }
  }


}
