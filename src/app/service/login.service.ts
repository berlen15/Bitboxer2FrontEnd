import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  dburl = 'http://localhost:8080/login'
  constructor() { }

  public login (nombreusuario: string, contraseña: string){
    return axios.post(this.dburl, {
        nombreusuario,
        contraseña
      })
      .then((res)=> {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user')
      })
  }
}
