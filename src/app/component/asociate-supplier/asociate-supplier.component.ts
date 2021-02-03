import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { SupplierService } from 'src/app/services/supplier.service';
import { Proveedor } from 'src/app/model/ProveedorModel';

@Component({
  selector: 'app-asociate-supplier',
  templateUrl: './asociate-supplier.component.html',
  styleUrls: ['./asociate-supplier.component.css']
})
export class AsociateSupplierComponent implements OnInit {
  codigoarticulo;
  articulo;
  proveedores;
  all_proveedores_disponibles;
  proveedor_asociado;
  p;
  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticlesService, private supplierService: SupplierService, private router: Router) { }

  ngOnInit(): void {
    this.codigoarticulo= this.activatedRoute.snapshot.params.codigo;
    this.articleService.getArticleByCode(this.codigoarticulo).subscribe(
      data => {
        this.articulo=data;
        if(Object.entries(this.articulo.proveedor).length!==0){
          this.proveedores=this.articulo.proveedor;
        }else{
          this.proveedores=null;
        }        
      }
    )
    this.supplierService.getAllSuppliers().subscribe(data=> this.all_proveedores_disponibles=data);
  }

  asociateSupplier(){    
    /*this.supplierService.getByName(this.proveedor_asociado).subscribe(data => {
      console.log("el prove ", data);
      this.articleService.addSupplier(this.codigoarticulo, data);
      this.router.navigateByUrl("products/"+this.codigoarticulo);
    });*/
    var prov: Proveedor = {
      nombre: this.proveedor_asociado
    }
    this.articleService.addSupplier(this.codigoarticulo, prov);
    this.router.navigateByUrl("products/"+sessionStorage.getItem("nombreuusario")+"/"+this.codigoarticulo+"/edit");
    
  }
}
