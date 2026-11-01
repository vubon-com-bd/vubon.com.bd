/**
 * DispatchStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * State machine:
 *   pending → assigned → dispatched → in_transit → delivered ✓ (final)
 *   any (except final) → failed | cancelled
 *   delivered → returned ✓ (final)
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DISPATCH_STATUS } from '@vubon/shared-constants/logistics';

export type DispatchStatusValue =
  (typeof DISPATCH_STATUS)[keyof typeof DISPATCH_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(DISPATCH_STATUS);

const VALID_TRANSITIONS: Readonly<
  Record<DispatchStatusValue, readonly DispatchStatusValue[]>
> = {
  pending: ['assigned', 'cancelled'],
  assigned: ['dispatched', 'failed', 'cancelled'],
  dispatched: ['in_transit', 'failed'],
  in_transit: ['delivered', 'failed'],
  delivered: ['returned'], // can be returned
  failed: ['cancelled'],
  returned: [], // final
  cancelled: [], // final
};

export class DispatchStatusVO extends BaseStatusVO<DispatchStatusValue> {
  private constructor(value: DispatchStatusValue) {
    super(value);
  }

  static create(raw: string): DispatchStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('DispatchStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid DispatchStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new DispatchStatusVO(normalized as DispatchStatusValue);
  }

  static reconstitute(raw: string): DispatchStatusVO {
    return new DispatchStatusVO(raw as DispatchStatusValue);
  }

  static pending(): DispatchStatusVO {
    return new DispatchStatusVO(DISPATCH_STATUS.PENDING);
  }
  static delivered(): DispatchStatusVO {
    return new DispatchStatusVO(DISPATCH_STATUS.DELIVERED);
  }

  isPending(): boolean { return this.value === DISPATCH_STATUS.PENDING; }
  isAssigned(): boolean { return this.value === DISPATCH_STATUS.ASSIGNED; }
  isDispatched(): boolean { return this.value === DISPATCH_STATUS.DISPATCHED; }
  isInTransit(): boolean { return this.value === DISPATCH_STATUS.IN_TRANSIT; }
  isDelivered(): boolean { return this.value === DISPATCH_STATUS.DELIVERED; }
  isFailed(): boolean { return this.value === DISPATCH_STATUS.FAILED; }
  isReturned(): boolean { return this.value === DISPATCH_STATUS.RETURNED; }
  isCancelled(): boolean { return this.value === DISPATCH_STATUS.CANCELLED; }

  isFinal(): boolean { return this.isReturned() || this.isCancelled(); }
  isCompleted(): boolean { return this.isDelivered(); }

  canTransitionTo(target: string): boolean {
    const normalized = target.trim().toLowerCase() as DispatchStatusValue;
    return (VALID_TRANSITIONS[this.value] ?? []).includes(normalized);
  }
}
