import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewInterventionComponent } from './create-new-intervention.component';

describe('CreateNewInterventionComponent', () => {
  let component: CreateNewInterventionComponent;
  let fixture: ComponentFixture<CreateNewInterventionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewInterventionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewInterventionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
