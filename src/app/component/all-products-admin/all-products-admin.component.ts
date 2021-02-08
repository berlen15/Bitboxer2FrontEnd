import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles.service';
import { DeleteArticleDialogComponent } from '../delete-article-dialog/delete-article-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  constructor(private articleService:ArticlesService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.estado=0;   
    this.articulos = await this.articleService.getArticles(); 
    this.articleService.filterArticles("Venta").subscribe(data=>{
      this.articulos_venta=data;
      console.log("articulos venta ", this.articulos_venta);
    })
    this.articleService.filterArticles("Descatalogado").subscribe(data=>{
      this.articulos_descatalogados=data;
      console.log("articulos desc ", this.articulos_descatalogados);
    })
  }

  openDialog(codigoarticulo){    
    this.dialog.open(DeleteArticleDialogComponent, { data: `¿Está seguro de que desea eliminar el artículo con código`+codigoarticulo+`?`})
    .afterClosed().subscribe((confirmado:Boolean)=>{
      if(confirmado){
        console.log("El obtenido es ", codigoarticulo);
        this.articleService.deleteArticle(codigoarticulo);
        alert("Se ha eliminado el artículo");
        window.location.reload();
      }
    })
  
  }
}
