import {IjvmMachine} from "../entity/ijvm-machine";
import {IjvmMachineFactory} from "../factory/ijvm-machine-factory";

export class BinaryIjvmConverter {

  public static convertFileToIjvmMachine(file: File): Promise<IjvmMachine> {
    return new Promise((resolve, reject) => {
      this.convertFileToBinaryArray(file).then((result: Uint8Array) => {
        if (result.length < 4) {
          reject("File too small");
          return;
        }
        const fileHeader = this.retrieve32bitWord(result, 0);
        if (fileHeader != IjvmMachine.IJVM_CONSTANT) {
          reject("File not IJVM binary.");
          return;
        }

        resolve(this.buildIjvmMachineFromUInt8Arr(result));
      }).catch((err) => {
        reject(err);
      });

    });
  }

  public static buildIjvmMachineFromUInt8Arr(binData: Uint8Array): IjvmMachine {
    // Skipping first 4 for file header, next 4 for constant field.
    let offset: number = 4;

    // Read constant value
    const constantOffset = this.retrieve32bitWord(binData, offset);
    offset += 4;
    const constantSize = this.retrieve32bitWord(binData, offset);
    offset += 4;
    const constantValues = new Array<number>();
    for (let i = 0; i < constantSize; i += 4) {
      constantValues.push(this.retrieve32bitWord(binData, offset + i));
    }
    offset += constantSize;

    // Read Text field
    const textfieldOffset = this.retrieve32bitWord(binData, offset);
    offset += 4;
    const textfieldSize = this.retrieve32bitWord(binData, offset);
    offset += 4;

    const textFieldValues = new Array<number>();
    for (let i = 0; i < textfieldSize; i++) {
      textFieldValues.push(binData.at(offset + i) ?? 0);
    }

    return IjvmMachineFactory.newFactory()
      .setConstants(constantValues)
      .setTextField(textFieldValues)
      .build();
  }

  public static convertFileToBinaryArray(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const blobReader = new Blob();

      reader.onload = () => {
        const content = reader.result as ArrayBuffer;
        const valArr = new Uint8Array(content);
        if (valArr.length < 4) reject("File too small to be valid.");
        let header = this.retrieve32bitWord(valArr, 0);
        if (header == IjvmMachine.IJVM_CONSTANT)
          resolve(valArr);
        else
          reject("PROGRAM NOT IJVM");
      }

      reader.onerror = () => {
        reject(reader.error);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  public static retrieve32bitWord(arr: Uint8Array, index: number): number {
    let result = 0;
    for (let i = 0; i < 4; i++) {
      const newValue = arr[index + i] ?? 0;
      result = (result << 8) + newValue;
    }
    return result;
  }

  public static retrieve16bitShort(arr: Array<number>, index: number): number {
    let result = 0;
    for (let i = 0; i < 2; i++) {
      const newValue = arr[index + i] ?? 0;
      result = (result << 8) + newValue;
    }
    return result;
  }

  public static uint16ToSigned(num: number): number {
    // If the number is greater than or equal to 2^15, it's negative in 16-bit signed integer representation
    if (num >= Math.pow(2, 15)) {
      // Convert to signed integer using two's complement
      return num - Math.pow(2, 16);
    } else {
      return num;
    }
  }

  public static uint8ToSigned(num: number): number {
    // If the number is greater than or equal to 2^15, it's negative in 16-bit signed integer representation
    if (num >= Math.pow(2, 7)) {
      // Convert to signed integer using two's complement
      return num - Math.pow(2, 8);
    } else {
      return num;
    }
  }

}
