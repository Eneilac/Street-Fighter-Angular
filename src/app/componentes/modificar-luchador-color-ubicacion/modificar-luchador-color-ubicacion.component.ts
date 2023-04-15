import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ILuchador} from "../../interfaces/iluchador";
import {ActivatedRoute, Router} from "@angular/router";
import {CargarLuchadoresService} from "../../servicios/cargar-luchadores.service";

@Component({
  selector: 'app-modificar-luchador-color-ubicacion',
  templateUrl: './modificar-luchador-color-ubicacion.component.html',
  styleUrls: ['./modificar-luchador-color-ubicacion.component.scss']
})
export class ModificarLuchadorColorUbicacionComponent {
  /**
   *Declaracion de variables
   */
  formColorUbicacion: FormGroup | any;
  idLuchador: number | any;
  luchador: ILuchador | any;
  luchadores: ILuchador[] | any;
  paises: string[] = ["spain", "france", "india", "rusia", "japan", "brazil", "usa", "congo"];
  ubicacionesLibres: string[] = [];
  ubicacionesSelecionadas: string[] = [];
  aplicado: boolean | any;

  /**
   * Constructor
   * @param formBuilder
   * @param route
   * @param cargarLuchador
   * @param router
   */
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private cargarLuchador: CargarLuchadoresService, private router: Router) {
  }

  ngOnInit() {
    this.aplicado = false;
    this.idLuchador = this.route.snapshot.params['id']; //Id del luchador por parametro
    this.formColorUbicacion = this.formBuilder.group({ //declaracion de los campos para el formulario reactivo
      ubicacion: ['', [Validators.required]],
      color: ['', Validators.required],
    });
    this.luchadores = this.route.snapshot.data['luchadores']; //Obtencion del array de luchadores para obtener las ubicaciones disponibles
    this.luchador = this.route.snapshot.data['luchador']; // obtencion del luchador concreto
    this.preCargarFormulario();
    this.ubicacionesDisponibles();
  }

  /**
   * Necesario para que el spinner no se quede dando vueltas sobre otros componentes
   */
  ngOnDestroy() {
    let loader = document.querySelector(".loader") as HTMLElement | any;
    loader.classList.remove("loaderVisible")
  }

  /**
   * precarga de los datos al formulario para evitar que manden datos vacios sin obligar a seleccionar
   */
  preCargarFormulario() {
    let cargar = {
      color: this.luchador.colorAsociado,
      ubicacion: this.luchador.ubi
    }
    this.formColorUbicacion.patchValue(cargar);
  }

  /**
   * Filtro para obtener las ubicaciones disponibles y aplicacion de estilos a las no disponibles
   */
  ubicacionesDisponibles() {
    for (const luch of this.luchadores) {
      this.ubicacionesSelecionadas.push(luch.ubi);
    }
    this.ubicacionesLibres = this.paises.filter(x => !this.ubicacionesSelecionadas.includes(x));
    for (let i = 0; i < this.ubicacionesLibres.length; i++) {
      let ubiHtml = document.querySelector(`.${this.ubicacionesLibres[i]}`) as HTMLElement | any;
      ubiHtml.classList.remove("flagInactive");
      ubiHtml.classList.add("flagActive");
    }
  }

  /**
   * Función que aplica efectos de sonido a la selección de colores y ubicaciones
   */
  selectRouteAudio() {
    let audio = new Audio();
    audio.src = "../assets/sounds/bienvenida/insertCoin.mp3";
    audio.load();
    audio.play();
    audio.volume = 0.1;
  }

  /**
   * Funcion que realiza un patch con los datos al json
   */
  subirDatos() {
    let data = {
      ubi: this.formColorUbicacion.value.ubicacion,
      colorAsociado: this.formColorUbicacion.value.color,
    }
    this.aplicado = true;
    this.cargarLuchador.guardaLuchador(this.luchador.id, data).subscribe()
  }
}




