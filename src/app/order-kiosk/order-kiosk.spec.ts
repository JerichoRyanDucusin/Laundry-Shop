import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderKiosk } from './order-kiosk';

describe('OrderKiosk', () => {
  let component: OrderKiosk;
  let fixture: ComponentFixture<OrderKiosk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderKiosk],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderKiosk);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
