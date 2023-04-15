import { TestBed } from '@angular/core/testing';

import { CargarUsuariosService } from './cargar-usuarios.service';

describe('CargarUsuariosService', () => {
  let service: CargarUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
