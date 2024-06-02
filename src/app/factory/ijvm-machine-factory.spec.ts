import { IjvmMachineFactory } from './ijvm-machine-factory';
import {IjvmMachine} from "../entity/ijvm-machine";

describe('IjvmMachineFactory', () => {
  it('should create an instance', () => {
    expect(new IjvmMachineFactory()).toBeTruthy();
  });

  it('should build empty ijvm machine', () => {
    let factory: IjvmMachineFactory = new IjvmMachineFactory();
    let machine: IjvmMachine = factory.build();
    expect(machine.programCounter).toEqual(0);
    expect(machine.ijvmConstants).toEqual(new Array<number>());
    expect(machine.ijvmText).toEqual(new Array<number>());
    expect(machine.operandStack).toEqual(new Array<number>());
  });

  it('Should put constants into IJVM program', () => {
    let factory: IjvmMachineFactory = new IjvmMachineFactory().setConstants(Array.of(0x0, 0xCAFE, 0x1));
    let machine: IjvmMachine = factory.build();
    expect(machine).toBeTruthy();
    expect(machine.programCounter).toEqual(0);
    expect(machine.ijvmConstants.length).toEqual(3);
    expect(machine.ijvmConstants[0]).toEqual(0x0);
    expect(machine.ijvmConstants[1]).toEqual(0xCAFE);
    expect(machine.ijvmConstants[2]).toEqual(0x1);
    expect(machine.ijvmText).toEqual(new Array<number>());
  });

  it('Cannot change constants after building ijvm program', () => {
    let constantField: Array<number> = Array.of(0x0, 0x1, 0x2);
    let factory: IjvmMachineFactory = new IjvmMachineFactory().setConstants(constantField);
    let machine: IjvmMachine = factory.build();

    expect(machine.ijvmConstants.length).toEqual(3);

    constantField[0] = 0x3;
    expect(machine.ijvmConstants[0]).toEqual(0x0);

    constantField.push(0x4);
    expect(machine.ijvmConstants.length).toEqual(3);
  });


});

