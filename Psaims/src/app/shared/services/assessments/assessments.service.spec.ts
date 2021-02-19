import { TestBed } from '@angular/core/testing';

import { AssessmentsService } from './assessments.service';

describe('AssessmentsService', () => {
  let service: AssessmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
