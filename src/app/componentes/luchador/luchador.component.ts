import { Component, Input, OnInit} from '@angular/core';
import {ILuchador} from "../../interfaces/iluchador";

@Component({
  selector: 'app-luchador, [app-luchador]',
  templateUrl: './luchador.component.html',
  styleUrls: ['./luchador.component.scss']
})
export class LuchadorComponent implements OnInit
{

  @Input() luchador: ILuchador | any; //Al recorrer el array de luchadores, se asigna a este componente su luchador correspondiente dentro del array
  @Input() indiceSeleccionado:any;    //Variable del IndiceSeleccionado que se obtiene de [area-seleccion component]
  @Input() numLuchador:any;           //Posición del luchador en el array. Posee el valor de i al realizar el recorrido del array de luchadores

  constructor() { }

  ngOnInit()
  {
    console.log("🈯️ Player ▶️ "+this.luchador.nombre+" ◀️ Charged ")  //Console Log visual de la carga de personajes
  }

  ngOnDestroy()
  {
    let loader = document.querySelector(".loader") as HTMLElement | any;
    loader.classList.remove("loaderVisible")
  }

}
