import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NuevoProveedor } from '../model/newProveedor';

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

  addSuplier(proveedor: NuevoProveedor){
    this.http.post("http://localhost:8080/proveedores", proveedor, 
    {headers: new HttpHeaders({'Authorization': sessionStorage.getItem('token'),'Accept': 'text/plain'}),
    }).subscribe(data => console.log("data= ", data));
  }
}
