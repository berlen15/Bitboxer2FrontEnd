import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient, private router: Router) { }
  
  getAllSuppliers(){
    let headers = new Headers({'Content-Type': 'application/json'});  
    return this.http.get("http://localhost:8080/proveedores", {
      headers: new HttpHeaders(
          {'Authorization': sessionStorage.getItem('token')}
        )
      });
  }
  getByName(nombre){
    let headers = new Headers({'Content-Type': 'application/json'});  
    return this.http.get("http://localhost:8080/proveedores/"+nombre, {
      headers: new HttpHeaders(
          {'Authorization': sessionStorage.getItem('token')}
        )
      });
  }

  getSupplierWithArticlesReductions(){
    let headers = new Headers({'Content-Type': 'application/json'});  
    return this.http.get("http://localhost:8080/proveedores/articulos/reduccion", {
      headers: new HttpHeaders(
          {'Authorization': sessionStorage.getItem('token')}
        )
      });
  }

  getArticlesCheapestPerSuplier(){
    let headers = new Headers({'Content-Type': 'application/json'});  
    return this.http.get("http://localhost:8080/proveedores/articulos", {
      headers: new HttpHeaders(
          {'Authorization': sessionStorage.getItem('token')}
        )
      });
  }
}
