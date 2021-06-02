import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAdministrationComponent } from './request-administration.component';

describe('RequestAdministrationComponent', () => {
  let component: RequestAdministrationComponent;
  let fixture: ComponentFixture<RequestAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAdministrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
