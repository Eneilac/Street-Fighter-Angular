import { TestBed } from '@angular/core/testing';

import { CargarLuchadoresService } from './cargar-luchadores.service';

describe('CargarLuchadoresService', () => {
  let service: CargarLuchadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarLuchadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
