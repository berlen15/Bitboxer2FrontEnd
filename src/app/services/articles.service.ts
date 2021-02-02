import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Articulo } from '../model/ArticuloModel';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient,public jwtHelper: JwtHelperService,public router: Router) { }

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
  
  
}
