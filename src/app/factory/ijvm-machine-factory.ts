import {IjvmMachine} from "../entity/ijvm-machine";

export class IjvmMachineFactory {

  constantNumbers: Array<number> = new Array<number>()
  textField: Array<number> = new Array<number>()

  constructor() {

  }

  public static newFactory(): IjvmMachineFactory {
    return new IjvmMachineFactory();
  }

  setConstants(numbers: Array<number>): IjvmMachineFactory {
    this.constantNumbers = Object.assign([], numbers);
    return this;
  }

  setTextField(text: Array<number>): IjvmMachineFactory {
    this.textField = Object.assign([], text);
    return this;
  }

  build(): IjvmMachine {
    return new IjvmMachine(this.constantNumbers, this.textField);
  }


}
