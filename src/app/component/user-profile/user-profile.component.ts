import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  usuario;
  rol;
  articulos;
  num_articulos;  
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(sessionStorage.usuario);
    this.rol=sessionStorage.rol;
    this.userService.getMyArticles(sessionStorage.getItem("nombreusuario")).subscribe(
      data => {       
        this.articulos=data;
        this.num_articulos=this.articulos.length;
      },
      err => {
        this.articulos = JSON.parse(err.error).message;
      });
  }

}
