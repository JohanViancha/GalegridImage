import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  error:string = '';
  mostrar:boolean = false;
  suscripcion:Subscription;

  constructor(private _imageService:ImagenService) { 
    this.suscripcion = this._imageService.getError().subscribe(data=>{
      this.mostrarMensaje();
      this.error = data;
    });
  }

  ngOnInit(): void {
  }

  mostrarMensaje(){
    this.mostrar = true;
    setTimeout(()=>{
      this.mostrar = false;
    },2000)
  }

  ngOnDestroy(): void {
   
    this.suscripcion.unsubscribe();
    
  }
}
