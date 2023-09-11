export class Locker {
  private m_Queue: {
    [key: string]: {
      next: (() => void)[];
      lockCount: number;
    };
  } = {};

  public aquire(
    key: string = "general",
    ignoreOtherRequests: boolean = false
  ): Promise<() => void> {
    if (!this.m_Queue[key]) {
      this.m_Queue[key] = {
        lockCount: 0,
        next: [],
      };
    }
    const previousLock =
      this.m_Queue[key].next[this.m_Queue[key].next.length - 1];
    if (previousLock) {
      const ticket = new Promise<() => void>((resolve) => {
        this.m_Queue[key].lockCount++;
        this.m_Queue[key].next.push(resolve);
      });
      return previousLock;
    }
    const ticket = new Promise<() => void>((resolve) => {
      this.m_Queue[key].lockCount++;
      this.m_Queue[key].next.push(resolve);
    });
    return () => {
      this.m_Queue[key].lockCount--;
      const releaser = this.m_Queue[key].next.shift();
      releaser();
    };
  }
  public isLocked(key: string) {
    return this.m_Queue[key].lockCount > 0;
  }
}
