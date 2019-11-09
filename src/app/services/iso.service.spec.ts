import { TestBed } from '@angular/core/testing';

import { IsoService } from './iso.service';

describe('IsoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsoService = TestBed.get(IsoService);
    expect(service).toBeTruthy();
  });
});
