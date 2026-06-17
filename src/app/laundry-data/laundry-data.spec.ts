import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaundryData } from './laundry-data';

describe('LaundryData', () => {
  let component: LaundryData;
  let fixture: ComponentFixture<LaundryData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaundryData],
    }).compileComponents();

    fixture = TestBed.createComponent(LaundryData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
