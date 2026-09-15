import type { SessionInfo } from '../../common/session/session.types';
import { isSessionActive } from '../../common/session/session.validator';
import { SessionEventEmitter } from './session-events';
import { SessionHeartbeat } from './session-heartbeat';
import type { SessionEventListener, SessionManagerOptions } from './session-manager.types';
import { SessionMemoryStore } from './session-storage';

export class SessionManager {
  private readonly store = new SessionMemoryStore();
  private readonly emitter = new SessionEventEmitter();
  private readonly heartbeat: SessionHeartbeat;

  constructor(options: SessionManagerOptions = {}) {
    this.heartbeat = new SessionHeartbeat(options.heartbeatIntervalMs ?? 60_000, () => this.beat());
  }

  get(): SessionInfo | null {
    return this.store.get();
  }

  isActive(): boolean {
    return isSessionActive(this.store.get());
  }

  on(listener: SessionEventListener): () => void {
    return this.emitter.on(listener);
  }

  start(session: SessionInfo): void {
    this.store.set(session);
    this.emitter.emit({ type: 'session:start', session });
    this.heartbeat.start();
  }

  update(session: SessionInfo): void {
    this.store.set(session);
    this.emitter.emit({ type: 'session:refreshed', session });
  }

  end(reason = 'logout'): void {
    this.store.clear();
    this.heartbeat.stop();
    this.emitter.emit({ type: 'session:end', reason });
  }

  private beat(): void {
    const session = this.store.get();
    if (!session) {
      this.heartbeat.stop();
      return;
    }
    if (!isSessionActive(session)) {
      this.store.clear();
      this.heartbeat.stop();
      this.emitter.emit({ type: 'session:expired' });
    }
  }

  dispose(): void {
    this.heartbeat.stop();
    this.emitter.clear();
    this.store.clear();
  }
}
