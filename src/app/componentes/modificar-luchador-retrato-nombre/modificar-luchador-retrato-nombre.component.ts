import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ILuchador} from "../../interfaces/iluchador";
import {ActivatedRoute, Router} from "@angular/router";
import {CargarLuchadoresService} from "../../servicios/cargar-luchadores.service";

@Component({
  selector: 'app-modificar-luchador-retrato-nombre',
  templateUrl: './modificar-luchador-retrato-nombre.component.html',
  styleUrls: ['./modificar-luchador-retrato-nombre.component.scss']
})
export class ModificarLuchadorRetratoNombreComponent {
  formRetratoNombre: FormGroup | any;
  retratoPreview: any;
  idLuchador: number | any;
  luchador: ILuchador | any;
  aplicado: boolean | any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private cargarLuchador: CargarLuchadoresService, private router: Router) {
  }

  ngOnInit() {
    this.aplicado = false;
    this.idLuchador = this.route.snapshot.params['id'];
    this.luchador = this.route.snapshot.data['luchador'];
    this.formRetratoNombre = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(10)]],
      retrato: [''],
    });

    this.cargarFormulario();
  }

  ngOnDestroy() {
    let loader = document.querySelector(".loader") as HTMLElement | any;
    loader.classList.remove("loaderVisible")
  }

  setRetrato(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.addEventListener('load', e => {
      this.retratoPreview = reader.result;
    })
  }

  cargarFormulario() {
    let cargar = {
      nombre: this.luchador.nombre,
    }
    this.formRetratoNombre.patchValue(cargar);
    this.retratoPreview = this.luchador.retrato;
  }

  editarLuchador() {
    let data = {
      nombre: this.formRetratoNombre.value.nombre,
      retrato: this.retratoPreview,
    }
    this.cargarLuchador.guardaLuchador(this.luchador.id, data).subscribe()
    this.aplicado = true;
  }
}
