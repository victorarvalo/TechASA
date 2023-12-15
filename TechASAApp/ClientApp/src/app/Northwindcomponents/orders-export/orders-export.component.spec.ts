import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersExportComponent } from './orders-export.component';

describe('OrdersExportComponent', () => {
  let component: OrdersExportComponent;
  let fixture: ComponentFixture<OrdersExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersExportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
