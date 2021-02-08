import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nombreusuario: string;
  contrasena: string;
  isLoginFailed = false;
  errorMessage = '';
  home_url:string;
  roles: string[] = [];


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.home_url="/home"+this.nombreusuario;
   // this.reloadPage();
  }

  login(): void {
    this.authService.login(this.nombreusuario, this.contrasena).subscribe(
      async data => {
        await this.router.navigate(['home/',data.nombreusuario]);
        this.ngOnInit();
      },
      err => {
        this.errorMessage = "Usuario o contraseña incorrectos";
        this.isLoginFailed = true;
      }
    );
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