/**
 * RecurringStatus Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * State machine:
 *   scheduled → active → paused → active
 *   active → completed | cancelled | failed
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type RecurringStatusValue =
  | 'scheduled'
  | 'active'
  | 'paused'
  | 'completed'
  | 'cancelled'
  | 'failed';

const VALID_STATUSES: readonly string[] = [
  'scheduled',
  'active',
  'paused',
  'completed',
  'cancelled',
  'failed',
];

const VALID_TRANSITIONS: Readonly<
  Record<RecurringStatusValue, readonly RecurringStatusValue[]>
> = {
  scheduled: ['active', 'cancelled'],
  active: ['paused', 'completed', 'cancelled', 'failed'],
  paused: ['active', 'cancelled'],
  completed: [],
  cancelled: [],
  failed: ['scheduled', 'cancelled'],
};

export class RecurringStatusVO extends BaseStatusVO<RecurringStatusValue> {
  private constructor(value: RecurringStatusValue) {
    super(value);
  }

  static create(raw: string): RecurringStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('RecurringStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid RecurringStatus "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new RecurringStatusVO(normalized as RecurringStatusValue);
  }

  static scheduled(): RecurringStatusVO { return new RecurringStatusVO('scheduled'); }
  static active(): RecurringStatusVO { return new RecurringStatusVO('active'); }
  static paused(): RecurringStatusVO { return new RecurringStatusVO('paused'); }
  static completed(): RecurringStatusVO { return new RecurringStatusVO('completed'); }
  static cancelled(): RecurringStatusVO { return new RecurringStatusVO('cancelled'); }
  static failed(): RecurringStatusVO { return new RecurringStatusVO('failed'); }

  isScheduled(): boolean { return this.value === 'scheduled'; }
  isActive(): boolean { return this.value === 'active'; }
  isPaused(): boolean { return this.value === 'paused'; }
  isCompleted(): boolean { return this.value === 'completed'; }
  isCancelled(): boolean { return this.value === 'cancelled'; }
  isFailed(): boolean { return this.value === 'failed'; }

  isRunning(): boolean { return this.isActive(); }

  isFinal(): boolean {
    return this.isCompleted() || this.isCancelled();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as RecurringStatusValue);
  }
}
