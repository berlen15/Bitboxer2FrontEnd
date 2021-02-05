import { Component } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  nombreusuario?: string;

  constructor(private jwtHelper: JwtHelperService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    document.body.classList.add('bg-img');
    this.activatedRoute.params.subscribe(params => {
      this.reloadPage();
  });
    if(this.jwtHelper.isTokenExpired(sessionStorage.getItem("token"))){
      sessionStorage.clear();
      this.router.navigateByUrl("/login");
    }
    /*this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.reloadPage();
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.nombreusuario = user.nombreusuario;
    }*/
  }

  /*logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }*/
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
