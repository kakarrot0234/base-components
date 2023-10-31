export class ErrorLockerInUse extends Error {
  constructor(message?: string) {
    super(message || `Locker is in use, try again.`);
  }
}
