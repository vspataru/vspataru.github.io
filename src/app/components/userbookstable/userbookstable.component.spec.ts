import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbookstableComponent } from './userbookstable.component';

describe('UserbookstableComponent', () => {
  let component: UserbookstableComponent;
  let fixture: ComponentFixture<UserbookstableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserbookstableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserbookstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
