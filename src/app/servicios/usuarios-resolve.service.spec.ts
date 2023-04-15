import { TestBed } from '@angular/core/testing';

import { UsuariosResolveService } from './usuarios-resolve.service';

describe('UsuariosResolveService', () => {
  let service: UsuariosResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
