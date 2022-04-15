export class ProductoDTO {

    nombre : string = "";
    categoria : string = ""; 
    precio : number = 0;
    cantidad: number = 0;
    productoId:number=0;
    inventario:string = "";
    filtro :string = "";
    constructor(
        nombre : string, categoria : string,
         precio : number, cantidad: number,
        inventario:string, productoId:number){
      this.nombre = nombre;
      this.categoria = categoria;
      this.precio = precio;
      this.cantidad = cantidad;
      this.inventario = inventario;
      this.productoId = productoId;
    }
    
}
