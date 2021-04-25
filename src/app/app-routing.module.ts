import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

const routes:Routes=[
  // path '/dashboard' PagesRouting
  //path '/login' AuthRouting
  // { 
  //   path:'loin',
  //   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  // },    
  //{ path:'',redirectTo:'login',pathMatch:'full' },    
  //{ path:'',redirectTo:'/dashboard',pathMatch:'full' }, 
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path:'**',component:NopagefoundComponent },   
]

@NgModule({
  imports: [RouterModule.forRoot(routes),AuthRoutingModule,PagesRoutingModule],
  exports:[RouterModule]
})
export class AppRoutingModule { }
