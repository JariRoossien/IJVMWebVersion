import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperandStackRowComponent } from './operand-stack-row.component';

describe('OperandStackRowComponent', () => {
  let component: OperandStackRowComponent;
  let fixture: ComponentFixture<OperandStackRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperandStackRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperandStackRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
