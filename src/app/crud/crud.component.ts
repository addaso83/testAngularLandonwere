import { Component,  OnInit } from '@angular/core';
import { faAdd, faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import { formularioProducto } from '../models/formularioProducto';
import{ProductoDTO} from '../models/producto-dto';
import{ WebApiCrudService} from '../services/web-api-crud.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html'
})
export class CrudComponent implements OnInit {
  public faAdd = faAdd;
  public faEdit = faEdit;
  public faTrash = faTrash;
  public productos : ProductoDTO[] = [];
  public formulario: formularioProducto = new formularioProducto();
  public filtrarTabla: any = '';
  
 
  constructor(private servicio : WebApiCrudService) { 
 
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(){
    this.servicio.getProductos().subscribe( products =>
      this.productos = products
     );
  }

  borrar(id:number){

    swal.fire({
      title: 'Está seguro?',
      text: `¿Desea eliminar el producto?`,
      showCancelButton: true,
      buttonsStyling: true,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.servicio.borrarProducto(id).subscribe(
          response => {
            this.cargarProductos();
            swal.fire(
              'Producto Eliminado!',
              `Producto eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
    
  }

}
