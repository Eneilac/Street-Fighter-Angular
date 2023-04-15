import { Component } from '@angular/core';
import {ILuchador} from "../../interfaces/iluchador";
import {ActivatedRoute, Router} from "@angular/router";
import {CargarLuchadoresService} from "../../servicios/cargar-luchadores.service";

@Component({
  selector: 'app-luchar-luchadores',
  templateUrl: './luchar-luchadores.component.html',
  styleUrls: ['./luchar-luchadores.component.scss']
})
export class LucharLuchadoresComponent {
  luchador: ILuchador | any;            //Luchador escogido por el usuario [Resolve Data]
  luchadores: ILuchador [] | any;       //Array de luchadores, del cual se obtiene un contrincante random [Resolve Data]
  randomPlayer: ILuchador [] | any;     //Luchador contrincante, definido su valor mediante un método que escoge un luchador random del array luchadores
  id: string | any;                     //La id que se obtiene por parámetros en la ruta

  randomAudio = new Audio();            //Audio que corresponde a la animación del randomizador del contrincante
  select = new Audio();                 //Audio que se escucha una vez el luchador contrincante ha sido definido
  themeSong = new Audio();              //Tema del personaje


  whatTurn: boolean | any;
  battleStatus: string = "inComing";

  audio = new Audio();
  narrador: HTMLElement | any;
  narradorTurno: HTMLElement | any;

  damaged = false;
  regenerated = false;

  constructor(private route: ActivatedRoute, private cargaLuchadores: CargarLuchadoresService, private router: Router) { }

  ngOnDestroy()                         //Este método es usado para el cierre/pause de los audios una vez se detecte que no se está haciendo uso del componente,
  {                                     //esto, debido a que, al ser audio ligado al navegador, este no interpreta el pause al cambiar de componente de manera automática, y por esto se debe forzar
    this.themeSong.pause();
    this.randomAudio.pause();
    this.select.pause();
    let loader = document.querySelector(".loader") as HTMLElement | any;
    loader.classList.remove("loaderVisible")
  }

  ngOnInit()                            //Al inicio del componente, se cargan los valores de la id obtenida por parámetros,
  {                                     //así como del luchador obtenido mediante un Resolve
    this.id = this.route.snapshot.params['id'];                 //Con esta variable podré obtener el background correspondiente al luchador seleccionado
    this.luchadores = this.route.snapshot.data['luchadores'];   //Con esta variable aplicamos el valor obtenido del Resolve al array de luchadores
    this.luchador = this.luchadores[this.id];                   //Con esta variable aplicamos el valor al luchador según id

    this.narrador = document.querySelector(".narrador") as HTMLElement | any;
    this.narradorTurno = document.querySelector(".narradorTurno") as HTMLElement | any;

    this.characterThemeSong()                                   //Llamamos al método que aplica el Tema del personaje escogido por el usuario
    this.getRandomPlayer()                                      //Obtenemos un jugador aleatorio, el cual se acaba volcando en la variable randomPlayer
    this.makeTurn()

  }

  getRandomPlayer()
  {
    this.luchadores.splice(this.id,1)
    this.randomPlayer = this.luchadores[Math.floor(Math.random() * this.luchadores.length)];
    this.randomAudio.src = "../assets/sounds/antes-luchar/random.mp3";
    this.randomAudio.play();
    for (let i = 1; i < 25; i++)
    {
      //Mediante la función setTimeout, teniendo en cuenta el tiempo de espera de 100ms entre volcado de datos en randomPlayer,
      //y, sumado al refresco automático de Angular, obtenemos un efecto visual que recrea una selección randomizada mucho más
      //llamativa de cara al usuario del luchador contrincante

      setTimeout(() => {
        this.randomPlayer = this.luchadores[Math.floor(Math.random() * this.luchadores.length)];
        if(i == 24)
        {
          this.select.src = "../assets/sounds/selectCharacter.mp3";
          this.select.play()
          this.battleStatus = "started";
        }
      }, i * 100);
    }

  }

  characterThemeSong()
  {
    this.themeSong.src = "../assets/sounds/"+this.luchador.nombre+".mp3";
    this.themeSong.load();
    this.themeSong.play();
    this.themeSong.volume = 0.1;
  }

  makeTurn()
  {
    let randomTurn = Math.floor(Math.random() * 2);
    switch (randomTurn)
    {
      case 1:
        this.whatTurn = false;
        break;
      case 0:
        this.whatTurn = true;
        break;
    }

    if(this.whatTurn)
    {
      setTimeout(() => {
        this.narradorTurno.innerHTML = "Turno de: <span style='color: "+ this.luchador.colorAsociado +"'>"+this.luchador.nombre+"</span><br>"
      }, 3000);
    }
    else
    {
      setTimeout(() => {
        this.narradorTurno.innerHTML = "Turno de: <span style='color: "+ this.randomPlayer.colorAsociado +"'>"+this.randomPlayer.nombre+"</span><br>"
      }, 3000);
    }
  }

  makeAttack(attackId: number)
  {
    this.damaged = false;
    this.regenerated = false;

    if(!this.whatTurn)
    {
      this.whatTurn = true
      this.narradorTurno.innerHTML = "Turno de: <span style='color: "+ this.luchador.colorAsociado +"'>"+this.luchador.nombre+"</span><br>"
    }
    else
    {
      this.whatTurn = false
      this.narradorTurno.innerHTML = "Turno de: <span style='color: "+ this.randomPlayer.colorAsociado +"'>"+this.randomPlayer.nombre+"</span><br>"
    }

    switch (attackId)
    {
      case 1:
        if(!this.whatTurn)
        {
          this.randomPlayer.vida = this.randomPlayer.vida - (this.luchador.fuerza * 0.1);
          this.damaged = true;
          this.narrador.innerHTML = "<span style='color: "+ this.luchador.colorAsociado +"'>"+this.luchador.nombre+"</span><span> ataca y hace:</span>" +
            "<br>" +
            "<span style='color: indianred'>"+this.luchador.fuerza+" ptos DAMAGE</span>";
          this.damagedSound()
        }
        else {
          this.luchador.vida = this.luchador.vida - (this.randomPlayer.fuerza * 0.1);
          this.damaged = true;
          this.narrador.innerHTML = "<span style='color: "+ this.randomPlayer.colorAsociado +"'>"+this.randomPlayer.nombre+"</span><span> ataca y hace:</span>" +
            "<br>" +
            "<span style='color: indianred'>"+this.randomPlayer.fuerza+" ptos DAMAGE</span>";
          this.damagedSound()
        }
        break;
      case 2:
        if(!this.whatTurn)
        {
          this.luchador.vida = this.luchador.vida + (this.luchador.destreza * 0.1);
          this.regenerated = true;
          this.narrador.innerHTML = "<span style='color: "+ this.luchador.colorAsociado +"'>"+this.luchador.nombre+"</span><span> se regenera:</span>" +
            "<br>" +
            "<span style='color: lawngreen'>"+(this.luchador.destreza)+" ptos</span>";
          this.regeneratedSound()
        }
        else {
          this.randomPlayer.vida = this.randomPlayer.vida + (this.randomPlayer.destreza * 0.1);
          this.regenerated = true;
          this.narrador.innerHTML = "<span style='color: "+ this.randomPlayer.colorAsociado +"'>"+this.randomPlayer.nombre+"</span><span> se regenera:</span>" +
            "<br>" +
            "<span style='color: lawngreen'>"+(this.randomPlayer.destreza)+" ptos</span>";
          this.regeneratedSound()
        }
        break;
      case 3:
        break;
      case 4:
        break;
    }

    console.log("LUCHADOR "+this.luchador.vida)
    console.log(this.randomPlayer.vida)

    if(this.luchador.vida <= 0 || this.luchador.vida == 2.220446049250313e-16)
    {
      this.luchador.vida = 0;
      this.battleStatus = "endOfBattle";
      this.narrador.innerHTML = "<span style='color: "+ this.randomPlayer.colorAsociado +"'>"+this.randomPlayer.nombre+"</span><span> ES EL GANADOR</span>";
      setTimeout(() => {
        this.router.navigate(['/seleccion']);
      }, 11500);
    }
    if(this.luchador.vida > 10) {this.luchador.vida = 10;}
    if(this.randomPlayer.vida <= 0 || this.randomPlayer.vida == 2.220446049250313e-16)
    {
      this.randomPlayer.vida = 0;
      this.battleStatus = "endOfBattle";
      this.narrador.innerHTML = "<span style='color: "+ this.luchador.colorAsociado +"'>"+this.luchador.nombre+"</span><span> ES EL GANADOR</span>";
      setTimeout(() => {
        this.router.navigate(['/seleccion']);
      }, 11500);
    }
    if(this.randomPlayer.vida > 10) {this.randomPlayer.vida = 10;}
  }

  buttonSound()
  {
    this.audio.pause();
    this.audio.src = "../assets/sounds/antes-luchar/randomX1.mp3";
    this.audio.load();
    this.audio.play();
    this.audio.volume = 0.4;
  }

  regeneratedSound() {
    let regenerated = new Audio();
    regenerated.pause();
    regenerated.src = "../assets/sounds/antes-luchar/regenerated.mp3";
    regenerated.load();
    regenerated.play();
    let random = Math.floor(Math.random() * (10 * 10 - 1.3 * 10) + 1.3 * 10) / (1.3*10);
    regenerated.playbackRate=random;
  }

  damagedSound() {
    let damaged = new Audio();
    damaged.pause();
    damaged.src = "../assets/sounds/antes-luchar/damaged.mp3";
    damaged.load();
    damaged.play();
    damaged.volume = 0.4;
    let random = Math.floor(Math.random() * (10 * 10 - 2 * 10) + 2 * 10) / (2*10);
    damaged.playbackRate=random;
  }
}
