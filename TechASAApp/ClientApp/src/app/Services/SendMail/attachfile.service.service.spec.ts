import { TestBed } from '@angular/core/testing';

import { AttachfileServiceService } from './attachfile.service.service';

describe('AttachfileServiceService', () => {
  let service: AttachfileServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttachfileServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
