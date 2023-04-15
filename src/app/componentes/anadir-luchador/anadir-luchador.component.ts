import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CargarLuchadoresService} from "../../servicios/cargar-luchadores.service";
import {ILuchador} from "../../interfaces/iluchador";
import {Router} from "@angular/router";

@Component({
  selector: 'app-anadir-luchador',
  templateUrl: './anadir-luchador.component.html',
  styleUrls: ['./anadir-luchador.component.scss']
})
export class AnadirLuchadorComponent {

  formAdd: FormGroup | any;
  retratoPreview: any;
  animPreview: any;
  fondoPreview: any;
  listaLuchadores: ILuchador[] = [];
  listaUbicaciones: string[] = ["spain","france","india","rusia","japan","brazil","usa","congo"] ;
  ubicacionesSelect: string[] = [];
  ubicacionesSelecionadas: string[] =[];
  opacityForm: any;


  constructor(private formBuilder: FormBuilder,private cargaLuchador: CargarLuchadoresService,private router:Router) { }

  ngOnInit(){
    this.cargaLuchador.getLuchadores().subscribe(
      listaLuchadores => {
        this.listaLuchadores = listaLuchadores;
      },
      error => console.log(error),
      () => {this.ubicacionesDisponibles()
      this.noMostrar()}
    );

    //FORMULARIO REACTIVO
    this.formAdd = this.formBuilder.group({
      nombre: ['', [Validators.required,Validators.maxLength(10)]],
      ubicacion: ['', Validators.required],
      retrato: ['', Validators.required],
      animacion: ['', Validators.required],
      fondo: ['', Validators.required],
      fuerza: ['', [Validators.required,Validators.min(1),Validators.max(10)]],
      tecnica: ['', [Validators.required,Validators.min(1),Validators.max(10)]],
      rango: ['', [Validators.required,Validators.min(1),Validators.max(10)]],
      vida: ['', [Validators.required,Validators.min(1),Validators.max(10)]],
      destreza: ['', [Validators.required,Validators.min(1),Validators.max(10)]],
      color: ['', Validators.required],
    });
  }

  ngOnDestroy()
  {
    let loader = document.querySelector(".loader") as HTMLElement | any;
    loader.classList.remove("loaderVisible")
  }

  //FUNCION PARA MOSTRAR EN EL FORMULARIO SOLO LAS UBICACIONES DISPONIBLES
  ubicacionesDisponibles(){
    for (const luchador of this.listaLuchadores) {
      this.ubicacionesSelecionadas.push(luchador.ubi);
    }
    this.ubicacionesSelect = this.listaUbicaciones.filter(x => !this.ubicacionesSelecionadas.includes(x));
    for (let i = 0; i < this.ubicacionesSelect.length; i++) {
      let ubiHtml = document.querySelector(`.${this.ubicacionesSelect[i]}`) as HTMLElement | any;
      ubiHtml.classList.remove("flagInactive");
      ubiHtml.classList.add("flagActive");
    }
  }

  //FUNCION NO MOSTRAR FORMULARIO EN CASO DE QUE EL JSON CONTENGA 8 LUCHADORES(MAXIMO DEL PROGRAMA)
  noMostrar(){

    if(this.listaLuchadores.length < 8){
      this.opacityForm = false;
    }else{
      this.opacityForm = true;
    }

  }

  setRetrato(event: any)
  {
    let file = event.target.files[0];
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.addEventListener('load', e => {
      this.retratoPreview = reader.result;
    })
  }
  setFondo(event: any)
  {
    let file = event.target.files[0];
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.addEventListener('load', e => {
      this.fondoPreview = reader.result;
    })
  }
  setAnim(event: any)
  {
    let file = event.target.files[0];
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.addEventListener('load', e => {
      this.animPreview = reader.result;
    })
  }
  nuevoLuchador(){

    let data = {
      nombre: this.formAdd.value.nombre,
      retrato: this.retratoPreview,
      animacion: this.animPreview,
      stage: this.fondoPreview,
      fuerza: this.formAdd.value.fuerza,
      rango: this.formAdd.value.rango,
      destreza: this.formAdd.value.destreza,
      vida: this.formAdd.value.vida,
      tecnica: this.formAdd.value.tecnica,
      colorAsociado: this.formAdd.value.color,
      ubi: this.formAdd.value.ubicacion,
    }
    //PETICION POST
    this.cargaLuchador.subirLuchador(data).subscribe()
    this.animPreview = null;
    this.retratoPreview = null;
    this.fondoPreview = null;
    this.router.navigate(['/bienvenida']);
  }

  selectRouteAudio()
  {
    let audio = new Audio();
    audio.src = "../assets/sounds/bienvenida/insertCoin.mp3";
    audio.load();
    audio.play();
    audio.volume = 0.1;
  }

}
