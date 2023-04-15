import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CargarUsuariosService} from "../../servicios/cargar-usuarios.service";
import {ActivatedRoute} from "@angular/router";
import {IUsuario} from "../../interfaces/iusuario";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin: FormGroup | any;
  listaUsuarios: IUsuario[] | any;
  error: false | any;

  constructor(private formBuilder: FormBuilder,private cargaUsuario:CargarUsuariosService,private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.listaUsuarios = this.route.snapshot.data['usuarios'];
    this.formLogin = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', Validators.required]
    })
  }
  ngOnDestroy() {
    let loader = document.querySelector(".loader") as HTMLElement | any;
    loader.classList.remove("loaderVisible")
  }
  comprobarUsuario(){
    let enc = false;
    let i = 0;
    while ((i<this.listaUsuarios.length)&&(!enc)){
      if((this.listaUsuarios[i].usuario==this.formLogin.value.usuario)&&(this.listaUsuarios[i].password==this.formLogin.value.password)){
        enc = true;
        localStorage.setItem("STATE","true");
        localStorage.setItem("USER",this.listaUsuarios[i].usuario);
        localStorage.setItem("ROLE",this.listaUsuarios[i].role);
        window.location.reload();
      }
      i++;
    }
    if(!enc){
      this.error = true;
    }else{
      this.error = false;
    }

  }
  comprobarLocal() {
    if (localStorage.getItem('USER') == null) {
      return false;
    } else {
      return true;
    }
  }

}
