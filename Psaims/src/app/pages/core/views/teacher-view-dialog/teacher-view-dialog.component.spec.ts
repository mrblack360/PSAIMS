import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherViewDialogComponent } from './teacher-view-dialog.component';

describe('TeacherViewDialogComponent', () => {
  let component: TeacherViewDialogComponent;
  let fixture: ComponentFixture<TeacherViewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherViewDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
