import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AdminComponent } from './component/admin/admin.component';
import { LoginComponent } from './component/login/login.component';
import { AuthService as AuthGuard } from './services/auth.service';
import { ProductsComponent } from './component/products/products.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { UpdateProductComponent } from './component/update-product/update-product.component';
import { AsociateSupplierComponent } from './component/asociate-supplier/asociate-supplier.component';

const routes: Routes = [
  { path: 'home/:nombreusuario', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'products/:nombreusuario', component: ProductsComponent},
  { path: 'products/:nombreusuario/add', component: AddProductComponent},
  { path: 'products/:nombreusuario/:codigo', component: ProductDetailsComponent }, 
  { path: 'products/:nombreusuario/:codigo/edit', component: UpdateProductComponent },
  { path: 'products/:nombreusuario/:codigo/suppliers', component: AsociateSupplierComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
