import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentMarksComponent } from './assessment-marks.component';

describe('AssessmentMarksComponent', () => {
  let component: AssessmentMarksComponent;
  let fixture: ComponentFixture<AssessmentMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentMarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
