import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentForm2Component } from './student-form2.component';

describe('StudentForm2Component', () => {
  let component: StudentForm2Component;
  let fixture: ComponentFixture<StudentForm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentForm2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
