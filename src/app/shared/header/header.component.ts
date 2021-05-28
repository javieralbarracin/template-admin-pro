import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  usuario:Usuario;
  constructor(
      private router:Router,
      private authService:AuthService) {
        this.usuario=authService.usuario;
   }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logout()    
  }
  buscar(termino:string){
    if( termino.length===0 ){
      //this.router.navigateByUrl(`/dashboard`);
      return;
    }
    this.router.navigateByUrl(`dashboard/busqueda/${termino}`)
  }
}
