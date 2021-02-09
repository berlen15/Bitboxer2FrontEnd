import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { DeleteArticleDialogComponent } from '../delete-article-dialog/delete-article-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Articulo } from 'src/app/model/ArticuloModel';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-all-products-admin',
  templateUrl: './all-products-admin.component.html',
  styleUrls: ['./all-products-admin.component.css']
})
export class AllProductsAdminComponent implements OnInit {
  articulos;
  articulos_venta;
  articulos_descatalogados;
  creador;
  estado;

  columnas: string[] = ['CÓDIGO', 'DESCRIPCIÓN', 'PRECIO', 'ESTADO', 'CREADOR', 'ACCIONES'];
  datos: Articulo[]=[];
  dataSource=null;
  dataSourceVenta=null;
  dataSourceDesc=null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginatorVenta: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginatorDesc: MatPaginator;
  constructor(private articleService:ArticlesService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.estado=0;   
    this.articulos = await this.articleService.getArticles(); 

    this.dataSource = new MatTableDataSource<Articulo>(this.articulos);
    this.dataSource.paginator = this.paginator;
    this.articleService.filterArticles("Venta").subscribe(data=>{
      this.articulos_venta=data;
      this.dataSourceVenta = new MatTableDataSource<Articulo>(this.articulos_venta);
      this.dataSourceVenta.paginator = this.paginatorVenta;
    })
    this.articleService.filterArticles("Descatalogado").subscribe(data=>{
      this.articulos_descatalogados=data;
      this.dataSourceDesc= new MatTableDataSource<Articulo>(this.articulos_descatalogados);
      this.dataSourceDesc.paginator = this.paginatorDesc;
      
    })    
  }

  openDialog(codigoarticulo){    
    this.dialog.open(DeleteArticleDialogComponent, { data: `¿Está seguro de que desea eliminar el artículo con código`+codigoarticulo+` ?`})
    .afterClosed().subscribe((confirmado:Boolean)=>{
      if(confirmado){
        this.articleService.deleteArticle(codigoarticulo);
        alert("Se ha eliminado el artículo");
        window.location.reload();
      }
    })
  
  }
}
