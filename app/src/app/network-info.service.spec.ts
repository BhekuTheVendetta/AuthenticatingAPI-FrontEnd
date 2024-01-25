import { TestBed } from '@angular/core/testing';

import { NetworkInfoService } from './network-info.service';

describe('NetworkInfoService', () => {
  let service: NetworkInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
