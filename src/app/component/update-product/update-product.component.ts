import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/UsuarioModel';
import { Articulo } from 'src/app/model/ArticuloModel';

interface Estado{
  estado_number: number,
  estado_string: string
}

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  estados_disponibles: Estado[]= [
    {estado_number: 1, estado_string: 'EN VENTA'},
    {estado_number: 2, estado_string: 'DESCATALOGADO'}
  ];
  descripcion;
  precio;
  estado;
  codigoarticulo;
  articulo;
  valid;
  constructor(private articleService: ArticlesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.valid=true;
    this.codigoarticulo= this.activatedRoute.snapshot.params.codigo;
    this.articleService.getArticleByCode(this.codigoarticulo).subscribe(
      data => {
        this.articulo=data; 
        this.descripcion=this.articulo.descripcion;
        this.precio=this.articulo.precio;
        if(this.articulo.estado==1){
          this.estado="EN VENTA";
        }else if(this.articulo.estado==2){
          this.estado="DESCATALOGADO";
        }
               
      })
     
  }
  updateArticle(){
    console.log("entrando al update")
    if(this.descripcion=="" || this.precio==null|| this.estado==""){
      this.valid=false;
    }
    console.log("estado es ", this.estado);
    var creador : Usuario = {
      idusuario: +sessionStorage.getItem("idusuario")
    }
    var articulo: Articulo = {
      codigoarticulo: Number(this.codigoarticulo),
      descripcion: this.descripcion,
      precio: this.precio,
      estado: Number(this.estado),
      creador: creador
    };
    console.log("nombreusuario ",sessionStorage.getItem("nombreusuario"));
    this.articleService.updateArticle(this.codigoarticulo, sessionStorage.getItem("nombreusuario"), articulo);
    this.router.navigate(["/products/"+sessionStorage.usuario.nombreusuario])
  }

  AsociateSupplier(){
    this.router.navigateByUrl("products/"+sessionStorage.getItem("nombreusuario")+"/"+this.codigoarticulo+"/suppliers")
  }
  AddReduction(){

  }
}
