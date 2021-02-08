import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-supliers',
  templateUrl: './supliers.component.html',
  styleUrls: ['./supliers.component.css']
})
export class SupliersComponent implements OnInit {
  proveedores;
  articulos_baratos;
  proveedores_articulos_reducidos;
  opcion_articulos:boolean=false;
  opcion_reduccion:boolean=false;
  constructor(private suplierService: SupplierService) { }

  ngOnInit(): void {
    this.suplierService.getAllSuppliers().subscribe(data =>{console.log(data);this.proveedores=data});
    this.suplierService.getArticlesCheapestPerSuplier().subscribe(data=>{this.articulos_baratos=data});
    this.suplierService.getSupplierWithArticlesReductions().subscribe(data=>{this.proveedores_articulos_reducidos=data});
  }

  optionArticlesCheapest(){
    this.opcion_articulos=!this.opcion_articulos;
    this.opcion_reduccion=false;
  }
  optionArticlesReduction(){
    this.opcion_reduccion=!this.opcion_reduccion;
    this.opcion_articulos=false;
  }
  suplierList(){
    this.opcion_articulos=false;
    this.opcion_reduccion=false;
  }
}
