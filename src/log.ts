export class Logger {
  private readonly silent: boolean;

  constructor(silent = false) {
    this.silent = silent;
  }

  log(...args: unknown[]): void {
    if (!this.silent) {
      console.log(...args);
    }
  }
}
