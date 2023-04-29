/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VehiculosListComponent } from './vehiculos-list.component';
import { Vehiculo } from '../vehiculo';
import { faker } from '@faker-js/faker';
import { VehiculoService } from '../vehiculo.service';
import { of } from 'rxjs';

describe('VehiculosListComponent', () => {
  let component: VehiculosListComponent;
  let fixture: ComponentFixture<VehiculosListComponent>;
  let mockVehiculoService: any;

  beforeEach(async () => {
    mockVehiculoService = jasmine.createSpyObj(['getVehiculos']);

    await TestBed.configureTestingModule({
      declarations: [ VehiculosListComponent ],
      providers: [
        { provide: VehiculoService, useValue: mockVehiculoService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display a table with 3 rows plus header', () => {
    const mockVehiculos:  Vehiculo[] = [
        new Vehiculo(
          faker.datatype.number(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.datatype.number(),
          faker.datatype.number(),
          faker.lorem.sentence(),
          faker.image.imageUrl()
        ),
        new Vehiculo(
          faker.datatype.number(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.datatype.number(),
          faker.datatype.number(),
          faker.lorem.sentence(),
          faker.image.imageUrl()
        ),
        new Vehiculo(
          faker.datatype.number(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.datatype.number(),
          faker.datatype.number(),
          faker.lorem.sentence(),
          faker.image.imageUrl()
        )

      ];

      mockVehiculoService.getVehiculos.and.returnValue(of(mockVehiculos));

    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tr');

    expect(rows.length).toBe(4); // 3 filas más el encabezado

    const headerRow = rows[0].querySelectorAll('th');
    expect(headerRow.length).toBe(4); // 7 columnas

    const dataRows = [...fixture.nativeElement.querySelectorAll('table tbody tr')];
    dataRows.forEach((row: any, index: number) => {
      const cells = row.querySelectorAll('td');
      expect(cells.length).toBe(4); // 4 columnas
      expect(cells[0].textContent).toContain(mockVehiculos[index].id);
      expect(cells[1].textContent).toContain(mockVehiculos[index].marca);
      expect(cells[2].textContent).toContain(mockVehiculos[index].linea);
      expect(cells[3].textContent).toContain(mockVehiculos[index].modelo);

    });
  });
});
