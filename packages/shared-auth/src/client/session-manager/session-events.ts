import type { SessionEvent, SessionEventListener } from './session-manager.types';

/** Minimal event emitter for session lifecycle events. */
export class SessionEventEmitter {
  private readonly listeners = new Set<SessionEventListener>();

  on(listener: SessionEventListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit(event: SessionEvent): void {
    for (const listener of this.listeners) {
      try {
        listener(event);
      } catch {
        // never let one listener break the chain
      }
    }
  }

  clear(): void {
    this.listeners.clear();
  }
}
