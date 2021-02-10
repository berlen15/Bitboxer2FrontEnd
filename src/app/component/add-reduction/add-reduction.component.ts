import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { DatePipe } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { Reduccion } from 'src/app/model/ReduccionModel';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-reduction',
  templateUrl: './add-reduction.component.html',
  styleUrls: ['./add-reduction.component.css'],
  providers: [DatePipe]
})
export class AddReductionComponent implements OnInit {
  codigoarticulo;
  articulo;
  codigored:number;
  inicio_datepicker  = new FormControl(new Date().toISOString());
  fin_datepicker= new FormControl(new Date().toISOString());
  cantidad:number;
  validDate:boolean;
  reducciones;
  validReduction:boolean;
  today = new Date();
  emptyQuantity:boolean;
  
  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticlesService, private router: Router) { }

  ngOnInit(): void {
    this.codigoarticulo= this.activatedRoute.snapshot.params.codigo;
    this.validReduction=true;
    this.validDate=true;
    this.articleService.getArticleByCode(this.codigoarticulo).subscribe(
      data => {
        this.articulo=data; 
        this.reducciones=this.articulo.reducciones;                
      })
  }
  saveReduction(){
    if(this.cantidad==null){
      this.emptyQuantity=true;
      return;
    }
    if(this.fin_datepicker.value<this.inicio_datepicker.value){
      this.validDate=false;
      return;
    }
    
    var cant = this.cantidad/100;
    var reduccion: Reduccion = {
      fin: this.fin_datepicker.value,
      inicio: this.inicio_datepicker.value,
      creacion: new Date(),
      cantidad: cant,
      codigoreduccion: new Date().getTime()
    };
    if(this.reducciones.length>0){
      for(var red of this.reducciones){
        var fecha1 = new Date(red.fin);
        var fecha2 = new Date();
          if(fecha1.toISOString()>fecha2.toISOString()){
            this.validReduction=false;
            return false;
          }else{
            continue;
          }
      }
      this.articleService.addReduction(this.codigoarticulo, sessionStorage.getItem("nombreusuario"), reduccion);
      this.router.navigateByUrl("products/"+sessionStorage.getItem("nombreusuario")+"/"+this.codigoarticulo+"/edit")
    }else{
      this.articleService.addReduction(this.codigoarticulo, sessionStorage.getItem("nombreusuario"), reduccion);
      this.router.navigateByUrl("products/"+sessionStorage.getItem("nombreusuario")+"/"+this.codigoarticulo+"/edit")
    }
    
  }
  validateQuantity(){
    if(this.cantidad==null){
      this.emptyQuantity=true;
    }else{
      this.emptyQuantity=false;
    }
  }

}
