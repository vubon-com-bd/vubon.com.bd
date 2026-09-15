/**
 * Cross-tab session lock using BroadcastChannel / storage events.
 * Prevents multiple tabs from refreshing tokens simultaneously.
 */
export class SessionLock {
  private readonly channel: BroadcastChannel | null;

  constructor(private readonly name = 'vubon:session') {
    this.channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(name) : null;
  }

  broadcast(event: { readonly type: string; readonly payload?: unknown }): void {
    try {
      this.channel?.postMessage(event);
    } catch {
      // ignore
    }
  }

  onMessage(handler: (event: { readonly type: string }) => void): () => void {
    if (!this.channel) return () => undefined;
    const listener = (ev: MessageEvent): void => {
      const data = ev.data as { type?: string } | undefined;
      if (data?.type) handler({ type: data.type });
    };
    this.channel.addEventListener('message', listener);
    return () => this.channel?.removeEventListener('message', listener);
  }

  close(): void {
    try {
      this.channel?.close();
    } catch {
      // ignore
    }
  }
}
