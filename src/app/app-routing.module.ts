import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AdminComponent } from './component/admin/admin.component';
import { LoginComponent } from './component/login/login.component';
import { AuthService as AuthGuard } from './services/auth.service';
import { ProductsComponent } from './component/products/products.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';

const routes: Routes = [
  { path: 'home/:nombreusuario', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'products/:nombreusuario', component: ProductsComponent },
  { path: 'products/:nombreusuario/:codigo', component: ProductDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  //{ path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
