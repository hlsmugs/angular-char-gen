import { TestBed } from '@angular/core/testing';

import { BrowserStorageServerService } from './browser-storage-server.service';

describe('BrowserStorageServerService', () => {
  let service: BrowserStorageServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserStorageServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
