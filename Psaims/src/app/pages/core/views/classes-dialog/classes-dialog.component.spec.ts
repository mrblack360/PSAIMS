import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesDialogComponent } from './classes-dialog.component';

describe('ClassesDialogComponent', () => {
  let component: ClassesDialogComponent;
  let fixture: ComponentFixture<ClassesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
