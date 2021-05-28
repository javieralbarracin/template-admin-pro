import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Login } from './login';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  savedUserEmail = localStorage.getItem('savedUserEmail');

  public auth2: any;

  loginForm:FormGroup=this.fb.group({
    email: new FormControl('javier19@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(this.savedUserEmail !== null)
  });

  constructor(
    private router:Router, 
    private ngZone: NgZone,
    private fb:FormBuilder,
    private authService:AuthService) { }

  ngOnInit(): void {
    // const savedUserEmail = localStorage.getItem('savedUserEmail');
    // this.loginForm = new FormGroup({
    //   email: new FormControl('javier19@gmail.com', [Validators.required, Validators.email]),
    //   password: new FormControl('', Validators.required),
    //   rememberMe: new FormControl(savedUserEmail !== null)
    // });
    this.renderButton();
  }
  login(){
    let login:Login= Object.assign({}, this.loginForm.value);
    const rememberMe = this.loginForm.get('rememberMe').value;
    this.authService.authentication(login).subscribe(resp=>{
        //console.log('resp-->',resp)
        if(resp['ok']){
          //localStorage.setItem('access_token', resp['token']);
          this.router.navigateByUrl('/dashboard')
        }
        if (rememberMe) {
            localStorage.setItem('savedUserEmail', login.email);
        } else {
            localStorage.removeItem('savedUserEmail');
        }
      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error' );
      });
  }
  onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }
  onFailure(error) {
    console.log(error);
  }
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();

  }

  async startApp() {
    
    await this.authService.googleInit();
    this.auth2 = this.authService.auth2;

    this.attachSignin( document.getElementById('my-signin2') );
    
  };

  attachSignin(element) {
    this.auth2.attachClickHandler( element, {},
      (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          // console.log(id_token);
          this.authService.loginGoogle( id_token )
            .subscribe( resp => {
              // Navegar al Dashboard
              this.ngZone.run( () => {
                this.router.navigateByUrl('/');
              })
            });

      }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
      });
  }
}
