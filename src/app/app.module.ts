import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AreaSeleccionComponent} from './componentes/area-seleccion/area-seleccion.component';
import {LuchadorComponent} from './componentes/luchador/luchador.component';
import {CargarLuchadoresService} from "./servicios/cargar-luchadores.service";
import {AtributosComponent} from './componentes/atributos/atributos.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {BienvenidaComponent} from './componentes/bienvenida/bienvenida.component';
import {AntesLucharGuardService} from "./servicios/antes-luchar-guard.service";
import {CargarLuchadoresResolveService} from "./servicios/cargar-luchadores-resolve.service";
import {ModificarLuchadorComponent} from './componentes/modificar-luchador/modificar-luchador.component';
import {AnadirLuchadorComponent} from './componentes/anadir-luchador/anadir-luchador.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ModificarLuchadorColorUbicacionComponent} from './componentes/modificar-luchador-color-ubicacion/modificar-luchador-color-ubicacion.component';
import {ModificarLuchadorRetratoNombreComponent} from "./componentes/modificar-luchador-retrato-nombre/modificar-luchador-retrato-nombre.component";
import {ModificarLuchadorAtributosComponent} from './componentes/modificar-luchador-atributos/modificar-luchador-atributos.component';
import {ModificarLuchadorAtributosGuardService} from "./servicios/modificar-luchador-atributos-guard.service";
import {ModificarLuchadorResolveService} from "./servicios/modificar-luchador-resolve.service";
import {ModificarLuchadorRetratoNombreGuardService} from "./servicios/modificar-luchador-retrato-nombre-guard.service";
import {ComentariosVideojuegoComponent} from './componentes/comentarios-videojuego/comentarios-videojuego.component';
import {ModificarLuchadorColorUbicacionGuardService} from "./servicios/modificar-luchador-color-ubicacion-guard.service";
import {ModificarLuchadorAnimacionStageComponent} from "./componentes/modificar-luchador-animacion-stage/modificar-luchador-animacion-stage.component";
import {UsuariosVideojuegoComponent} from './componentes/usuarios-videojuego/usuarios-videojuego.component';
import {ComentariosResolveService} from "./servicios/comentarios-resolve.service";
import {ModificarLuchadorAnimacionStageGuardService} from "./servicios/modificar-luchador-animacion-stage-guard.service";
import {LucharLuchadoresComponent } from './componentes/luchar-luchadores/luchar-luchadores.component';
import {UsuariosResolveService} from "./servicios/usuarios-resolve.service";
import {LoginComponent } from './componentes/login/login.component';
import {AuthGuard} from "./servicios/auth.guard";
import {LoginGuard} from "./servicios/login.guard";
@NgModule({
  declarations: [
    AppComponent,
    AreaSeleccionComponent,
    LuchadorComponent,
    AtributosComponent,
    BienvenidaComponent,
    ModificarLuchadorComponent,
    AnadirLuchadorComponent,
    ModificarLuchadorRetratoNombreComponent,
    ModificarLuchadorColorUbicacionComponent,
    ModificarLuchadorAtributosComponent,
    ComentariosVideojuegoComponent,
    ModificarLuchadorAnimacionStageComponent,
    UsuariosVideojuegoComponent,
    LucharLuchadoresComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        {
          path: 'bienvenida',
          component: BienvenidaComponent
        },
        {
          path: 'anadir-luchador',
          canActivate:[AuthGuard],
          component: AnadirLuchadorComponent
        },
        {
          path: 'seleccion',
          component: AreaSeleccionComponent,
          resolve: {
            luchadores: CargarLuchadoresResolveService
          }
        },
        {
          path: 'comentarios',
          component: ComentariosVideojuegoComponent,
          resolve: {
            comentarios: ComentariosResolveService
          }
        },
        {
          path: 'luchar-luchadores/:id',
          component: LucharLuchadoresComponent,
          canActivate: [AntesLucharGuardService],
          resolve: {
            luchadores: CargarLuchadoresResolveService
          }
        },
        {
          path: 'modificar-luchador',
          canActivate:[AuthGuard],
          component: ModificarLuchadorComponent,
          resolve: {
            luchadores: CargarLuchadoresResolveService
          }
        },
        {
          path: 'registro',
          component: UsuariosVideojuegoComponent,
          canActivate:[LoginGuard],
          resolve: {
            usuarios: UsuariosResolveService
          }
        },
        {
          path: 'login',
          component: LoginComponent,
          canActivate:[LoginGuard],
          resolve: {
            usuarios: UsuariosResolveService
          }
        },
        {
          path: 'modificar-luchador-retrato-nombre/:id',
          component: ModificarLuchadorRetratoNombreComponent,
          canActivate: [ModificarLuchadorRetratoNombreGuardService , AuthGuard],
          resolve: {
            luchador: ModificarLuchadorResolveService
          }
        },
        {
          path: 'modificar-luchador-atributos/:id',
          component: ModificarLuchadorAtributosComponent,
          canActivate: [ModificarLuchadorAtributosGuardService , AuthGuard],
          resolve: {
            luchador: ModificarLuchadorResolveService
          }
        },
        {
          path: 'modificar-luchador-color-ubicacion/:id',
          component: ModificarLuchadorColorUbicacionComponent,
          canActivate: [ModificarLuchadorColorUbicacionGuardService, AuthGuard],
          resolve: {
            luchador: ModificarLuchadorResolveService,
            luchadores: CargarLuchadoresResolveService
          }
        },
        {
          path: 'modificar-luchador-animacion-stage/:id',
          component: ModificarLuchadorAnimacionStageComponent,
          canActivate: [ModificarLuchadorAnimacionStageGuardService, AuthGuard],
          resolve: {
            luchador: ModificarLuchadorResolveService
          }
        },
        {path: '', redirectTo: '/bienvenida', pathMatch: 'full'},
        {path: '**', redirectTo: '/bienvenida', pathMatch: 'full'}
      ]
    )
  ],
  providers: [
    CargarLuchadoresService,
    AntesLucharGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
