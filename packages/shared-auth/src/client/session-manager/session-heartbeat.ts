/**
 * Browser heartbeat — periodically ping the server to keep the session
 * alive / detect inactivity. Uses setInterval; MUST be stopped on logout.
 */
export class SessionHeartbeat {
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly intervalMs: number,
    private readonly onBeat: () => void
  ) {}

  start(): void {
    if (this.timer !== null) return;
    this.timer = setInterval(() => {
      try {
        this.onBeat();
      } catch {
        // ignore
      }
    }, this.intervalMs);
  }

  stop(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  isRunning(): boolean {
    return this.timer !== null;
  }
}
