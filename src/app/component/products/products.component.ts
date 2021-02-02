import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  articulos;
  usuario;
  add_url: string;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {    
    this.usuario = JSON.parse(sessionStorage.usuario);
    this.userService.getMyArticles(this.usuario.nombreusuario).subscribe(
      data => {       
        this.articulos = data;
        console.log(this.articulos);
      },
      err => {
        this.articulos = JSON.parse(err.error).message;
      });
      this.add_url="products/"+this.usuario.nombreusuario+"/add";
  }

  showDetailsProduct(codigo){
    console.log("el codigo es ", codigo);
    this.route.navigateByUrl("products/"+this.usuario.nombreusuario+"/"+codigo);
  }
  editProduct(codigo){
    this.route.navigateByUrl("products/"+this.usuario.nombreusuario+"/"+codigo+"/edit")
  }
  /*addProduct(){
    this.route.navigateByUrl(this.add_url);
  }*/
}
