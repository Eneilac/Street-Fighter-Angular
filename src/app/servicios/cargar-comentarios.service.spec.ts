import { TestBed } from '@angular/core/testing';

import { CargarComentariosService } from './cargar-comentarios.service';

describe('CargarComentariosService', () => {
  let service: CargarComentariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarComentariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
