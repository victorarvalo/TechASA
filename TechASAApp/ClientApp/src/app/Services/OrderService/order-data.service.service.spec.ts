import { TestBed } from '@angular/core/testing';

import { OrderDataServiceService } from './order-data.service.service';

describe('OrderDataServiceService', () => {
  let service: OrderDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
