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
import { AddReductionComponent } from './component/add-reduction/add-reduction.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { AddUserComponent } from './component/add-user/add-user.component';
import { UpdateUserComponent } from './component/update-user/update-user.component';
import { SupliersComponent } from './component/supliers/supliers.component';
import { AllProductsAdminComponent } from './component/all-products-admin/all-products-admin.component';
import { AddSupplierComponent } from './component/add-supplier/add-supplier.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'home/:nombreusuario', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'products/admin', component: AllProductsAdminComponent},
  { path: 'products/:nombreusuario', component: ProductsComponent},
  { path: 'products/:nombreusuario/add', component: AddProductComponent},
  { path: 'products/:nombreusuario/:codigo', component: ProductDetailsComponent }, 
  { path: 'products/:nombreusuario/:codigo/edit', component: UpdateProductComponent },
  { path: 'products/:nombreusuario/:codigo/suppliers', component: AsociateSupplierComponent },
  { path: 'products/:nombreusuario/:codigo/reduction', component: AddReductionComponent },
  { path: 'profile/:nombreusuario', component: UserProfileComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/add', component: AddUserComponent },
  { path: 'suppliers/add', component: AddSupplierComponent },
  { path: 'users/:nombreusuario/edit', component: UpdateUserComponent },
  { path: 'supliers', component: SupliersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
