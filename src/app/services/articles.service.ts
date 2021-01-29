import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient,public jwtHelper: JwtHelperService,public router: Router) { }

  getArticleByCode(codigo: string) {
    let headers = new Headers({'Content-Type': 'application/json'});  
    console.log("Esta por aqui, ", codigo);
    return this.http.get("http://localhost:8080/articulos/"+codigo, {
      headers: new HttpHeaders(
          {'Authorization': sessionStorage.getItem('token')}
        )
      });      
  }

  addArticle(/*articulo*/ codigo, descripcion, precio, estado, creador){
    console.log("en el service creando art")
    /*this.http.post("http://localhost:8080/articulos",{articulo,
      headers: new HttpHeaders({'Authorization': sessionStorage.getItem('token')})
    });*/
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', sessionStorage.getItem('token'));
    return this.http.post('http://localhost:8080/articulos', {codigo,descripcion,precio,estado,creador}, {headers : headers})
      .subscribe(res => {
         console.log(res);//only objects
      })
  }
}
