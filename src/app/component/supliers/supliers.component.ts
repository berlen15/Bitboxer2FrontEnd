import { Component, OnInit, ViewChild } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Proveedor } from 'src/app/model/ProveedorModel';
import { MatTableDataSource } from '@angular/material/table';
import { Articulo } from 'src/app/model/ArticuloModel';

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

  columnas: string[] = ['nombre', 'pais'];
  columnas2: string[] = ['codigoarticulo', 'descripcion'];
  dataSource=null;
  dataSourceArticles=null;
  dataSource3=null;

  @ViewChild(MatPaginator, { static: true }) paginator1: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator, { static: true }) paginator2: MatPaginator;
  @ViewChild(MatSort) sort2: MatSort;

  @ViewChild(MatPaginator, { static: true }) paginator3: MatPaginator;
  @ViewChild(MatSort) sort3: MatSort;

  constructor(private suplierService: SupplierService) { }

  ngOnInit(): void {
    this.reloadPage();
    this.suplierService.getAllSuppliers().subscribe(data =>{
      this.proveedores=data
      this.dataSource = new MatTableDataSource<Proveedor>(this.proveedores);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator = this.paginator1;
    });
    this.suplierService.getArticlesCheapestPerSuplier().subscribe(data=>{
      this.articulos_baratos=data;
      this.dataSourceArticles = new MatTableDataSource<Articulo>(this.articulos_baratos);
      this.dataSourceArticles.sort=this.sort2;
       this.dataSourceArticles.paginator = this.paginator2;
    });
    this.suplierService.getSupplierWithArticlesReductions().subscribe(data=>{
      this.proveedores_articulos_reducidos=data
      this.dataSource3 = new MatTableDataSource<Proveedor>(this.proveedores_articulos_reducidos);
      this.dataSource3.sort=this.sort3;
      this.dataSource3.paginator = this.paginator3;
    });
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
  reloadPage() {
    // The last "domLoading" Time //
    var currentDocumentTimestamp =
    new Date(performance.timing.domLoading).getTime();
    // Current Time //
    var now = Date.now();
    // Ten Seconds //
    var tenSec = 10 * 1000;
    // Plus Ten Seconds //
    var plusTenSec = currentDocumentTimestamp + tenSec;
    if (now > plusTenSec) {
    window.location.reload();
    } else {}
    }
}
