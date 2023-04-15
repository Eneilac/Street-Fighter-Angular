import { TestBed } from '@angular/core/testing';

import { AntesLucharGuardService } from './antes-luchar-guard.service';

describe('AntesLucharGuardService', () => {
  let service: AntesLucharGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AntesLucharGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
