import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
    {
        path:'dashboard',
        component:PagesComponent,
        canActivate: [ AuthGuard ],
        children:[
            { path:'',component:DashboardComponent, data:{title:'Dashboard'}},
            { path:'account-settings',component:AccountSettingsComponent, data:{title:'Ajustes'}},
            { path:'grafica1',component:Grafica1Component, data:{title:'Grafica Nro. 1'}},
            { path:'progress',component:ProgressComponent, data:{title:'Progress bar'}}, 
            { path:'promesas',component:PromesasComponent, data:{title:'Promesas'}},
            { path:'perfil',component:PerfilComponent, data:{title:'Perfil'}},
            { path:'rxjs',component:RxjsComponent, data:{title:'Rxjs'}},
            //{path:'',redirectTo:'/dashboard',pathMatch:'full'}, 
        ]
    },
      
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
