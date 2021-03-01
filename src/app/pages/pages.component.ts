import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
 
  constructor(private settingsServices:SettingsService) { }

  ngOnInit(): void {
    //this.themeApp()
    customInitFunctions();
  }
  // themeApp(){   
  //  const url = localStorage.getItem('theme') || `./assets/css/colors/default.css`
  //  this.linkTheme.setAttribute('href',url)
   
  // }

}
