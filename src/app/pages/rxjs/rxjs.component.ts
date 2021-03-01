import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  intervalSubs$:Subscription
  constructor() {
   
    // this.retornaObservable().pipe(
    //   //Cantidad de intentos 
    //   //para volver a ejecutar el observer
    //   retry(1)
    // )
    // .subscribe(
    //   value => console.log('Sub: ',value),
    //   error => console.warn('Error: ',error),
    //   () => console.info('observer completado')

    // );

    this.intervalSubs$ = this.retornaIntervalo().subscribe(console.log)
    
  }
  retornaObservable():Observable<number>{
    let i=-1

    return new Observable<number>( observer =>{
      
      const intervalo=setInterval(()=>{
          i++
          observer.next(i)
          if(i===4){
            clearInterval(intervalo)
            observer.complete()
          }
          if(i==2){
            i=0
            clearInterval(intervalo)
            observer.error('error en la secuencia')
          }
        },1000)
    })
  }
  retornaIntervalo():Observable<number>{
    return interval(100)
                      .pipe(
                        //take(4),
                        map(valor => valor+1),
                        filter(valor => (valor%2===0?true:false))
                      )
  }
  ngOnDestroy():void{
    this.intervalSubs$.unsubscribe()
  }
}
