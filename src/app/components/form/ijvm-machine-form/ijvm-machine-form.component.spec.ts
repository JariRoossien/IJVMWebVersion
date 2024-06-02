import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IjvmMachineFormComponent } from './ijvm-machine-form.component';

describe('IjvmMachineFormComponent', () => {
  let component: IjvmMachineFormComponent;
  let fixture: ComponentFixture<IjvmMachineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IjvmMachineFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IjvmMachineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
