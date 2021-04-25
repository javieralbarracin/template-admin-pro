import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm:FormGroup;
  public usuario:Usuario;
  public imagenSubir:File;
  public imgTemp:any='';
  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private fileService:FileUploadService) {
    this.usuario=authService.usuario;
   }

  ngOnInit(): void {
      this.perfilForm=this.fb.group({
          nombre:[this.usuario.nombre,[Validators.required]],
          email:[this.usuario.email,[Validators.required]]
      });
  }
  actualizarPerfil(){
    this.authService.actualizarUsuario(this.perfilForm.value).subscribe((resp:any)=>{
        if(resp.ok){
          const { nombre, email }=resp
          this.usuario.nombre=nombre
          this.usuario.email=email

          Swal.fire('Guardado','Los cambios fueron actualizados','success');
        }
    },(err) =>{
        Swal.fire('Error',err.error.msg,'error');
    });
  }
  actualizarFoto(){
      this.fileService.actualizarFoto(this.imagenSubir,'usuarios',this.usuario.uid)
      .then(resp=>{
        //console.log('respuesta uploads',resp)
        this.usuario.img=resp
        Swal.fire('Cambio de imagen','Los cambios fueron actualizados','success');
      }).catch( err => {
          console.log(err)
          Swal.fire('Error','No se puedo subir la imagen','error');
      });
  }
  cambiarImagen(event){
    this.imagenSubir=event.target.files[0]

    if(!this.imagenSubir){
      return this.imgTemp=null;
    }

    const reader= new FileReader();
    reader.readAsDataURL( this.imagenSubir );
    reader.onloadend= ()=>{
          //console.log(reader.result)
          this.imgTemp=reader.result
    }
    //console.log(event.target.files[0])
  }

}
