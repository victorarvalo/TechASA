import { TestBed } from '@angular/core/testing';

import { ExportxlsxServiceService } from './exportxlsx.service.service';

describe('ExportxlsxServiceService', () => {
  let service: ExportxlsxServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportxlsxServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
