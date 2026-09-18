/**
 * ID Value Object (generic + specific IDs)
 * @module shared-kernel/domain/primitives
 *
 * Values আসে shared-types/common/primitives থেকে (type only)।
 */
import type { Branded, UserId, OrderId } from '@vubon/shared-types/common';
import { BaseVO } from '../base/base.vo';

export class BaseIdVO<T extends string = string> extends BaseVO<T> {
  protected constructor(value: T) {
    super(value);
  }

  static of<T extends string>(raw: T): BaseIdVO<T> {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new Error('ID cannot be empty');
    }
    return new BaseIdVO<T>(raw);
  }

  get length(): number {
    return this.value.length;
  }
}

export class UserIdVO extends BaseVO<UserId> {
  private constructor(value: UserId) {
    super(value);
  }

  static of(raw: string): UserIdVO {
    if (!raw || raw.length < 1) {
      throw new Error('UserId cannot be empty');
    }
    return new UserIdVO(raw as UserId);
  }
}

export class OrderIdVO extends BaseVO<OrderId> {
  private constructor(value: OrderId) {
    super(value);
  }

  static of(raw: string): OrderIdVO {
    if (!raw || raw.length < 1) {
      throw new Error('OrderId cannot be empty');
    }
    return new OrderIdVO(raw as OrderId);
  }
}

export type BrandedId<TName extends string> = Branded<string, TName>;
