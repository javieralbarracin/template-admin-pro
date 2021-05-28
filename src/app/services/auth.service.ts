import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

import { environment as env } from '../../environments/environment';
import { Login } from '../auth/login/login';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

declare const gapi: any;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public auth2: any;
  public usuario:Usuario;
  constructor(private http:HttpClient,
              private router: Router,
              private ngZone: NgZone) {
    this.googleInit();
  }
  get token():string{
      return localStorage.getItem('access_token') || '';
  }
  get uid():string{
    return this.usuario.uid || '';
  }
  get headers(){
    return {
        headers: {
        'x-token': this.token
      }
    }
  }
  get role():'ADMIN_ROLE' | 'USER_ROLE'{
    return this.usuario.role;
  }
  get menu(){
    return localStorage.getItem( 'menu' ) || '';
  }
  guardarLocalStorage(token:string, menu:any){
    localStorage.setItem('access_token', token );
    localStorage.setItem('menu', JSON.stringify(menu) );
  }
  googleInit() {

    return new Promise( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: env.client_id,
          cookiepolicy: 'single_host_origin',
        });

        resolve(null);
      });
    })

  }
  loginGoogle( token ) {
    
    return this.http.post(`${ env.endPoint }/login/google`, { token } )
                .pipe(
                  tap( (resp: any) => {
                    this.guardarLocalStorage(resp.token,resp.menu);
                  })
                );

  }
  authentication(login:Login){
    return this.http.post(`${env.endPoint}/login`,login).pipe(
      tap( (resp: any) => {
        this.guardarLocalStorage(resp.token,resp.menu);
      })
    );
  }
  logout() {
    localStorage.removeItem('access_token');

    // Borrar menu

    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });

  }
  validarToken(): Observable<boolean> {
    //const token = localStorage.getItem('access_token') || '';

    return this.http.get(`${ env.endPoint }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        //console.log(resp)
        const { email, google, img = '', nombre, role,uid } = resp.usuario;
        this.usuario = new Usuario(nombre,email,'',img, google,role,uid);
        this.guardarLocalStorage(resp.token,resp.menu);
        return true;
      }),
      catchError( error => of(false) )
    );

  }
  crearUsuario( formData: RegisterForm ) {
    
    return this.http.post(`${ env.endPoint }/usuarios`, formData )
              .pipe(
                tap( (resp: any) => {
                  this.guardarLocalStorage(resp.token,resp.menu);
                })
              )

  }
  actualizarUsuario(usuario:Usuario){ 
      return  this.http.put(`${ env.endPoint }/usuarios/${usuario.uid}`,usuario,this.headers);
  }
  actualizarPerfil(data:{ nombre:string, email:string, role:string}){ 
     data={
       ...data,
       role:this.usuario.role
     }     
      return  this.http.put(`${ env.endPoint }/usuarios/${this.usuario.uid}`,data,this.headers);
  }
  cargarUsuarios(desde:number=0){
    return this.http.get<CargarUsuario>(`${ env.endPoint }/usuarios?desde=${ desde }`,this.headers)
    .pipe(
      //delay(3000),
      map( resp => {
        const usuarios = resp.usuarios.map(user=> new Usuario(user.nombre,user.email,user.password,user.img,user.google,user.role,user.uid));
        return {
          total:resp.total,
          usuarios
        }
      })
    );
  }
  eliminarUsuario(uid:string){
    return this.http.delete(`${ env.endPoint }/usuarios/${ uid }`,this.headers);
  }
}
