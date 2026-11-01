import type { SessionInfo } from '../../common/session/session.types';

export type SessionEvent =
  | { readonly type: 'session:start'; readonly session: SessionInfo }
  | { readonly type: 'session:end'; readonly reason: string }
  | { readonly type: 'session:expired' }
  | { readonly type: 'session:refreshed'; readonly session: SessionInfo };

export type SessionEventListener = (event: SessionEvent) => void;

export interface SessionManagerOptions {
  readonly heartbeatIntervalMs?: number;
  readonly idleTimeoutMs?: number;
}
