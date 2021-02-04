import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any>{
    return this.http.get(API_URL+'usuarios', {
      headers: new HttpHeaders(
        {'Authorization': sessionStorage.getItem('token')}
      )})
  }
  getUserByAdmin(nombreusuario: string): Observable<any>{
    return this.http.get(API_URL+'usuarios/'+nombreusuario, {responseType: 'text'});
  }

  getArticles(){
    return this.http.get(API_URL+'articulos', {responseType: 'text'});
  }

  getUserByUser(nombreusuario: string): Observable<any>{
    console.log(sessionStorage.getItem('token'));
    return this.http.get(API_URL+nombreusuario, {
      headers: new HttpHeaders(
          {'Authorization': sessionStorage.getItem('token')}
        )
      });
  }

  getMyArticles(nombreusuario:string){
    return this.http.get(API_URL+'articulos/usuarios/'+nombreusuario, {
      headers: new HttpHeaders(
          {'Authorization': sessionStorage.getItem('token')}
        )
      });
  }

}
