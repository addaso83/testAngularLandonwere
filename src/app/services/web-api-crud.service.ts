import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProductoDTO} from '../models/producto-dto';
import { environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class WebApiCrudService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getProductos(): Observable<ProductoDTO[]>{
  
    return this.http.get(environment.baseUrl + "productosCrud").pipe(
      map(response => response as ProductoDTO[])
    );

  }

 

}
