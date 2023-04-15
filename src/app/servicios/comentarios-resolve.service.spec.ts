import { TestBed } from '@angular/core/testing';

import { ComentariosResolveService } from './comentarios-resolve.service';

describe('ComentariosResolveService', () => {
  let service: ComentariosResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComentariosResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
