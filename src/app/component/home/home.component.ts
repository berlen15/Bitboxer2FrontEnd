import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ArticlesService } from 'src/app/services/articles.service';
import { Articulo } from 'src/app/model/ArticuloModel';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;
  nombreusuario: string;
  usuario;
  articulos;
  usuarios: Array<Object>;
  columnas: string[] = ['CÓDIGO', 'DESCRIPCIÓN', 'PRECIO'];
  dataSource=null;

  @ViewChild(MatPaginator) paginator1: MatPaginator;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {    
    this.reloadPage();
    this.usuario = JSON.parse(sessionStorage.usuario);
    sessionStorage.setItem("rol", this.usuario.rol.name);
    this.nombreusuario = this.activatedRoute.snapshot.params.nombreusuario;
    if(this.usuario.rol.name=='USER'){
      this.userService.getMyArticles(this.usuario.nombreusuario).subscribe(
        data => {       
          this.articulos = data;
          this.dataSource = new MatTableDataSource<Articulo>(this.articulos);
          this.dataSource.paginator = this.paginator1;
          console.log(this.dataSource);
        },
        err => {
          this.articulos = JSON.parse(err.error).message;
        });
    }else if(this.usuario.rol.name=='ADMIN'){
      this.userService.getAllUsers().subscribe(data=>this.usuarios=data);
    }
    
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
