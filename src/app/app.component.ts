import {Component} from '@angular/core';
import { NavigationEnd,Router} from "@angular/router";
import {AuthService} from "./servicios/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  roleUser: string | any;
  admin: boolean | any;
  audio = new Audio(); //Audio empleado para notificar de la selección de una ruta en el nav,
  constructor(private router: Router,private userServicio:AuthService) {
    this.router.events.subscribe((event: Event | any) => {
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
        // console.log(event.url)
        let nav = document.querySelector(".navbar") as HTMLElement | any;
        if(event.url.includes("/modificar-luchador-"))
        {
          nav.classList.add("inactiveNav");
        }
        else
        {
          nav.classList.remove("inactiveNav");
        }
      }
    });
  }

  ngOnInit() {
    this.esAdmin();
  }

  selectRouteAudio(link: string)
  {
    this.audio.src = "../assets/sounds/bienvenida/insertCoin.mp3";
    this.audio.load();
    this.audio.play();
    this.audio.volume = 0.1;
    let loader = document.querySelector(".loader") as HTMLElement | any;
    loader.classList.add("loaderVisible")

  }

  esAdmin() {
    this.roleUser = this.userServicio.getRole();
    if (this.roleUser == 'ROLE_ADMIN') {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }

  logoutUsuario(){
    this.userServicio.logout()
  }
  noUsuario(){
    if(localStorage.getItem("USER") == null){
      return true;
    }else {
      return false;
    }
  }
}
