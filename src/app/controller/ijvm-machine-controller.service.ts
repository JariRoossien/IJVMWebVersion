import { Injectable } from '@angular/core';
import {IjvmMachine} from "../entity/ijvm-machine";
import {BinaryIjvmConverter} from "../converter/binary-ijvm-converter";
import {IjvmLocalFrame} from "../entity/ijvm-local-frame";

@Injectable({
  providedIn: 'root'
})
export class IjvmMachineControllerService {

  public ijvmMachine: IjvmMachine = new IjvmMachine(new Array<number>(), new Array<number>());

  constructor() { }

  public loadBinary(file: File): void {
    BinaryIjvmConverter.convertFileToIjvmMachine(file).then(machine => {
      this.ijvmMachine = machine;
    }).catch((err) => {
      console.log(err);
      this.ijvmMachine = new IjvmMachine(new Array<number>(), new Array<number>());
    });
  }

  public runUntilStop(): void {
    while (!this.ijvmMachine.finished) {
      this.performStep();
    }
  }

  public performStep(): boolean {
    if (this.ijvmMachine == null) return false;
    if (this.ijvmMachine.finished) return false;
    const currOperation = this.ijvmMachine.ijvmText[this.ijvmMachine.programCounter++];
    if (currOperation == null) return false;
    console.log("Operation: " + currOperation.toString(16));
    switch (currOperation) {
      case IjvmMachine.OP_BIPUSH:
        this.opBiPush(this.ijvmMachine);
        break;
      case IjvmMachine.OP_DUP:
        this.opDup(this.ijvmMachine);
        break;
      case IjvmMachine.OP_IADD:
        this.opIAdd(this.ijvmMachine);
        break;
      case IjvmMachine.OP_IAND:
        this.opIAnd(this.ijvmMachine);
        break;
      case IjvmMachine.OP_IOR:
        this.opIOr(this.ijvmMachine);
        break;
      case IjvmMachine.OP_ISUB:
        this.opIsub(this.ijvmMachine);
        break;
      case IjvmMachine.OP_NOP:
        break;
      case IjvmMachine.OP_POP:
        this.ijvmMachine.operandStack.pop();
        break;
      case IjvmMachine.OP_ERR:
        this.ijvmMachine.finished = true;
        break;
      case IjvmMachine.OP_HALT:
        this.ijvmMachine.finished = true;
        break;
      case IjvmMachine.OP_SWAP:
        this.opISwap(this.ijvmMachine);
        break;
      case IjvmMachine.OP_IN:
        this.opIIn(this.ijvmMachine);
        break;
      case IjvmMachine.OP_OUT:
        this.opIOut(this.ijvmMachine);
        break;
      case IjvmMachine.OP_GOTO:
          this.opGoto(this.ijvmMachine);
          break;
      case IjvmMachine.OP_IFEQ:
          this.opIfeq(this.ijvmMachine);
          break;
      case IjvmMachine.OP_IFLT:
        this.opIflt(this.ijvmMachine);
        break;
      case IjvmMachine.OP_IF_ICMPEQ:
        this.opIF_icmpeq(this.ijvmMachine);
        break;
      case IjvmMachine.OP_LDC_W:
        this.opLdc_w(this.ijvmMachine);
        break;
      case IjvmMachine.OP_ILOAD:
        this.opILoad(this.ijvmMachine);
        break;
      case IjvmMachine.OP_ISTORE:
        this.opIStore(this.ijvmMachine);
        break;
      case IjvmMachine.OP_IINC:
        this.opIInc(this.ijvmMachine);
        break;
      case IjvmMachine.OP_WIDE:
        this.opWide(this.ijvmMachine);
        break;
      case IjvmMachine.OP_INVOKEVIRTUAL:
        this.opInvokeVirtual(this.ijvmMachine);
        break;
      case IjvmMachine.OP_IRETURN:
        this.opIReturn(this.ijvmMachine);
        break;

      default:
        console.log(`Not found: ${currOperation.toString(16)}`);
    }
    if (this.ijvmMachine.programCounter >= this.ijvmMachine.ijvmText.length){
      this.ijvmMachine.finished = true;
    }
    return true;
  }

  public opBiPush(ijvmMachine: IjvmMachine): void {
    const byte = ijvmMachine.ijvmText[ijvmMachine.programCounter++];
    ijvmMachine.operandStack.push(byte);
  }

  public opDup(ijvmMachine: IjvmMachine): void {
    const toDup = ijvmMachine.operandStack.pop() ?? 0;
    ijvmMachine.operandStack.push(toDup);
    ijvmMachine.operandStack.push(toDup);
  }

  public opIAdd(ijvmMachine: IjvmMachine): void {
    const val1 = ijvmMachine.operandStack.pop() ?? 0;
    const val2 = ijvmMachine.operandStack.pop() ?? 0;
    ijvmMachine.operandStack.push(val1 + val2);
  }

  public opIAnd(ijvmMachine: IjvmMachine): void {
    const val1 = ijvmMachine.operandStack.pop() ?? 0;
    const val2 = ijvmMachine.operandStack.pop() ?? 0;
    ijvmMachine.operandStack.push(val1 & val2);
  }

  public opIOr(ijvmMachine: IjvmMachine): void {
    const val1 = ijvmMachine.operandStack.pop() ?? 0;
    const val2 = ijvmMachine.operandStack.pop() ?? 0;
    ijvmMachine.operandStack.push(val1 | val2);
  }

  public opIsub(ijvmMachine: IjvmMachine): void {
    const val1 = ijvmMachine.operandStack.pop() ?? 0;
    const val2 = ijvmMachine.operandStack.pop() ?? 0;
    ijvmMachine.operandStack.push(val2 - val1);
  }

  public opISwap(ijvmMachine: IjvmMachine): void {
    const val1 = ijvmMachine.operandStack.pop() ?? 0;
    const val2 = ijvmMachine.operandStack.pop() ?? 0;
    ijvmMachine.operandStack.push(val1);
    ijvmMachine.operandStack.push(val2);
  }

  public opIIn(ijvmMachine: IjvmMachine): void {
    if (ijvmMachine.input.length == 0) return;
    const toPush = ijvmMachine.input.charCodeAt(0) ?? 0;
    ijvmMachine.operandStack.push(toPush);
    ijvmMachine.input = ijvmMachine.input.substring(1);
  }
  public opIOut(ijvmMachine: IjvmMachine): void {
    const val1 = ijvmMachine.operandStack.pop() ?? 0;
    ijvmMachine.output = ijvmMachine.output + String.fromCharCode(val1);
  }

  public opGoto(ijvmMachine: IjvmMachine): void {
    const totalToJump = BinaryIjvmConverter.uint16ToSigned(BinaryIjvmConverter.retrieve16bitShort(ijvmMachine.ijvmText, ijvmMachine.programCounter));
    console.log(`Will be jumping: ${totalToJump}`);
    ijvmMachine.programCounter += totalToJump - 1;
  }

  public opIfeq(ijvmMachine: IjvmMachine): void {
    const totalToJump = BinaryIjvmConverter.uint16ToSigned(BinaryIjvmConverter.retrieve16bitShort(ijvmMachine.ijvmText, ijvmMachine.programCounter));
    console.log(`If true, jumping: ${totalToJump}`);
    const numToCheck = ijvmMachine.operandStack.pop() ?? 0;
    if (numToCheck == 0) {
      ijvmMachine.programCounter += totalToJump - 1;
    } else {
      ijvmMachine.programCounter += 2;
    }
  }

  public opIflt(ijvmMachine: IjvmMachine): void {
    const totalToJump = BinaryIjvmConverter.uint16ToSigned(BinaryIjvmConverter.retrieve16bitShort(ijvmMachine.ijvmText, ijvmMachine.programCounter));
    console.log(`If true, jumping: ${totalToJump}`);
    const numToCheck = ijvmMachine.operandStack.pop() ?? 0;
    if (numToCheck < 0) {
      ijvmMachine.programCounter += totalToJump - 1;
    } else {
      ijvmMachine.programCounter += 2;
    }
  }

  public opIF_icmpeq(ijvmMachine: IjvmMachine): void {
    const totalToJump = BinaryIjvmConverter.uint16ToSigned(BinaryIjvmConverter.retrieve16bitShort(ijvmMachine.ijvmText, ijvmMachine.programCounter));
    console.log(`If true, jumping: ${totalToJump}`);
    const val1 = ijvmMachine.operandStack.pop() ?? 0;
    const val2 = ijvmMachine.operandStack.pop() ?? 0;

    if (val1 == val2) {
      ijvmMachine.programCounter += totalToJump - 1;
    } else {
      ijvmMachine.programCounter += 2;
    }
  }

  public opLdc_w(ijvmMachine: IjvmMachine): void {
    const constantIndex = BinaryIjvmConverter.uint16ToSigned(BinaryIjvmConverter.retrieve16bitShort(ijvmMachine.ijvmText, ijvmMachine.programCounter));
    const toPush = ijvmMachine.ijvmConstants[constantIndex];
    ijvmMachine.operandStack.push(toPush);
    ijvmMachine.programCounter += 2;
  }

  public opILoad(ijvmMachine: IjvmMachine): void {
    let varIndex;
    if (ijvmMachine.wide) {
      varIndex = BinaryIjvmConverter.retrieve16bitShort(ijvmMachine.ijvmText, ijvmMachine.programCounter);
      ijvmMachine.programCounter += 2;
      ijvmMachine.wide = false;
    } else {
      varIndex = ijvmMachine.ijvmText[ijvmMachine.programCounter++];
    }
    const toAdd = ijvmMachine.getLocalVariable(varIndex);
    ijvmMachine.operandStack.push(toAdd);
  }

  public opIStore(ijvmMachine: IjvmMachine): void {
    let varIndex;
    if (ijvmMachine.wide) {
      varIndex = BinaryIjvmConverter.retrieve16bitShort(ijvmMachine.ijvmText, ijvmMachine.programCounter);
      ijvmMachine.programCounter += 2;
      ijvmMachine.wide = false;
    } else {
      varIndex = ijvmMachine.ijvmText[ijvmMachine.programCounter++];
    }
    const toPush = ijvmMachine.operandStack.pop() ?? 0;
    ijvmMachine.storeLocalVariable(toPush, varIndex);
  }

  public opIInc(ijvmMachine: IjvmMachine): void {
    let varIndex;
    if (ijvmMachine.wide) {
      varIndex = BinaryIjvmConverter.retrieve16bitShort(ijvmMachine.ijvmText, ijvmMachine.programCounter);
      ijvmMachine.programCounter += 2;
      ijvmMachine.wide = false;
    } else {
      varIndex = ijvmMachine.ijvmText[ijvmMachine.programCounter++];
    }
    const totalToIncrement = BinaryIjvmConverter.uint8ToSigned(ijvmMachine.ijvmText[ijvmMachine.programCounter++]);
    const toAdd = ijvmMachine.getLocalVariable(varIndex);
    ijvmMachine.storeLocalVariable(toAdd + totalToIncrement, varIndex);
  }

  public opWide(ijvmMachine: IjvmMachine): void {
    ijvmMachine.wide = true;
    this.performStep();
  }

  public opInvokeVirtual(ijvmMachine: IjvmMachine): void {
    const pcCounter: number = ijvmMachine.programCounter + 2;
    const prevLvPointer: number = ijvmMachine.lvPointer;

    // Set PC to new place with new arg and lv count.
    const constantLoc = BinaryIjvmConverter.retrieve16bitShort(ijvmMachine.ijvmText, ijvmMachine.programCounter);
    const newPCValue = ijvmMachine.ijvmConstants[constantLoc];
    const argCount = BinaryIjvmConverter.retrieve16bitShort(ijvmMachine.ijvmText, newPCValue);
    const lvCount = BinaryIjvmConverter.retrieve16bitShort(ijvmMachine.ijvmText, newPCValue + 2);

    ijvmMachine.programCounter = newPCValue + 4;

    const newlvPointer: number = ijvmMachine.operandStack.length - argCount;
    for (let i = 0; i < lvCount; i++)
      ijvmMachine.operandStack.push();
    ijvmMachine.operandStack.push(pcCounter);
    ijvmMachine.operandStack.push(prevLvPointer);
    ijvmMachine.lvPointer = newlvPointer;
    ijvmMachine.operandStack[newlvPointer] = ijvmMachine.operandStack.length - 2;
    this.ijvmMachine.localFrames.push(new IjvmLocalFrame(ijvmMachine.lvPointer, argCount, lvCount));
  }

  public opIReturn(ijvmMachine: IjvmMachine): void {
    const returnValue = ijvmMachine.operandStack.pop() ?? 0;

    const pcLvPointer = ijvmMachine.operandStack[ijvmMachine.lvPointer];
    const prevPc = ijvmMachine.operandStack[pcLvPointer] ?? 0;
    const prevLv = ijvmMachine.operandStack[pcLvPointer + 1] ?? 0;
    const newTop = ijvmMachine.lvPointer;

    while (ijvmMachine.operandStack.length > newTop) {
      ijvmMachine.operandStack.pop();
    }

    ijvmMachine.operandStack[newTop] = returnValue;
    ijvmMachine.programCounter = prevPc;
    ijvmMachine.lvPointer = prevLv;
    ijvmMachine.localFrames.pop();
  }
}
