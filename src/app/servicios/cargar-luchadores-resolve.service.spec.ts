import { TestBed } from '@angular/core/testing';

import { CargarLuchadoresResolveService } from './cargar-luchadores-resolve.service';

describe('CargarLuchadoresResolveService', () => {
  let service: CargarLuchadoresResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargarLuchadoresResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
