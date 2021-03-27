import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderCriteriaAssignmentComponent } from './provider-criteria-assignment.component';

describe('ProviderCriteriaAssignmentComponent', () => {
  let component: ProviderCriteriaAssignmentComponent;
  let fixture: ComponentFixture<ProviderCriteriaAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderCriteriaAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderCriteriaAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
