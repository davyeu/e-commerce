import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { product } from './moudles/product';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { environment } from './../environments/environment';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, CanActivate } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";  

import '@angular/cdk/table'
import '@angular/cdk/coercion'
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {AngularDropdownModule} from 'angular-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './not-found/not-found.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { ProductsComponent } from './products/products.component';
import { CheakOutComponent } from './cheak-out/cheak-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { OrdersComponent } from './my/orders/orders.component';
import { AuthGuardService } from './auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { PlusMinusComponent } from './plus-minus/plus-minus.component'
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { IpServiceService } from './ip-service.service';



///we list here all the commponent we use in this project.
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    CheakOutComponent,
    OrderSuccessComponent,
    LoginComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    OrdersComponent,
    ProductFormComponent,
    ShoppingCartComponent,
    PlusMinusComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AngularFireModule.initializeApp(environment.firebase), 
    //at the line above we set our production environment to be a firebase.
    //In this action we determine our back end as firebase no-SQL database.
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    AngularDropdownModule,
    NgbModule,
    FormsModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    HttpClientModule,
    /*
    /*The "forRoot" function map each string diplaying at the URL to specefic commponent.
    Once the user type the specfic string, Angular route to the mapping commponent and display it
    on the browser.
    */
    RouterModule.forRoot([
      {path: '',component: HomeComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'check-out',
       component: CheakOutComponent,
       canActivate: [AuthGuardService]}, 
       // AuthGuradService prevent unauthorithed user enter to this commponent.
      {path: 'my/orders', component: OrdersComponent,
      canActivate: [AuthGuardService]},
      {path: 'order-success/:id', component:OrderSuccessComponent,
      canActivate: [AuthGuardService]},
      {path: 'order-success', component:OrderSuccessComponent,
      canActivate: [AuthGuardService]},
      {path: 'login', component: LoginComponent}, 
      {path:'admin/products/product-form',
      component:ProductFormComponent,
      canActivate: [AuthGuardService,AdminAuthGuardService]
      }, 
      {path: 'admin/products/product-form/:id', 
      component:ProductFormComponent,
      canActivate: [AuthGuardService,AdminAuthGuardService]},   
      {path: 'admin/products', 
      component:AdminProductsComponent,
      canActivate: [AuthGuardService,AdminAuthGuardService]},
      {path: 'admin/orders',
       component: AdminOrdersComponent,
       canActivate: [AuthGuardService,AdminAuthGuardService]
      },
      {path: '**', component:NotFoundComponent}
    ])
  ],
  /* In Provider declartion we register all the dependecies in our project.
  /* at some classes at this project there is dependcy injection to the service (classes)
  /* listed below. Namely this services are passed as an argument to some classes (the inject Clasess) .
  */

  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    UserService,
    product,
    IpServiceService,
  ],
  bootstrap: [AppComponent] //after the declaration above we boostrap the "AppComponent"
})
export class AppModule { }
