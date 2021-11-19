import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit {
  termino = '';
  suscription:Subscription;
  listImagenes:any[] = [];
  loading=false;
  paginaActual = 1;
  imagenesPorPagina = 20;
  totalPorPagina= 0;
  calcularTotalPaginas = 0;
  totalRegistros = 0;
  totalRegistosVisto = 0;
  constructor(private _imageService:ImagenService) { 
    this.suscription = this._imageService.getTerminoBusqueda().subscribe(data=>{
        this.termino = data;
        this.loading = true;
        this.paginaActual = 1;
        this.obtenerImagenes(data,0);

    })
  }

  ngOnInit(): void {
  }

  obtenerImagenes(termino:string, navega:number){
    this._imageService.getImagenes(this.termino, this.imagenesPorPagina, this.paginaActual).subscribe(data=>{
      this.loading = false;
      this.totalRegistros = data.totalHits;
      this.totalPorPagina = data.hits.length;
      if(navega===0){
        this.totalRegistosVisto = this.totalPorPagina;
      }
      else if(navega===1){   
        this.totalRegistosVisto += this.totalPorPagina;
      }
      else if(navega===-1){
        console.log(this.totalPorPagina);
        this.totalRegistosVisto -= this.totalPorPagina;
      }

      if(data.totalHits===0){
        this._imageService.setError('No se encontro ningun resultado');
        return;
      }
      this.calcularTotalPaginas = Math.ceil(data.totalHits / this.imagenesPorPagina);
      this.listImagenes = data.hits;
    }, error=>{
      this._imageService.setError('Opss!!, ocurrio un error');
      this.loading = false;
    });
  }


  paginaAnterior(){
    this.paginaActual--;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes(this.termino,-1);
  }

  paginaSiguiente(){
    this.paginaActual++;
    this.loading = true;
    this.listImagenes = [];
    this.obtenerImagenes(this.termino,1);
  }
}
