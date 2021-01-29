import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { Articulo } from 'src/app/model/ArticuloModel';
import { Usuario } from 'src/app/model/UsuarioModel';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  codigoarticulo;
  descripcion:string;
  precio;

  validCode;
  constructor(private articleService: ArticlesService) { }

  ngOnInit(): void {
    this.validateCode();
  }
  saveArticle(){
    console.log("dentro del save art");
    var creador : Usuario = {
      idusuario: +sessionStorage.getItem("idusuario")
    }
    var articulo: Articulo = {
      codigoarticulo: +this.codigoarticulo,
      descripcion: this.descripcion,
      precio: +this.precio,
      estado: 1,
      creador: creador
    };
    this.articleService.addArticle(/*articulo*/ +this.codigoarticulo, +this.descripcion, +this.precio, 1, +creador);
  }

  validateCode(){
    console.log("dentro del validcodde");
    console.log(this.validCode);
    this.articleService.getArticleByCode(this.codigoarticulo).subscribe(data=>{
      if(data!=null){
        this.validCode=false;
      }
    });
    if(this.codigoarticulo==null){
        this.validCode=false;
    }
    this.validCode=true;
  }
}
