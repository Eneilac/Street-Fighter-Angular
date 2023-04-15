import { TestBed } from '@angular/core/testing';

import { ModificarLuchadorAnimacionStageGuardService } from './modificar-luchador-animacion-stage-guard.service';

describe('ModificarLuchadorAnimacionStageGuardService', () => {
  let service: ModificarLuchadorAnimacionStageGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificarLuchadorAnimacionStageGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
