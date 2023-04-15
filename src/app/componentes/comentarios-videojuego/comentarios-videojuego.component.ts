import {Component} from '@angular/core';
import {IComentario} from "../../interfaces/IComentario";
import {CargarComentariosService} from "../../servicios/cargar-comentarios.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-comentarios-videojuego',
  templateUrl: './comentarios-videojuego.component.html',
  styleUrls: ['./comentarios-videojuego.component.scss'],
})
export class ComentariosVideojuegoComponent {
  /**
   * Declaración de variables
   */
  comentarios: IComentario[] | any
  formComentarios: FormGroup | any;
  numAleatorio: number | any;
  rutaImgAleatoria: string | any;
  aplicado: boolean | any;



  /**
   * Constructor
   * @param formBuilder
   * @param route
   * @param cargaComentarios
   */
  constructor(private route: ActivatedRoute, private cargaComentarios: CargarComentariosService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.aplicado = false;
    this.numAleatorio = Math.floor(Math.random() * 14);
    this.rutaImgAleatoria = "../../../assets/luchadores/randomAnimaciones/" + this.numAleatorio + ".gif"
    this.formComentarios = this.formBuilder.group({
      texto: ['', [Validators.required]],
    });
    this.comentarios = this.route.snapshot.data['comentarios'];
  }

  /**
   * Necesario para que el spinner no se quede dando vueltas sobre otros componentes
   */
  ngOnDestroy() {
    let loader = document.querySelector(".loader") as HTMLElement | any;
    loader.classList.remove("loaderVisible")
  }

  comprobarVacio() {
    var expresion= new RegExp( /[A-Za-z0-9]+/g) //Expresion regular para evitar que me meta comentarios en blanco,
    if (expresion.test(this.formComentarios.value.texto)) {
      return false;
    } else {
      return true;
    }
  }

  comprobarLocal() {
    if (localStorage.getItem('USER') == null) {
      return true;
    } else {
      return false;
    }
  }


  borrarComentario(id: number) {
    if (confirm("¿Estas seguro de que desea eliminar el Comentario?")) {
      this.cargaComentarios.borrarComentario(id).subscribe(() => {
        },
        error => console.log(error),
        () => this.cargaComentarios.getComentarios().subscribe(
          comentarios => {
            this.comentarios = comentarios
          },
        )
      );
    } else {
      alert("Cancelado");
    }
  }

  subirDatos() {
    let fecha = formatDate(new Date(), 'yyyy/MM/dd', 'en')
    let data = {
      usuario: localStorage.getItem('USER'),
      texto: this.formComentarios.value.texto,
      fecha: fecha,
      puntuacion: 5
    }
    this.cargaComentarios.subirComentario(data).subscribe(() => {
      },
      error => console.log(error),
      () => this.cargaComentarios.getComentarios().subscribe(
        comentarios => {
          this.comentarios = comentarios
        }));
    this.aplicado = true;
    this.resetForm();
  }

  resetForm() {
    this.formComentarios.reset();
  }
}
