/**
 * SuspensionStatus Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * State machine:
 *   active → lifted | expired
 *   active → under_appeal → lifted | active
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_SUSPENSION_STATUS } from '@vubon/shared-constants/business';

export type SuspensionStatusValue =
  (typeof VENDOR_SUSPENSION_STATUS)[keyof typeof VENDOR_SUSPENSION_STATUS];

const VALID_STATUSES = new Set<string>(Object.values(VENDOR_SUSPENSION_STATUS));

const VALID_TRANSITIONS: Readonly<
  Record<SuspensionStatusValue, readonly SuspensionStatusValue[]>
> = {
  active: ['lifted', 'expired', 'under_appeal'],
  lifted: [],
  expired: [],
  under_appeal: ['lifted', 'active'],
};

export class SuspensionStatusVO extends BaseStatusVO<SuspensionStatusValue> {
  private constructor(value: SuspensionStatusValue) {
    super(value);
  }

  static create(raw: string): SuspensionStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('SuspensionStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.has(normalized)) {
      throw new ValidationError(
        `Invalid SuspensionStatus: "${normalized}". Allowed: ${[...VALID_STATUSES].join(', ')}`,
        'status',
      );
    }
    return new SuspensionStatusVO(normalized as SuspensionStatusValue);
  }

  static reconstitute(raw: string): SuspensionStatusVO {
    return new SuspensionStatusVO(raw as SuspensionStatusValue);
  }

  static active(): SuspensionStatusVO { return new SuspensionStatusVO('active'); }
  static lifted(): SuspensionStatusVO { return new SuspensionStatusVO('lifted'); }
  static expired(): SuspensionStatusVO { return new SuspensionStatusVO('expired'); }
  static underAppeal(): SuspensionStatusVO { return new SuspensionStatusVO('under_appeal'); }

  // ─── Predicates ───
  isActive(): boolean { return this.value === 'active'; }
  isLifted(): boolean { return this.value === 'lifted'; }
  isExpired(): boolean { return this.value === 'expired'; }
  isUnderAppeal(): boolean { return this.value === 'under_appeal'; }

  isFinal(): boolean { return this.isLifted() || this.isExpired(); }
  isCurrentlyInEffect(): boolean {
    return this.isActive() || this.isUnderAppeal();
  }
  canAppeal(): boolean { return this.isActive(); }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as SuspensionStatusValue);
  }
}
