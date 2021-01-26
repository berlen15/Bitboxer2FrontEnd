import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any>{
    return this.http.get(API_URL+'usuarios', {responseType: 'text'});
  }

  getUser(nombreusuario: string): Observable<any>{
    return this.http.get(API_URL+'usuarios/'+nombreusuario, {responseType: 'text'});
  }

  getArticles(){
    return this.http.get(API_URL+'articulos', {responseType: 'text'});
  }
}
