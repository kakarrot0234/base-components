import { ErrorLockerInUse } from "./ErrorLockerInUse";

export class Locker {
  private m_Queue: {
    [key: string]: {
      nextLines: {
        lock: Promise<() => void>;
        release: () => void;
      }[];
      lockCount: number;
    };
  } = {};

  public async aquire(
    key: string = "general",
    ignoreOtherRequests: boolean = false
  ): Promise<() => void> {
    if (!this.m_Queue[key]) {
      this.m_Queue[key] = {
        lockCount: 0,
        nextLines: [],
      };
    }
    if (this.isLocked(key) && ignoreOtherRequests) {
      throw new ErrorLockerInUse();
    }
    const newLine = {} as {
      lock: Promise<() => void>;
      release: () => void;
    };
    newLine.lock = new Promise<() => void>((resolve) => {
        newLine.release = resolve as () => void;
    });
    this.m_Queue[key].lockCount++;
    this.m_Queue[key].nextLines.push(newLine);
    const previousLine =
      this.m_Queue[key].nextLines[this.m_Queue[key].nextLines.length - 2];
    if (previousLine) {
      return await previousLine.lock;
    }
    return () => {
      const currentLine = this.m_Queue[key].nextLines.shift();
      if (currentLine) {
        this.m_Queue[key].lockCount--;
        currentLine.release();
      }
    };
  }
  public isLocked(key: string) {
    return this.m_Queue[key].lockCount > 0;
  }
}
