import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, CanActivate } from '@angular/router';

const AUTH_API = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(private http: HttpClient,public jwtHelper: JwtHelperService,public router: Router) { }


  login(nombreusuario: string, contraseña: string): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});  
    return this.http
    .post<any>("http://localhost:8080/login", { nombreusuario, contraseña })
    .pipe(
      map(userData => {
        sessionStorage.setItem("nombreusuario", nombreusuario);     
        let tokenStr = userData.token;
        sessionStorage.setItem("token", tokenStr);
        headers.append('Authorization',tokenStr)
        sessionStorage.setItem("usuario",  JSON.stringify(userData));
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
    sessionStorage.removeItem("usuario");
    sessionStorage.removeItem("rol");
  }


  public canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      this.logOut();
      return false;
    }
    return true;
  }

  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token') || undefined;
    return !this.jwtHelper.isTokenExpired(token);
  }
}
