import { TestBed } from '@angular/core/testing';

import { AssessmentMarksService } from './assessment-marks.service';

describe('AssessmentMarksService', () => {
  let service: AssessmentMarksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessmentMarksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
