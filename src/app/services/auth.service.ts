import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment as env } from '../../environments/environment';
import { Login } from '../auth/login/login';
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
  authentication(login:Login){
    return this.http.post(`${env.endPoint}/login`,login);
  }
  logout() {
    localStorage.removeItem('access_token');

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
        const {email, google, img='', nombre, role,uid } = resp.usuario;
        this.usuario= new Usuario(nombre,email,'',img, google,role,uid);
        //console.log(this.usuario);
        localStorage.setItem('access_token', resp.token );
        return true;
      }),
      catchError( error => of(false) )
    );

  }
  crearUsuario( formData: RegisterForm ) {
    
    return this.http.post(`${ env.endPoint }/usuarios`, formData )
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('access_token', resp.token )
                })
              )

  }
  actualizarUsuario(data:{ nombre:string, email:string}){
      
      return  this.http.put(`${ env.endPoint }/usuarios/${this.usuario.uid}`,data,{
          headers: {
            'x-token': this.token
          }
        });
  }
  loginGoogle( token ) {
    
    return this.http.post(`${ env.endPoint }/login/google`, { token } )
                .pipe(
                  tap( (resp: any) => {
                    localStorage.setItem('access_token', resp.token )
                  })
                );

  }
}
