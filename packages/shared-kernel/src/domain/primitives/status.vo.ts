/**
 * Status Value Object
 * @module shared-kernel/domain/primitives
 *
 * Values আসে shared-constants/common থেকে।
 */
import { STATUS } from '@vubon/shared-constants/common';
import { BaseVO } from '../base/base.vo';

export type StatusValue = (typeof STATUS)[keyof typeof STATUS];

const VALID_STATUSES = new Set<string>(Object.values(STATUS));

export class StatusVO extends BaseVO<StatusValue> {
  private constructor(value: StatusValue) {
    super(value);
  }

  static of(raw: string): StatusVO {
    if (!VALID_STATUSES.has(raw)) {
      throw new Error(`Invalid status: ${raw}`);
    }
    return new StatusVO(raw as StatusValue);
  }

  static active(): StatusVO {
    return new StatusVO(STATUS.ACTIVE as StatusValue);
  }

  static inactive(): StatusVO {
    return new StatusVO(STATUS.INACTIVE as StatusValue);
  }

  isActive(): boolean {
    return this.value === (STATUS.ACTIVE as StatusValue);
  }

  isFinal(): boolean {
    const finals: readonly string[] = [STATUS.DELETED, STATUS.ARCHIVED];
    return finals.includes(this.value);
  }
}
