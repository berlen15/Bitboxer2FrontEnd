import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { MatTabGroup } from '@angular/material/tabs';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  nombreusuario:string;
  codigoarticulo:string;
  articulo;
  proveedores;
  reducciones;
  activeIndex: number;
  activeIndex2: number;

  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticlesService) { }

  ngOnInit(): void {
    this.nombreusuario = this.activatedRoute.snapshot.params.nombreusuario;
    this.codigoarticulo= this.activatedRoute.snapshot.params.codigo;
    this.articleService.getArticleByCode(this.codigoarticulo).subscribe(
      data => {
        this.articulo=data;
        if(Object.entries(this.articulo.proveedor).length!==0){
          this.proveedores=this.articulo.proveedor;
        }else{
          this.proveedores=null;
        }
        if(Object.entries(this.articulo.proveedor).length!==0){
          this.reducciones = this.articulo.reducciones;
        }else{
          this.reducciones=null;
        }
        
      }
    )
  }
  @ViewChildren('childTabs') childTabs: QueryList<MatTabGroup>;

  onTabChange(event: any){
    this.activeIndex = event.index;

    this.childTabs.forEach(childTab => {
       childTab.realignInkBar();
    });
  }

  onTabChange2(event: any){
    this.activeIndex2 = event.index;
    
  }

}
