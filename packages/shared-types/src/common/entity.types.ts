import { BaseEntity } from './base.types';

export interface Entity<T = unknown> extends BaseEntity {
  id: string;
  version: number;
  metadata: Record<string, unknown>;
  toJSON(): T;
  toDTO(): Record<string, unknown>;
}

export type EntityConstructor<T> = new (...args: unknown[]) => T;
