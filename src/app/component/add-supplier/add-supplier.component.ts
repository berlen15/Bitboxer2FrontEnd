import { Component, OnInit } from '@angular/core';
import { NuevoProveedor } from 'src/app/model/newProveedor';
import { SupplierService } from 'src/app/services/supplier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {
  validSupplier:boolean;
  emptySupplier:boolean;
  pais:string;
  nombre:string;
  paises: Object[]=[    
    {value: 'España', viewValue: 'España'},
    {value: 'Suecia', viewValue: 'Suecia'},
    {value: 'Italia', viewValue: 'Italia'},
    {value: 'Portugal', viewValue: 'Portugal'},
    {value: 'Inglaterra', viewValue: 'Inglaterra'},
    {value: 'Francia', viewValue: 'Francia'}
  ]
  constructor(private suplierService: SupplierService, private router: Router) { }

  ngOnInit(): void {
  }

  saveSupplier(){
    var proveedor: NuevoProveedor = {
      nombre: this.nombre,
      pais: this.pais
    };
    if(this.nombre!=null){
      this.suplierService.addSuplier(proveedor);
      this.router.navigate(["/supliers"])
    }else{
      this.emptySupplier=true;
    }
    
  }

  validateSuplier(){
    if(this.nombre==null || this.nombre==""){
      this.emptySupplier=true;
    }else{
      this.emptySupplier=false;
      this.suplierService.getByName(this.nombre).subscribe(data=>{
        if(data!=null){
          this.validSupplier=false;
        }else{
          this.validSupplier=true;
        }
      })
    }
  }
}
