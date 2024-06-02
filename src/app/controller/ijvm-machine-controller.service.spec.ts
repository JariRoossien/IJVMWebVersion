import { TestBed } from '@angular/core/testing';

import { IjvmMachineControllerService } from './ijvm-machine-controller.service';

describe('IjvmMachineControllerService', () => {
  let service: IjvmMachineControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IjvmMachineControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
