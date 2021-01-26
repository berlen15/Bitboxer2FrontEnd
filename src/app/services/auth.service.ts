import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
const AUTH_API = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(nombreusuario: string, contraseña: string): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});  
    
    return this.http
      .post<any>("http://localhost:8080/login", { nombreusuario, contraseña })
      .pipe(
        map(userData => {
          sessionStorage.setItem("nombreusuario", nombreusuario);
          console.log(sessionStorage.getItem("nombreusuario"));
          
          let tokenStr = userData.token;
          sessionStorage.setItem("token", tokenStr);
          headers.append('Authorization',tokenStr)
          console.log(sessionStorage.getItem("token"));
          return userData;
        })
      );
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem("nombreusuario");
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("nombreusuario");
  }
}
