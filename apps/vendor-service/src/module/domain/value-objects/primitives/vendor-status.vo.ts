/**
 * VendorStatus Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * State machine:
 *   pending → approved → active → suspended | inactive
 *   pending/approved → rejected
 *   any → blocked
 *   inactive/blocked/suspended → active (reactivate)
 *   * → deleted (except deleted itself)
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_STATUS } from '@vubon/shared-constants/business';

export type VendorStatusValue = (typeof VENDOR_STATUS)[keyof typeof VENDOR_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(VENDOR_STATUS);

const VALID_TRANSITIONS: Readonly<Record<VendorStatusValue, readonly VendorStatusValue[]>> = {
  pending: ['approved', 'rejected', 'blocked', 'deleted'],
  approved: ['active', 'rejected', 'suspended', 'blocked', 'deleted'],
  active: ['inactive', 'suspended', 'blocked', 'deleted'],
  inactive: ['active', 'suspended', 'blocked', 'deleted'],
  suspended: ['active', 'blocked', 'deleted'],
  rejected: ['pending', 'deleted'],
  blocked: ['active', 'deleted'],
  deleted: [],
};

export class VendorStatusVO extends BaseStatusVO<VendorStatusValue> {
  private constructor(value: VendorStatusValue) {
    super(value);
  }

  static create(raw: string): VendorStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('VendorStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid VendorStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new VendorStatusVO(normalized as VendorStatusValue);
  }

  static reconstitute(raw: string): VendorStatusVO {
    return new VendorStatusVO(raw as VendorStatusValue);
  }

  // ─── Factory methods ───
  static pending(): VendorStatusVO { return new VendorStatusVO('pending'); }
  static approved(): VendorStatusVO { return new VendorStatusVO('approved'); }
  static active(): VendorStatusVO { return new VendorStatusVO('active'); }
  static inactive(): VendorStatusVO { return new VendorStatusVO('inactive'); }
  static suspended(): VendorStatusVO { return new VendorStatusVO('suspended'); }
  static rejected(): VendorStatusVO { return new VendorStatusVO('rejected'); }
  static blocked(): VendorStatusVO { return new VendorStatusVO('blocked'); }
  static deleted(): VendorStatusVO { return new VendorStatusVO('deleted'); }

  // ─── Predicates ───
  isPending(): boolean { return this.value === 'pending'; }
  isApproved(): boolean { return this.value === 'approved'; }
  isActive(): boolean { return this.value === 'active'; }
  isInactive(): boolean { return this.value === 'inactive'; }
  isSuspended(): boolean { return this.value === 'suspended'; }
  isRejected(): boolean { return this.value === 'rejected'; }
  isBlocked(): boolean { return this.value === 'blocked'; }
  isDeleted(): boolean { return this.value === 'deleted'; }

  /** Vendor can accept orders */
  isOperational(): boolean {
    return this.isActive();
  }

  /** Vendor visible to public */
  isVisible(): boolean {
    return this.isActive() || this.isSuspended();
  }

  /** Vendor can be edited */
  isEditable(): boolean {
    return !this.isDeleted() && !this.isBlocked();
  }

  /** Vendor in final state */
  isFinal(): boolean {
    return this.isDeleted();
  }

  /** Vendor needs admin attention */
  requiresAttention(): boolean {
    return this.isPending() || this.isSuspended() || this.isBlocked();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as VendorStatusValue);
  }
}
