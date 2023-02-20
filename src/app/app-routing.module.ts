import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestingComponent } from './testing/testing.component';
import { CartComponent } from './cart/cart.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {path:'home', component:TestingComponent},
  {path:'', component:TestingComponent},
  {path: 'list', component:VerifyComponent},
  {path:'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
