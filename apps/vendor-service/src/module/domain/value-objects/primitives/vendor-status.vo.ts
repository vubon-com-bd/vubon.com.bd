/**
 * VendorStatus Value Object — includes transition state machine
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { VENDOR_STATUS } from '@vubon/shared-constants/business';
import { InvalidVendorStatusError } from '../../errors/vendor.errors.js';

const ALLOWED = Object.values(VENDOR_STATUS) as readonly string[];

export class VendorStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VendorStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidVendorStatusError(String(raw), ALLOWED);
    }
    return new VendorStatusVO(raw);
  }

  // ─── Named constructors ───
  static pending(): VendorStatusVO { return new VendorStatusVO(VENDOR_STATUS.PENDING); }
  static approved(): VendorStatusVO { return new VendorStatusVO(VENDOR_STATUS.APPROVED); }
  static active(): VendorStatusVO { return new VendorStatusVO(VENDOR_STATUS.ACTIVE); }
  static inactive(): VendorStatusVO { return new VendorStatusVO(VENDOR_STATUS.INACTIVE); }
  static suspended(): VendorStatusVO { return new VendorStatusVO(VENDOR_STATUS.SUSPENDED); }
  static rejected(): VendorStatusVO { return new VendorStatusVO(VENDOR_STATUS.REJECTED); }
  static blocked(): VendorStatusVO { return new VendorStatusVO(VENDOR_STATUS.BLOCKED); }
  static deleted(): VendorStatusVO { return new VendorStatusVO(VENDOR_STATUS.DELETED); }

  static reconstitute(raw: string): VendorStatusVO {
    return new VendorStatusVO(raw);
  }

  // ─── Predicates ───
  isPending(): boolean { return this.value === VENDOR_STATUS.PENDING; }
  isApproved(): boolean { return this.value === VENDOR_STATUS.APPROVED; }
  isActive(): boolean { return this.value === VENDOR_STATUS.ACTIVE; }
  isInactive(): boolean { return this.value === VENDOR_STATUS.INACTIVE; }
  isSuspended(): boolean { return this.value === VENDOR_STATUS.SUSPENDED; }
  isRejected(): boolean { return this.value === VENDOR_STATUS.REJECTED; }
  isBlocked(): boolean { return this.value === VENDOR_STATUS.BLOCKED; }

  /** Final states cannot transition anywhere except explicit unblock. */
  override isFinal(): boolean {
    return [VENDOR_STATUS.DELETED, VENDOR_STATUS.BLOCKED].includes(this.value as never);
  }

  /** Can this vendor accept orders / transact? */
  isOperational(): boolean {
    return this.value === VENDOR_STATUS.ACTIVE || this.value === VENDOR_STATUS.APPROVED;
  }

  /** Can this vendor be modified by owner? */
  isEditable(): boolean {
    return this.value !== VENDOR_STATUS.DELETED && this.value !== VENDOR_STATUS.BLOCKED;
  }

  // ─── State machine ───
  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [VENDOR_STATUS.PENDING]: [
        VENDOR_STATUS.APPROVED,
        VENDOR_STATUS.REJECTED,
        VENDOR_STATUS.BLOCKED,
      ],
      [VENDOR_STATUS.APPROVED]: [
        VENDOR_STATUS.ACTIVE,
        VENDOR_STATUS.INACTIVE,
        VENDOR_STATUS.SUSPENDED,
        VENDOR_STATUS.BLOCKED,
      ],
      [VENDOR_STATUS.ACTIVE]: [
        VENDOR_STATUS.INACTIVE,
        VENDOR_STATUS.SUSPENDED,
        VENDOR_STATUS.BLOCKED,
        VENDOR_STATUS.DELETED,
      ],
      [VENDOR_STATUS.INACTIVE]: [
        VENDOR_STATUS.ACTIVE,
        VENDOR_STATUS.SUSPENDED,
        VENDOR_STATUS.BLOCKED,
        VENDOR_STATUS.DELETED,
      ],
      [VENDOR_STATUS.SUSPENDED]: [
        VENDOR_STATUS.ACTIVE,
        VENDOR_STATUS.INACTIVE,
        VENDOR_STATUS.BLOCKED,
        VENDOR_STATUS.DELETED,
      ],
      [VENDOR_STATUS.REJECTED]: [
        VENDOR_STATUS.PENDING,
        VENDOR_STATUS.BLOCKED,
        VENDOR_STATUS.DELETED,
      ],
      [VENDOR_STATUS.BLOCKED]: [VENDOR_STATUS.DELETED],
      [VENDOR_STATUS.DELETED]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
