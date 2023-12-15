import { TestBed } from '@angular/core/testing';

import { ProductDataServicesService } from './product-data.services.service';

describe('ProductDataServicesService', () => {
  let service: ProductDataServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDataServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
