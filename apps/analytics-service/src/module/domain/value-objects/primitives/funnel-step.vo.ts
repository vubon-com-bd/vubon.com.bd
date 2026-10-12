/**
 * Funnel Step Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Funnel-এর একটি step (ordered)।
 * Business Rule:
 * - Step name (e.g., "Add to Cart")
 * - Order index 1-based
 * - Max 20 steps per funnel
 * - Immutable pair (order + name)
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 100;
const MIN_ORDER = 1;
const MAX_ORDER = 20;

export class FunnelStepVO extends BaseCodeVO {
  private readonly _order: number;
  private readonly _name: string;

  private constructor(name: string, order: number) {
    super(name);
    this._name = name;
    this._order = order;
    Object.freeze(this);
  }

  static create(name: string, order: number): FunnelStepVO {
    if (typeof name !== 'string') {
      throw new Error('FunnelStep name must be a string');
    }
    if (!Number.isInteger(order)) {
      throw new Error('FunnelStep order must be an integer');
    }
    if (order < MIN_ORDER || order > MAX_ORDER) {
      throw new Error(`FunnelStep order must be ${MIN_ORDER}-${MAX_ORDER}`);
    }

    const normalized = name.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN_NAME_LENGTH || normalized.length > MAX_NAME_LENGTH) {
      throw new Error(
        `FunnelStep name must be ${MIN_NAME_LENGTH}-${MAX_NAME_LENGTH} chars`
      );
    }

    return new FunnelStepVO(normalized, order);
  }

  get order(): number {
    return this._order;
  }

  get name(): string {
    return this._name;
  }

  isFirst(): boolean {
    return this._order === MIN_ORDER;
  }

  isLast(): boolean {
    return this._order === MAX_ORDER;
  }

  /** Two-step funnel কিনা */
  isSecond(): boolean {
    return this._order === 2;
  }

  /** Previous step order */
  previousOrder(): number | null {
    return this.isFirst() ? null : this._order - 1;
  }

  /** Next step order */
  nextOrder(): number | null {
    return this.isLast() ? null : this._order + 1;
  }
}
