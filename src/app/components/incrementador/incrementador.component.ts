import { Component, EventEmitter, Input,Output,OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  //@Input('valor') progreso:number=50;
  @Input() progreso:number=10;
  @Input() btnClass:string='btn-primary';
  
  @Output()valorEmitido:EventEmitter<number>=new EventEmitter();
  
  ngOnInit(): void {
    this.btnClass=`btn + ${this.btnClass}` 
  }
  // get getPorcentaje(){
  //   return `${this.progreso}%`
  // }
  cambiarValor(valor:number){
    this.emitirValor(valor)
  } 
  onChange(value:number){
      this.emitirValor(value)
  }
  emitirValor(valor:number){
    if(valor>=100){
       this.progreso=100;
    }else if(valor<=0){
      this.progreso=0
    }else{
      this.progreso=valor;
    }
    this.valorEmitido.emit(this.progreso)
    // if(this.progreso>=100 && valor>=0){
    //   this.valorEmitido.emit(100)
    //   return this.progreso=100;
    // }
    // if(this.progreso<=0 && valor<0){
    //   this.valorEmitido.emit(0)      
    //   return this.progreso=0
    // }
    // this.progreso=this.progreso+valor
    // this.valorEmitido.emit(this.progreso)
  }
}
