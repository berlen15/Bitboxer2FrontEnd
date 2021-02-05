import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Articulo } from '../model/ArticuloModel';
import { Proveedor } from '../model/ProveedorModel';
import { Reduccion } from '../model/ReduccionModel';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient,public jwtHelper: JwtHelperService, public router: Router) { }

  getArticles(){
    return this.http.get('http://localhost:8080/articulos', {
      headers: new HttpHeaders(
          {'Authorization': sessionStorage.getItem('token')}
        )
      });
  }

  getArticleByCode(codigo: string) {
    let headers = new Headers({'Content-Type': 'application/json'});  
    return this.http.get("http://localhost:8080/articulos/"+codigo, {
      headers: new HttpHeaders(
          {'Authorization': sessionStorage.getItem('token')}
        )
      });      
  }

  addArticle(articulo: Articulo){
    this.http.post("http://localhost:8080/articulos", articulo, 
    {headers: new HttpHeaders({'Authorization': sessionStorage.getItem('token'),'Accept': 'text/plain'}),
    }).subscribe(data => console.log("data= ", data));
  }
  
  updateArticle(codigo: number, nombre: string, articulo: Articulo){
    console.log("codigo ",codigo, " nombreusuario ", nombre, " articulo: ", articulo);
    this.http.put("http://localhost:8080/"+nombre+"/articulos/"+codigo, articulo, 
    {headers: new HttpHeaders({'Authorization': sessionStorage.getItem('token'),'Accept': 'text/plain'}),
    }).subscribe(data => console.log("data= ", data));
  }

  addSupplier(codigoarticulo, nombreproveedor:Proveedor){
    console.log("El que se le manda al server es ",nombreproveedor);
    console.log("Codigoarticulo ",codigoarticulo);
    this.http.post("http://localhost:8080/articulos/"+codigoarticulo+"/proveedores", nombreproveedor, 
    {headers: new HttpHeaders({'Authorization': sessionStorage.getItem('token'),'Accept': 'application/json', 'Content-Type':'application/json'}),
    }).subscribe(data => console.log("data= ", data));  
  }
  
  addReduction(codigoarticulo, nombreusuario, reduccion:Reduccion){
    this.http.post("http://localhost:8080/"+nombreusuario+"/articulos/"+codigoarticulo+"/reducciones", reduccion, 
    {headers: new HttpHeaders({'Authorization': sessionStorage.getItem('token'),'Accept': 'application/json'}),'responseType':'text'
    }).subscribe(data => console.log("data = ", data));  
  }

}
