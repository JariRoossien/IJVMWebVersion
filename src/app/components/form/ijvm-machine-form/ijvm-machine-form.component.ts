import { Component } from '@angular/core';
import {IjvmMachineControllerService} from "../../../controller/ijvm-machine-controller.service";

@Component({
  selector: 'app-ijvm-machine-form',
  standalone: true,
  imports: [],
  templateUrl: './ijvm-machine-form.component.html',
  styleUrl: './ijvm-machine-form.component.scss'
})
export class IjvmMachineFormComponent {

  ijvmController: IjvmMachineControllerService;

  constructor(ijvmController: IjvmMachineControllerService) {
    this.ijvmController = ijvmController;
  }

  onFileUploadChange(files: Event): void {
    const event: HTMLInputElement = <HTMLInputElement> files.target;
    const fileList: FileList | null = event.files;
    if (fileList == null) return;
    const file: File | null = fileList.item(0);
    if (file != null)
      this.ijvmController.loadBinary(file);
  }

  onStepClick(): void {
    this.ijvmController.performStep();
    console.log(this.ijvmController.ijvmMachine);
  }

  onRunClick(): void {
    this.ijvmController.runUntilStop();
    console.log(this.ijvmController.ijvmMachine);
  }
}
