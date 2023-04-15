import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = false;
  role: String | any;
  constructor() {}

  logout() {
    this.isLogin= false;
    this.role='';
    localStorage.setItem('STATE','false');
    localStorage.removeItem("USER")
    localStorage.setItem('ROLE','');
    window.location.reload();
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true') {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    return this.isLogin;
  }

  getRole() {
    this.role = localStorage.getItem('ROLE');
    return this.role;
  }

}
