import { TestBed } from '@angular/core/testing';

import { ModificarLuchadorAtributosGuardService } from './modificar-luchador-atributos-guard.service';

describe('ModificarLuchadorAtributosGuardService', () => {
  let service: ModificarLuchadorAtributosGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificarLuchadorAtributosGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
