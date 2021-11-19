import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  key:string = '23180936-9210f2eecc23126ad262aaf2a';
  urlBase:string = 'https://pixabay.com/api/?';
  private error$ = new Subject<string>();
  private terminoBusqueda$ = new Subject<string>();
  constructor(private httpClient:HttpClient) { }

  setError(mensaje:string){
    this.error$.next(mensaje);
  }

  getError():Observable<string>{
    return this.error$.asObservable();
  }

  enviarTerminoBusqueda(termino:string){
    this.terminoBusqueda$.next(termino);
  }

  getTerminoBusqueda():Observable<string>{
    return this.terminoBusqueda$.asObservable();
  }

  getImagenes(termino:string,imagenesPorPagina:number,paginasActual:number):Observable<any>{
      return this.httpClient.get(`${this.urlBase}key=${this.key}&q=${termino}&per_page${imagenesPorPagina}&page=${paginasActual}`);
  }
}
