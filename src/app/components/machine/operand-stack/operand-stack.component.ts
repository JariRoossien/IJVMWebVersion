import {Component} from '@angular/core';
import {IjvmMachineControllerService} from "../../../controller/ijvm-machine-controller.service";
import {CommonModule} from "@angular/common";
import {OperandStackType} from "../../../enum/operand-stack-type";

@Component({
  selector: 'app-operand-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './operand-stack.component.html',
  styleUrl: './operand-stack.component.scss'
})
export class OperandStackComponent {

  ijvmService: IjvmMachineControllerService

  constructor(ijvmService: IjvmMachineControllerService) {
    this.ijvmService = ijvmService;
  }

  public getClassFor(index: number): OperandStackType {
    for (const frame of this.ijvmService.ijvmMachine.localFrames) {
      if (index >= frame.lvPointer && index < frame.lvPointer + frame.argCount) {
        return OperandStackType.ARGUMENT;
      }
      if (index >= frame.lvPointer + frame.argCount && index < frame.lvPointer + frame.argCount + frame.lvCount) {
        return OperandStackType.LOCAL_VARIABLE;
      }
    }

    return OperandStackType.STACK_VALUE;
  }
}
