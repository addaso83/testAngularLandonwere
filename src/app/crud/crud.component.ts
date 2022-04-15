import { Component,  OnInit } from '@angular/core';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { formularioProducto } from '../models/formularioProducto';
import{ProductoDTO} from '../models/producto-dto';
import{ WebApiCrudService} from '../services/web-api-crud.service';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  public faAdd = faAdd;
  public productos : ProductoDTO[] = [];
  public formulario: formularioProducto = new formularioProducto();
  public filtrarTabla: any = '';
  
 
  constructor(private servicio : WebApiCrudService) { 
 
  }

  ngOnInit(): void {
    this.servicio.getProductos().subscribe( products =>
         this.productos = products
    );
  }

}
