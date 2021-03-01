import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    // const promesa= new Promise( (resolve, reject) =>{
    //   if( false ){
    //     resolve('Hello promise')
    //   }else{
    //     reject('Algo salió mal')
    //   }
    // })

    // promesa.then( (resultado)=>{
    //   console.log(resultado);
    // })
    // .catch( error =>{
    //   console.warn(error)
    // })

    // console.log('Fin del init');

    this.getUsuarios().then( usuarios=>{
      console.log(usuarios)
    })
  }
  getUsuarios(){
      return new Promise( resolve =>{
      
        let url:string='https://reqres.in/api/users'
        fetch(url)
          .then( resp => resp.json()
          .then( body => resolve(body.data)));          
      });
  }
}
