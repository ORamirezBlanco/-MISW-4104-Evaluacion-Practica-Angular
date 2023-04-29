/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { VehiculoService } from './vehiculo.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Vehiculo } from './vehiculo';
import { faker } from '@faker-js/faker';

describe('Service: Vehiculo', () => {
  let service: VehiculoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehiculoService]
    });

    service = TestBed.inject(VehiculoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getVehuculos', () => {
    it('should return an Observable<Vehiculo[]>', () => {
      const dummyVehiculos: Vehiculo[] = [
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
        ),

      ];

      service.getVehiculos().subscribe((Vehiculo) => {
        expect(Vehiculo.length).toBe(3);
        expect(Vehiculo).toEqual(dummyVehiculos);
      });



      const req = httpMock.expectOne('https://gist.githubusercontent.com/josejbocanegra/17bb8c76405e43655d551a90800c8a81/raw/d41b4acc3457e51e7533fad6d5e9925ee9676457/202212_MISW4104_Grupo1.json');
      expect(req.request.method).toBe('GET');
      req.flush(dummyVehiculos);
    });
  });


});
