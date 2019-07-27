import { TestBed, async, inject } from '@angular/core/testing';

import { StudentGuard } from './student.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentGuard]
    });
  });

  it('should ...', inject([StudentGuard], (guard: StudentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
