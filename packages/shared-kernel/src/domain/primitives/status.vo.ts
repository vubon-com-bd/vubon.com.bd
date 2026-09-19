import { STATUS } from '@vubon/shared-constants/common';
import { BaseVO } from '../base/base.vo';

export type StatusValue = (typeof STATUS)[keyof typeof STATUS];

const VALID_STATUSES = new Set<string>(Object.values(STATUS));

/**
 * Generic domain status VO.
 * Subclass may override `allowedValues()` to constrain.
 */
export abstract class BaseStatusVO<T extends string = StatusValue> extends BaseVO<T> {
  protected constructor(value: T) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return VALID_STATUSES;
  }

  protected static validate(raw: string): void {
    if (!BaseStatusVO.allowedValues().has(raw)) {
      throw new Error(`Invalid status: ${raw}`);
    }
  }

  isActive(): boolean {
    return this.value === (STATUS.ACTIVE as unknown as T);
  }

  isFinal(): boolean {
    const finals: readonly string[] = [STATUS.DELETED, STATUS.ARCHIVED];
    return finals.includes(this.value as unknown as string);
  }
}

export class StatusVO extends BaseStatusVO<StatusValue> {
  private constructor(value: StatusValue) {
    super(value);
  }

  static of(raw: string): StatusVO {
    BaseStatusVO.validate(raw);
    return new StatusVO(raw as StatusValue);
  }

  static active(): StatusVO {
    return new StatusVO(STATUS.ACTIVE as StatusValue);
  }

  static inactive(): StatusVO {
    return new StatusVO(STATUS.INACTIVE as StatusValue);
  }
}
