
import { Component, OnInit} from '@angular/core';
import {ILuchador} from "../../interfaces/iluchador";
import {CargarLuchadoresService} from "../../servicios/cargar-luchadores.service";
import { HostListener } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'area-seleccion',
  templateUrl: './area-seleccion.component.html',
  styleUrls: ['./area-seleccion.component.scss']
})
export class AreaSeleccionComponent implements OnInit{

  luchadores: ILuchador[] | any;                //Array de luchadores, del cual se obtiene un contrincante random [Resolve Data]
  indiceSeleccionado = 0;                       //Variable del componente area-seleccion que permite saber a los demás componentes qué luchador está activo
  luchadorSeleccionado: ILuchador [] | any;     //Variable que almacena los datos del luchador seleccionado
  audio = new Audio();                          //Audio usado para repreoducirse cuando se cambia entre la selección de personaje
  themeSong = new Audio();                      //Tema del personaje
  dialogo = new Audio();                        //Audio usado para reproducir el diálogo de un luchador
  title = new Audio();

  constructor(private cargaLuchador:CargarLuchadoresService, private router: Router, private route: ActivatedRoute) { }

  ngOnDestroy()                         //Este método es usado para el cierre/pause de los audios una vez se detecte que no se está haciendo uso del componente,
  {                                     //esto, debido a que, al ser audio ligado al navegador, este no interpreta el pause al cambiar de componente de manera automática, y por esto se debe forzar
    this.audio.pause();
    this.themeSong.pause();
    this.title.pause();
    let loader = document.querySelector(".loader") as HTMLElement | any;
    loader.classList.remove("loaderVisible")
  }

  ngOnInit()
  {
    this.luchadores = this.route.snapshot.data['luchadores'];   //Con esta variable aplicamos el valor obtenido del Resolve al array de luchadores

    this.luchadorSeleccionado = this.luchadores[this.indiceSeleccionado];
    this.characterThemeSong() //Reproducimos el tema asociado al jugador

    //Console Log Visual que muestra que personaje está seleccionado actualmente seleccionado
    console.log("⬛️ %c"+this.luchadores[this.indiceSeleccionado].nombre+" IS SELECTED", 'color: '+this.luchadores[this.indiceSeleccionado].colorAsociado+'')
  }

  //Este método se encarga de comprobar la pulsación de teclas y aplicar un 'mapa' de movimiento para poder realizar la selección
  //de los personajes correctamente mediante las flechas:      ↑         ____________
  //                                                        ←     →     |____----____|
  //                                                           ↓
  //Aparte, podremos usar la tecla spacebar para seleccionar un personaje,

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    switch (event.keyCode) {
      case 37:
        // ←
        if(this.indiceSeleccionado % 2 != 0)
        {
          this.indiceSeleccionado--;
          this.selectAudio()              //Audio que indica la selección de un jugador
          this.characterThemeSong()
        }
        break;
      case 38:
        // ↑
        if(this.indiceSeleccionado - 2 >= 0)
        {
          this.indiceSeleccionado = this.indiceSeleccionado - 2;
          this.selectAudio()              //Audio que indica la selección de un jugador
          this.characterThemeSong()
        }
        break;
      case 39:
        // →
        if(this.indiceSeleccionado % 2 != 1)
        {
          this.indiceSeleccionado++;
          this.selectAudio()              //Audio que indica la selección de un jugador
          this.characterThemeSong()
        }
        break;
      case 40:
        // ↓
        if(this.indiceSeleccionado + 2 <= this.luchadores.length-1)
        {
          this.indiceSeleccionado = this.indiceSeleccionado + 2;
          this.selectAudio()              //Audio que indica la selección de un jugador
          this.characterThemeSong()
        }
        break;
      case 32:
        //    ____________
        //   |____----____|
        this.themeSong.pause();       //Pausamos su Tema
        this.confirmSelectAudio()    //Procedemos a reproducir el audio de confirmación de selección de personaje

        //Cambio la class del luchador en relación a la clase que lo define, osea, su color, y añado la animación correspondiente
        //Ya que no tengo ninguna variable capaz de indicarme si el jugador ha sido seleccionado, aplico el cambio directamente en javascript,
        //en vez de usar Angular,

        let luchadorSeleccionado = document.querySelector("."+this.luchadores[this.indiceSeleccionado].colorAsociado) as HTMLElement | any;
        luchadorSeleccionado.classList.add("animationConfig");

        //Y espero 1,5 segundos antes de acceder a la ruta en la que se previsualizan el luchador junto a su contrincante

        setTimeout(
          ()=>this.router.navigate(['/luchar-luchadores', this.indiceSeleccionado])
          , 1500);
        break;
    }

    //Console Log Visual que muestra que personaje está seleccionado actualmente seleccionado
    console.log("⬛️ %c"+this.luchadores[this.indiceSeleccionado].nombre+" IS SELECTED", 'color: '+this.luchadores[this.indiceSeleccionado].colorAsociado+'')
  }

  selectAudio()
  {
    this.audio.pause();
    this.audio.src = "../assets/sounds/selectCharacter.mp3";
    this.audio.load();
    this.audio.play();
    this.audio.volume = 0.4;
  }

  characterThemeSong()
  {
    this.themeSong.src = "../assets/sounds/"+this.luchadores[this.indiceSeleccionado].nombre+".mp3";
    this.themeSong.load();
    this.themeSong.play();
    this.themeSong.volume = 0.1;
    this.dialogoLuchador();         //Se reproduce el diálogo del luchador (si es que este posee uno)
  }

  makeSound()
  {
    this.title.src = "../assets/sounds/selectBackground.mp3";
    this.title.load();
    this.title.play();
    this.title.volume = 0.2;
  }

  confirmSelectAudio()
  {
    let selectLuchador = new Audio();     //Esta variable no es necesario crearla al principio, ya que se fuerza un pause de la misma, al haber un delay de
                                          //la misma duración que el mismo audio antes de la siguiente acción (que sería un redirect a [antes-luchar component])
    selectLuchador.src = "../assets/sounds/bienvenida/insertCoin.mp3";
    selectLuchador.load();
    selectLuchador.play();
    selectLuchador.volume = 0.1;
  }

  dialogoLuchador() {
      this.dialogo.pause();
      this.dialogo.src = "../assets/sounds/"+this.luchadores[this.indiceSeleccionado].nombre+"Dialogo.mp3";
      this.dialogo.load();
      this.dialogo.play();
      this.dialogo.volume = 0.4;
    }
}
