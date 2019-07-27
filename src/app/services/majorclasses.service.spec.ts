import { TestBed } from '@angular/core/testing';

import { MajorclassesService } from './majorclasses.service';

describe('MajorclassesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MajorclassesService = TestBed.get(MajorclassesService);
    expect(service).toBeTruthy();
  });
});
