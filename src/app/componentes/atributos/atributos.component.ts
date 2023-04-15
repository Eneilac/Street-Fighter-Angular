import { Component,Input } from '@angular/core';
import {ILuchador} from "../../interfaces/iluchador";

@Component({
  selector: 'app-atributos',
  templateUrl: './atributos.component.html',
  styleUrls: ['./atributos.component.scss']
})

export class AtributosComponent
{
  constructor() { }

  @Input() indiceSeleccionado :number | any;    //Variable recibida de [area-seleccion component] que indica el indice que se encuentra seleccionado
  @Input() luchadores: ILuchador | any;         //Variable recibida de [area-seleccion component] que almacena el array de luchadores
  nombreLuchador: string | any;

  ngOnDestroy()
  {
    let loader = document.querySelector(".loader") as HTMLElement | any;
    loader.classList.remove("loaderVisible")
  }

  ngOnChanges()
  {
    if(this.luchadores != null)
    {
      let radar = document.querySelector(".radarStyle") as HTMLElement | any;

      let fuerza = (55 - (this.luchadores[this.indiceSeleccionado].fuerza * 5.5)) + "%"; //ONLY IN Y COORD

      let destrezaX = (50 + (this.luchadores[this.indiceSeleccionado].destreza * 5)) + "%" //X COORD
      let destrezaY = (55 - (this.luchadores[this.indiceSeleccionado].destreza * 1.7)) + "%" //X COORD

      let vidaX = (50 - (this.luchadores[this.indiceSeleccionado].vida * 5)) + "%" //X COORD
      let vidaY = (55 - (this.luchadores[this.indiceSeleccionado].vida * 1.7)) + "%" //X COORD

      let tecX = (50 - (this.luchadores[this.indiceSeleccionado].tecnica * 3.2)) + "%" //X COORD
      let tecY = (55 + (this.luchadores[this.indiceSeleccionado].tecnica * 4.5)) + "%" //X COORD

      let rangoX = (50 + (this.luchadores[this.indiceSeleccionado].rango * 3.2)) + "%" //X COORD
      let rangoY = (55 + (this.luchadores[this.indiceSeleccionado].rango * 4.5)) + "%" //X COORD

      radar.style.clipPath = "polygon(50% " + fuerza + ", " + destrezaX + " " + destrezaY + ", " + rangoX + " " + rangoY + ", " + tecX + " " + tecY + ", " + vidaX + " " + vidaY + ")";
    }
  }

}
