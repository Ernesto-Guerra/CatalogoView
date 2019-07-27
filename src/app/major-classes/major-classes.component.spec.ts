import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorClassesComponent } from './major-classes.component';

describe('MajorClassesComponent', () => {
  let component: MajorClassesComponent;
  let fixture: ComponentFixture<MajorClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajorClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
