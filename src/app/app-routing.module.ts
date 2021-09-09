import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ShopComponent } from './components/shop/shop.component';

const routes: Routes = [
  {
    path : '',
    component  : LayoutComponent,
    children:[
      { path :'' ,component : HomeComponent},
      { path :'shop' , component : ShopComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
