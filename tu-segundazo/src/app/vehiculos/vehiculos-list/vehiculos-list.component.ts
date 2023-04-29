import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../vehiculo';
import { VehiculoService } from '../vehiculo.service';

@Component({
  selector: 'app-vehiculos-list',
  templateUrl: './vehiculos-list.component.html',
  styleUrls: ['./vehiculos-list.component.css'],
})
export class VehiculosListComponent implements OnInit {
  vehiculos: Array<Vehiculo> = [];
  contadorMarcas: any;

  constructor(private vehiculoService: VehiculoService) {}

  getVehiculos(): void {
    this.vehiculoService.getVehiculos().subscribe((vehiculos) => {
      this.vehiculos = vehiculos;

      this.contadorMarcas = vehiculos.reduce(function (obj: any = {}, pet) {
        if (!obj[pet.marca]) {
          obj[pet.marca] = 1;
        } else {
          obj[pet.marca]++;
        }
        return obj;
      }, {});
      this.contadorMarcas = Object.entries(this.contadorMarcas);
      console.log(this.contadorMarcas);
    });
  }
  ngOnInit() {
    this.getVehiculos();
  }
}
