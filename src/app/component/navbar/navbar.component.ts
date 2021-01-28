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
home_url;
products_url;
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.reloadPage();
    this.rol = sessionStorage.getItem('rol');
    this.nombreusuario=JSON.parse(sessionStorage.usuario).nombreusuario;
    this.home_url="/home/"+this.nombreusuario;
    this.products_url="/products/"+this.nombreusuario;
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
