import {IjvmLocalFrame} from "./ijvm-local-frame";

export class IjvmMachine {

  public static IJVM_CONSTANT: number = 0x1DEADFAD

  // Assignment 2
  public static OP_BIPUSH: number = 0x10;
  public static OP_DUP: number = 0x59;
  public static OP_IADD: number = 0x60;
  public static OP_IAND: number = 0x7E;
  public static OP_IOR: number = 0xB0;
  public static OP_ISUB: number = 0x64;
  public static OP_NOP: number = 0x00;
  public static OP_POP: number = 0x57;
  public static OP_SWAP: number = 0x5F;
  public static OP_ERR: number = 0xFE;
  public static OP_HALT: number = 0xFF;
  public static OP_OUT: number = 0xFD;
  public static OP_IN: number = 0xFC;

  // Assignment 3
  public static OP_GOTO: number = 0xA7;
  public static OP_IFEQ: number = 0x99;
  public static OP_IFLT: number = 0x9B;
  public static OP_IF_ICMPEQ: number = 0x9F;

  // Assignment 4
  public static OP_LDC_W: number = 0x13;
  public static OP_IINC: number = 0x84;
  public static OP_ILOAD: number = 0x15;
  public static OP_ISTORE: number = 0x36;
  public static OP_WIDE: number = 0xC4;

  // Assignment 5
  public static OP_INVOKEVIRTUAL: number = 0xB6;
  public static OP_IRETURN: number = 0xAC;

  public programCounter: number;
  public lvPointer: number = 0;
  public readonly operandStack: Array<number>;
  public output: string = "";
  public input: string = "";
  public wide: boolean = false;
  public finished: boolean = false;
  public localFrames: Array<IjvmLocalFrame>;

  constructor(
    public readonly ijvmConstants: Array<number>,
    public readonly ijvmText: Array<number>
  ) {
    this.programCounter = 0;
    this.operandStack = new Array<number>(256)
    this.localFrames = new Array<IjvmLocalFrame>();
    this.localFrames.push(new IjvmLocalFrame(0, 0, 256));
  }

  public getLocalVariable(offset: number): number {
    return this.operandStack[this.lvPointer + offset];
  }

  public storeLocalVariable(value: number, offset: number): void {
    this.operandStack[this.lvPointer + offset] = value;
  }


}
