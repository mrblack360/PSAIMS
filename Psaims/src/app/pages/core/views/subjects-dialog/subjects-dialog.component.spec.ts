import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsDialogComponent } from './subjects-dialog.component';

describe('SubjectsDialogComponent', () => {
  let component: SubjectsDialogComponent;
  let fixture: ComponentFixture<SubjectsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
