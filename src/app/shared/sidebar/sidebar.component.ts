import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menuItems:any[]
  usuario:Usuario;
  constructor(public sidebarServices:SidebarService,
              private authService:AuthService) { 

    this.menuItems=sidebarServices.menu
    this.usuario = authService.usuario;

  }

  ngOnInit(): void {

  }
  logout(){
    //localStorage.removeItem('access_token')
    this.authService.logout()
    //this.router.navigateByUrl('login')
  }
} 
