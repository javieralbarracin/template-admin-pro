import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu:[]=[];

  constructor(private router: Router) { }

  cargarMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];

    if( this.menu.length === 0 ){
      this.router.navigateByUrl('login');
    }
  }
  // menu:any[]=[
  //   {
  //     title:'Dashboard',
  //     icon:'mdi mdi-gauge',
  //     submenu:[
  //       { titulo:'Main', url:'/'},
  //       { titulo:'Progress Bar', url:'progress'},
  //       { titulo:'Grafica 1', url:'grafica1'},
  //       { titulo:'Promesas', url:'promesas'},
  //       { titulo:'Rxjs', url:'rxjs'},
  //     ]
  //   },
  //   {
  //     title:'Mantenimiento',
  //     icon:'mdi mdi-folder-lock-open',
  //     submenu:[
  //       { titulo:'Usuarios', url:'usuarios'},
  //       { titulo:'Hospitales', url:'hospitales'},
  //       { titulo:'Medicos', url:'medicos'},
        
  //     ]
  //   }
  // ]


}
