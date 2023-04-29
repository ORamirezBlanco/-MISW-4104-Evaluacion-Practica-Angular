import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculosListComponent } from './vehiculos-list/vehiculos-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[VehiculosListComponent],
  declarations: [VehiculosListComponent]
})
export class VehiculosModule { }
