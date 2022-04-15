import { Component, OnInit } from '@angular/core';
import { faSave, faArrowRotateLeft, faEraser} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import{ListaCategorias} from '../models/lista-categorias';
import{ WebApiCrudService} from '../services/web-api-crud.service';
import swal from 'sweetalert2';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  id:number = 0;
  public faSave = faSave;
  public faArrowRotateLeft = faArrowRotateLeft;
  public faEraser = faEraser;
  public form:FormGroup;
  public categorias : ListaCategorias[] = [];
  public seHizoSubmit = false;

  constructor(
      private formBuilder: FormBuilder, 
      private servicio : WebApiCrudService,
     private router: Router,
     private activatedRoute: ActivatedRoute) { 
    this.form = formBuilder.group({
      nombre: [null, [Validators.required, Validators.maxLength(250)]],
      precio: ['' ,  [Validators.required, Validators.pattern("^[0-9]*(\.[0-9]{0,2})?$")]],
      cantidad: [null,[Validators.required, Validators.pattern("^[0-9]*$")]],
      categoria: ['',  Validators.required],
      existenciaMinima: ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      imagen: [''],
    });
  }

  ngOnInit(): void {
    this.servicio.getCategorias().subscribe( categorias =>
      this.categorias = categorias
    );
    this.cargarDatos();
  }

  cargarDatos(){
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if(this.id){
        this.servicio.getProductoPorId(this.id).subscribe( producto=>{
          this.form.controls['nombre'].setValue(producto.nombre);
          this.form.controls['precio'].setValue(producto.precio);
          this.form.controls['cantidad'].setValue(producto.cantidad);
          this.form.controls['categoria'].setValue(producto.categoria);
          this.form.controls['existenciaMinima'].setValue(producto.existenciaminima);
        });
      }
    })
  }

  public get ControlesFormularios() {
    return this.form.controls;
  }

 
  Guardar(){
    this.seHizoSubmit = true;
    if (this.form.valid) {
      this.servicio.editarProducto(this.form.value.cantidad,this.form.value.existenciaMinima,
        this.form.value.nombre, this.form.value.precio,this.form.value.categoria, this.id ).subscribe( producto=>{
          this.router.navigate(['/crud'])
          swal.fire('Producto Modificado', "Se ha modificado el producto con éxito", 'success');
      });

    }
  }
}
