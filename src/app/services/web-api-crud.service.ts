import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProductoDTO} from '../models/producto-dto';
import{ListaCategorias} from '../models/lista-categorias';
import { environment} from '../../environments/environment';
import{ProductoCreate} from '../models/productoCreate'

@Injectable({
  providedIn: 'root'
})
export class WebApiCrudService {
  producto: ProductoCreate = new ProductoCreate();
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getProductos(): Observable<ProductoDTO[]>{
    return this.http.get(environment.baseUrl + "productosCrud").pipe(
      map(response => response as ProductoDTO[])
    );
  }

  getCategorias(): Observable<ListaCategorias[]>{
    return this.http.get(environment.baseUrl + "categorias").pipe(
      map(response => response as ListaCategorias[])
    );
  }

 guardaProducto(
  cantidad:number,
  existenciaminima:number, 
  nombre:string, 
  precio:number, 
  categoria: number ):Observable<ProductoCreate>{
     
      this.producto.cantidad = cantidad;
      this.producto.categoria = categoria;
      this.producto.precio = precio;
      this.producto.existenciaminima = existenciaminima;
      this.producto.nombre = nombre;
     
    return this.http.post<ProductoCreate>(environment.baseUrl + "productos",this.producto, {headers: this.httpHeaders});
 }

 editarProducto(
  cantidad:number,
  existenciaminima:number, 
  nombre:string, 
  precio:number, 
  categoria: number,
  id:number
  ):Observable<ProductoCreate>{
     
      this.producto.cantidad = cantidad;
      this.producto.categoria = categoria;
      this.producto.precio = precio;
      this.producto.existenciaminima = existenciaminima;
      this.producto.nombre = nombre;
      this.producto.id = id;
      return this.http.put<ProductoCreate>(`${environment.baseUrl+"productos/"}${this.producto.id}`, this.producto, {headers: this.httpHeaders})
 }


 getProductoPorId(id:number): Observable<ProductoCreate>{
  return this.http.get(environment.baseUrl + "productosById/" + id).pipe(
    map(response => response as ProductoCreate)
  );
}

borrarProducto(id: number): Observable<ProductoCreate>{
  return this.http.delete<ProductoCreate>(`${environment.baseUrl+"productosDelete/"}${id}`, {headers: this.httpHeaders})
}

}
