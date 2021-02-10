import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { Articulo } from 'src/app/model/ArticuloModel';
import { Usuario } from 'src/app/model/UsuarioModel';
import { Router } from '@angular/router';

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
  emptyCode;
  emptyDesc;

  constructor(private articleService: ArticlesService, private router: Router) { }

  ngOnInit(): void {
    this.emptyCode=false;
    this.emptyDesc=false;
  }
  saveArticle(){
    if(this.validCode && this.emptyCode==false && this.emptyDesc==false){
      var creador : Usuario = {
        idusuario: +sessionStorage.getItem("idusuario")
      }
      var articulo: Articulo = {
        codigoarticulo: Number(this.codigoarticulo),
        descripcion: this.descripcion,
        precio: this.precio,
        estado: 1,
        creador: creador
      };
        this.articleService.addArticle(articulo);
        this.router.navigate(["/products/"+sessionStorage.usuario.nombreusuario])
      
    }else{
      this.validateCode();
      this.validateDesc();
      this.validateEmptyCode();
    }
    
  }

  validateCode(){
    this.articleService.getArticleByCode(this.codigoarticulo).subscribe(data=>{
      if(data!=null){
        this.validCode=false;
        return;
      }
      if(this.codigoarticulo!=null){
        this.emptyCode=false;
      }
    });
    
    this.validCode=true;
    
  }

  validateEmptyCode(){
    if(this.codigoarticulo==null){
      this.emptyCode=true;
      return;
    }else{
      this.emptyCode=false;
    }
  }

  validateDesc(){
    if(this.descripcion==null){
      this.emptyDesc=true;
      return;
    }else{
      this.emptyDesc=false;
    }
  }
  
}
