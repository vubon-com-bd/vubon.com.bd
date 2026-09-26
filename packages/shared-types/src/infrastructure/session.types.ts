/**
 * Session Types
 * @module shared-types/infrastructure
 *
 * Values আসে shared-constants/infrastructure/session.constants থেকে।
 */

import type { SESSION_STATUS, SESSION_STORAGE } from '@vubon/shared-constants/infrastructure';

export type SessionStatus = (typeof SESSION_STATUS)[keyof typeof SESSION_STATUS];
export type SessionStorage = (typeof SESSION_STORAGE)[keyof typeof SESSION_STORAGE];

export interface SessionData<TPayload = unknown> {
  readonly id: string;
  readonly userId: string;
  readonly status: SessionStatus;
  readonly storage: SessionStorage;
  readonly payload?: TPayload;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly createdAt: string;
  readonly expiresAt: string;
  readonly lastAccessedAt: string;
}

export interface SessionOptions {
  readonly ttlSeconds?: number;
  readonly rememberMe?: boolean;
  readonly storage?: SessionStorage;
  readonly ipAddress?: string;
  readonly userAgent?: string;
}

export interface SessionStore {
  get<T = unknown>(id: string): Promise<SessionData<T> | null>;
  set<T = unknown>(data: SessionData<T>, ttl?: number): Promise<void>;
  delete(id: string): Promise<void>;
  touch(id: string, ttl?: number): Promise<void>;
  exists(id: string): Promise<boolean>;
}
