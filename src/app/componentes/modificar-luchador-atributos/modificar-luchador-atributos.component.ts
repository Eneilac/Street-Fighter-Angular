import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ILuchador} from "../../interfaces/iluchador";
import {ActivatedRoute} from "@angular/router";
import {CargarLuchadoresService} from "../../servicios/cargar-luchadores.service";

@Component({
  selector: 'app-modificar-luchador-atributos',
  templateUrl: './modificar-luchador-atributos.component.html',
  styleUrls: ['./modificar-luchador-atributos.component.scss']
})
export class ModificarLuchadorAtributosComponent {

  formAtributos: FormGroup | any;
  idLuchador: number | any;
  luchador: ILuchador | any;
  aplicado: boolean | any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private cargarLuchador: CargarLuchadoresService) {
  }

  ngOnInit() {
    this.aplicado = false;
    this.idLuchador = this.route.snapshot.params['id'];
    this.luchador = this.route.snapshot.data['luchador'];
    this.formAtributos = this.formBuilder.group({
      fuerza: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      tecnica: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      rango: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      vida: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      destreza: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
    });
    this.cargarFormulario();

  }

  ngOnDestroy() {
    let loader = document.querySelector(".loader") as HTMLElement | any;
    loader.classList.remove("loaderVisible")
  }

  cargarFormulario() {
    let data = {
      fuerza: this.luchador.fuerza,
      vida: this.luchador.vida,
      destreza: this.luchador.destreza,
      rango: this.luchador.rango,
      tecnica: this.luchador.tecnica,
    }
    this.formAtributos.patchValue(data);
  }

  editarLuchador() {
    let data = {
      fuerza: this.formAtributos.value.fuerza,
      vida: this.formAtributos.value.vida,
      destreza: this.formAtributos.value.destreza,
      rango: this.formAtributos.value.rango,
      tecnica: this.formAtributos.value.tecnica,
    }
    console.log(data);
    this.cargarLuchador.guardaLuchador(this.luchador.id, data).subscribe()
    this.aplicado = true;
  }
}
