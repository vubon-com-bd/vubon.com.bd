/**
 * DispatchType Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DISPATCH_TYPE } from '@vubon/shared-constants/logistics';

export type DispatchTypeValue =
  (typeof DISPATCH_TYPE)[keyof typeof DISPATCH_TYPE];

const VALID_TYPES: readonly string[] = Object.values(DISPATCH_TYPE);

export class DispatchTypeVO extends BaseVO<DispatchTypeValue> {
  private constructor(value: DispatchTypeValue) {
    super(value);
  }

  static create(raw: string): DispatchTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('DispatchType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid DispatchType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new DispatchTypeVO(normalized as DispatchTypeValue);
  }

  static reconstitute(raw: string): DispatchTypeVO {
    return new DispatchTypeVO(raw as DispatchTypeValue);
  }

  isSingle(): boolean { return this.value === DISPATCH_TYPE.SINGLE; }
  isBatch(): boolean { return this.value === DISPATCH_TYPE.BATCH; }
  isBulk(): boolean { return this.value === DISPATCH_TYPE.BULK; }
  isUrgent(): boolean { return this.value === DISPATCH_TYPE.URGENT; }
  isScheduled(): boolean { return this.value === DISPATCH_TYPE.SCHEDULED; }
}
