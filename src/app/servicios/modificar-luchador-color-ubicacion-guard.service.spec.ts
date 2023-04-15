import { TestBed } from '@angular/core/testing';

import { ModificarLuchadorColorUbicacionGuardService } from './modificar-luchador-color-ubicacion-guard.service';

describe('ModificarLuchadorColorUbicacionGuardService', () => {
  let service: ModificarLuchadorColorUbicacionGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificarLuchadorColorUbicacionGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
