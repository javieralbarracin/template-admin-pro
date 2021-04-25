import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient ) { }

  async actualizarFoto(
    file:File,
    type:'usuarios'|'medicos'|'hospitales',
    id:string
  ){
      try {
          const url =`${env.endPoint}/uploads/${type}/${id}`;
          const formData=new FormData();
          formData.append('imagen',file);

          const resp = await fetch(url, {
            method:'PUT',
            headers:{
              'x-token':localStorage.getItem('access_token') || ''
            },
            body:formData
          })

          const data = await resp.json();
          if(data.ok){
            return data.nombreArchivo;
          }else{
            return false;
          }
          //return this.http.put(`${env.endPoint}/uploads/${type}/${id}`,formData);
      } catch (error) {
        console.log(error)
        return false
      }
  }
}
