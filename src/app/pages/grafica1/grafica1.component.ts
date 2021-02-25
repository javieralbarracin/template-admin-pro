import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {
  public labels1:string[]=['gasto en viaje', 'gasto en mascota', 'gasto en servicios'];
  public data1 = [
    [200, 80, 380],
  ];
  constructor() { }

  ngOnInit(): void {
  }

  

}
