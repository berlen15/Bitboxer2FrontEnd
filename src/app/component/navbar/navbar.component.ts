import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
rol;
nombreusuario;
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.rol = sessionStorage.getItem('rol');
    this.nombreusuario=JSON.parse(sessionStorage.usuario).nombreusuario;
      $(document).ready(function() {
          // Transition effect for navbar
          $(window).scroll(function() {
            // checks if window is scrolled more than 500px, adds/removes solid class
            if($(this).scrollTop() > 500) {
                $('.navbar').addClass('solid');
            } else {
                $('.navbar').removeClass('solid');
            }
          });
  });
  }
  logout(){
    this.authService.logOut();
    this.route.navigateByUrl('/login');
  }

}
