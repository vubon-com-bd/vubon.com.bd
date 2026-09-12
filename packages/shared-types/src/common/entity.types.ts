import { BaseEntity } from './base.types';

/**
 * Entity interface
 */
export interface Entity<T = unknown> extends BaseEntity {
  version: number;
  metadata: Record<string, unknown>;
  toJSON(): T;
  toDTO(): unknown;
}

/**
 * Entity constructor type
 */
export type EntityConstructor<T> = new (...args: unknown[]) => T;
