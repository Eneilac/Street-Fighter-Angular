import { TestBed } from '@angular/core/testing';

import { ModificarLuchadorResolveService } from './modificar-luchador-resolve.service';

describe('ModificarLuchadorResolveService', () => {
  let service: ModificarLuchadorResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificarLuchadorResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
