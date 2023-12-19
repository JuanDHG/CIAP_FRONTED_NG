import { TestBed } from '@angular/core/testing';

import { DataRoleService } from './data-role.service';

describe('DataRoleService', () => {
  let service: DataRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
