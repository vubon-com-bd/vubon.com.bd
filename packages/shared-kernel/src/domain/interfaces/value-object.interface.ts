/**
 * Value Object Interface
 * @module shared-kernel/domain/interfaces
 *
 * References base value object (type only)।
 */
import type { BaseVO } from '../base/base.vo';

export type ValueObjectShape<TValue = unknown> = BaseVO<TValue>;

export interface ValueObjectMarker<TValue = unknown> {
  readonly value: TValue;
  equals(other: ValueObjectMarker<TValue>): boolean;
}
