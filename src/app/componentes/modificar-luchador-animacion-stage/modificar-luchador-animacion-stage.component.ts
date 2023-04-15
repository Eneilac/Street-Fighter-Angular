import {Component} from '@angular/core';
import {ILuchador} from "../../interfaces/iluchador";
import {ActivatedRoute} from "@angular/router";
import {CargarLuchadoresService} from "../../servicios/cargar-luchadores.service";

@Component({
  selector: 'app-modificar-luchador-animacion-stage',
  templateUrl: './modificar-luchador-animacion-stage.component.html',
  styleUrls: ['./modificar-luchador-animacion-stage.component.scss']
})
export class ModificarLuchadorAnimacionStageComponent {
  luchador: ILuchador | any;
  animPreview: any;
  fondoPreview: any;
  aplicado: boolean | any;

  constructor(private route: ActivatedRoute, private cargarLuchador: CargarLuchadoresService) {
  }

  ngOnInit() {
    this.aplicado = false;
    this.luchador = this.route.snapshot.data['luchador'];
    this.cargarFormulario();
  }

  ngOnDestroy() {
    let loader = document.querySelector(".loader") as HTMLElement | any;
    loader.classList.remove("loaderVisible")
  }

  setFondo(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.addEventListener('load', e => {
      this.fondoPreview = reader.result;
    })
  }

  setAnim(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.addEventListener('load', e => {
      this.animPreview = reader.result;
    })
  }

  cargarFormulario() {
    this.animPreview = this.luchador.animacion;
    this.fondoPreview = this.luchador.stage;
  }

  editarLuchador(event: any) {
    event.preventDefault();
    let data = {
      animacion: this.animPreview,
      stage: this.fondoPreview,
    }
    this.cargarLuchador.guardaLuchador(this.luchador.id, data).subscribe()
    this.aplicado = true;
  }

}
