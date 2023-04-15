import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CargarLuchadoresService} from "../../servicios/cargar-luchadores.service";

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.scss']
})
export class BienvenidaComponent implements OnInit
{

  constructor(private router: Router, private route: ActivatedRoute, private cargaLuchadores: CargarLuchadoresService) { }

  makeHost = false;           //Comprobamos si debemos checkear el spacebar para el inicio de la selección de personajes
  insertCoin = new Audio();   //Audio que se utiliza para avisar al usuario cuando se ha pulsado la tecla spacebar y será redireccionado a [area-seleccion component]

  ngOnDestroy()
  {
    this.insertCoin.pause();
    this.makeHost = false;
    let loader = document.querySelector(".loader") as HTMLElement | any;
    loader.classList.remove("loaderVisible")
  }

  ngOnInit()
  {
    console.log("🈵 STREET-FIGHTER")    //Título mostrado por console log
    this.makeHost = true;               //Booleano encargado de detener el HostListener al cargar [area-seleccion component]
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(this.makeHost)
    {
      switch (event.keyCode)
      {
        case 32:
          this.insertCoinAudio()
          this.makeHost = false;
          setTimeout(
            ()=>this.router.navigate(['/seleccion'])
            , 1500);
          break;
      }
    }
  }

  insertCoinAudio()
  {
    this.insertCoin.pause();
    this.insertCoin.src = "../assets/sounds/bienvenida/insertCoin.mp3";
    this.insertCoin.load();
    this.insertCoin.play();
    this.insertCoin.volume = 0.4;
  }
}
