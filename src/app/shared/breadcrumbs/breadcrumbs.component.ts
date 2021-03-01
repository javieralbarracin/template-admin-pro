import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { instances } from 'chart.js';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public titulo:string=''
  public tituloSubs$:Subscription;

  constructor(private router:Router) { 
    this.tituloSubs$ = this.getTitleRoute()
                           .subscribe(({title})=>{
                            this.titulo=title
                            document.title=`AdminPro - ${title}`
                        })
  }
  ngOnDestroy(): void {
   this.tituloSubs$.unsubscribe()
  }

  getTitleRoute(){
    return this.router.events
          .pipe(
            filter(event=> event instanceof ActivationEnd),
            filter( (evento:ActivationEnd) => evento.snapshot.firstChild==null),
            map( (evento:ActivationEnd) => evento.snapshot.data)
          );
    //.subscribe(data=>{
    
  }

}
