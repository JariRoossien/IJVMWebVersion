import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {IjvmMachineFormComponent} from "./components/form/ijvm-machine-form/ijvm-machine-form.component";
import {IjvmMachineControllerService} from "./controller/ijvm-machine-controller.service";
import {FormsModule} from "@angular/forms";
import {OperandStackComponent} from "./components/machine/operand-stack/operand-stack.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, RouterOutlet, IjvmMachineFormComponent, FormsModule, OperandStackComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'IJVMWebVersion';
  ijvmService: IjvmMachineControllerService;

  constructor(ijvmService: IjvmMachineControllerService) {
    this.ijvmService = ijvmService;
  }

  onInputChange(change: String): void {

  }

}
