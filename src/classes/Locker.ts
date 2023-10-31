import { ErrorLockerInUse } from "./ErrorLockerInUse";

export class Locker {
  private m_Queue: {
    [key: string]: {
      nextLines: {
        lock: Promise<() => void>;
        release: () => void;
        nextRelease: () => void;
      }[];
      lockCount: number;
    };
  } = {};

  public async aquire(
    key: string = "general",
    ignoreOtherRequests: boolean = false,
  ) {
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
      nextRelease: () => void;
    };
    newLine.lock = new Promise<() => void>((resolve) => {
      newLine.release = () => {
        if (newLine.nextRelease) {
          resolve(() => {
            this.m_Queue[key].nextLines.shift();
            this.m_Queue[key].lockCount--;
            newLine.nextRelease();
          });
        } else {
          resolve(() => {
            this.m_Queue[key].nextLines.shift();
            this.m_Queue[key].lockCount--;
          });
        }
      };
    });
    this.m_Queue[key].lockCount++;
    this.m_Queue[key].nextLines.push(newLine);
    const previousLine =
      this.m_Queue[key].nextLines[this.m_Queue[key].nextLines.length - 2];
    if (previousLine) {
      previousLine.nextRelease = newLine.release;
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
