import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CargarUsuariosService} from "../../servicios/cargar-usuarios.service";
import {formatDate} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {IUsuario} from "../../interfaces/iusuario";
import {AuthService} from "../../servicios/auth.service";


@Component({
  selector: 'app-usuarios-videojuego',
  templateUrl: './usuarios-videojuego.component.html',
  styleUrls: ['./usuarios-videojuego.component.scss']
})
export class UsuariosVideojuegoComponent {
  constructor(private formBuilder: FormBuilder,private cargaUsuario:CargarUsuariosService,private route: ActivatedRoute,private usuarioService:AuthService) {
  }

  formUsuario: FormGroup | any;
  usuario: string | any;
  listaUsuarios: IUsuario[] | any;
  error: false | any;
  aplicado: boolean | any;

  ngOnInit(){
    this.aplicado = false;
    this.listaUsuarios = this.route.snapshot.data['usuarios'];
    this.formUsuario = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', Validators.required]
    })
  }

  ngOnDestroy() {
    let loader = document.querySelector(".loader") as HTMLElement | any;
    loader.classList.remove("loaderVisible")
  }

  traerNombres() {
    let arrayNombres = [];
    for (let usuario of this.listaUsuarios) {
      arrayNombres.push(usuario.usuario);
    }
    return arrayNombres;
  }

  borrarUsuario(id: number) {
    if (confirm("¿Estas seguro de que desea eliminar el Usuario?")) {
      this.cargaUsuario.borrarUsuario(id).subscribe(() => {
        },
        error => console.log(error),
        () => this.cargaUsuario.getUsuarios().subscribe(
          usuarios => {
            this.listaUsuarios = usuarios
          },
        )
      );
      //Borrar localstorage del usuario
      this.borrarLocalStorage(id);

    } else {
      alert("Cancelado");
    }
  }

  borrarLocalStorage(id: number) {
    this.cargaUsuario.getUsuario(id).subscribe(usuario => {
        this.usuario = usuario;
      },
      error => console.log(error),
      () => {
        if (localStorage.getItem('USER') == this.usuario.usuario) {
          this.usuarioService.logout();
        }
      }
    )
  }

  enviar() {
    let listaNombres = this.traerNombres();
    if (!listaNombres.includes(this.formUsuario.value.usuario)) {
      let data = {
        usuario: this.formUsuario.value.usuario,
        password: this.formUsuario.value.password,
        fecha: formatDate(new Date(), 'yyyy/MM/dd', 'en'),
        role: "ROLE_USER",
      }
      this.cargaUsuario.subirUsuario(data).subscribe(()=>{
        this.cargaUsuario.getUsuarios().subscribe(
          usuarios => {
            this.listaUsuarios = usuarios
          }
        );
      })
      this.formUsuario.reset();
      this.aplicado = true;
      this.error = false;
    } else {
      this.error = true;
      this.aplicado = false;
    }
  }
}
