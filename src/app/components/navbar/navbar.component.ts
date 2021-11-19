import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  titleProyect:string;
  
  constructor() { 
    this.titleProyect = 'MAGRENDER';
  }

  ngOnInit(): void {
  }

}
