import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioNuevo } from '../model/newUserModel';

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
    return this.http.get(API_URL+'usuarios/'+nombreusuario, {
      headers: new HttpHeaders(
        {'Authorization': sessionStorage.getItem('token')}
      )})
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

  addUser(usuario: UsuarioNuevo){
    this.http.post("http://localhost:8080/usuarios", usuario, 
    {headers: new HttpHeaders({'Authorization': sessionStorage.getItem('token'),'Accept': 'text/plain'}),
    }).subscribe(data => console.log("data= ", data));
  }

  updateUser(nombreusuario: string, usuario: UsuarioNuevo){
    console.log("el q envio es ", usuario);
    this.http.put("http://localhost:8080/usuarios/"+nombreusuario, usuario, 
    {headers: new HttpHeaders({
    'Authorization': sessionStorage.getItem('token'),
    'Accept': 'text/plain',
    "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Origin": "https://localhost:8080",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    }), responseType:'text'
    }).subscribe(data => console.log("data= ", data));
  }
}
