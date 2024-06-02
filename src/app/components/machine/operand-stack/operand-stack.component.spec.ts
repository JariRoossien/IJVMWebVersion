import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperandStackComponent } from './operand-stack.component';

describe('OperandStackComponent', () => {
  let component: OperandStackComponent;
  let fixture: ComponentFixture<OperandStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperandStackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperandStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
