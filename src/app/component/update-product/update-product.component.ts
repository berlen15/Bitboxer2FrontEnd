import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/UsuarioModel';
import { Articulo } from 'src/app/model/ArticuloModel';
import { DisableArticleDialogComponent } from '../disable-article-dialog/disable-article-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  descripcion;
  precio;
  estado;
  codigoarticulo;
  articulo;
  valid;
  constructor(private articleService: ArticlesService, private activatedRoute: ActivatedRoute, private router: Router,public dialog: MatDialog) { }

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
    if(this.estado==2){
      this.dialog.open(DisableArticleDialogComponent, { data: `Introduzca el motivo por el que descataloga el artículo`})
      .afterClosed().subscribe((confirmado:Boolean)=>{
        if(confirmado){
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
      })     
    }else{
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
    
  }

  AsociateSupplier(){
    this.router.navigateByUrl("products/"+sessionStorage.getItem("nombreusuario")+"/"+this.codigoarticulo+"/suppliers")
  }
  AddReduction(){
    this.router.navigateByUrl("products/"+sessionStorage.getItem("nombreusuario")+"/"+this.codigoarticulo+"/reduction")
  }
}
