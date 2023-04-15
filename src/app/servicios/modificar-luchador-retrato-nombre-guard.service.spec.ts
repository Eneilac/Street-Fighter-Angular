import { TestBed } from '@angular/core/testing';

import { ModificarLuchadorRetratoNombreGuardService } from './modificar-luchador-retrato-nombre-guard.service';

describe('ModificarLuchadorRetratoNombreGuardService', () => {
  let service: ModificarLuchadorRetratoNombreGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificarLuchadorRetratoNombreGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
