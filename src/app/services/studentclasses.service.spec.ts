import { TestBed } from '@angular/core/testing';

import { StudentclassesService } from './studentclasses.service';

describe('StudentclassesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentclassesService = TestBed.get(StudentclassesService);
    expect(service).toBeTruthy();
  });
});
