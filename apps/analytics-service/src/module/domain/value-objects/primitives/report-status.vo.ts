/**
 * Report Status Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Report generation-এর lifecycle state।
 * Business Rule:
 * - ANALYTICS_STATUS থেকে একটি subset
 * - Terminal state: completed, failed, archived
 * - Transient state: pending, processing
 * - State machine: pending → processing → completed/failed
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ANALYTICS_STATUS } from '@vubon/shared-constants/platform/analytics';

type ReportStatusValue =
  | typeof ANALYTICS_STATUS.ACTIVE
  | typeof ANALYTICS_STATUS.INACTIVE
  | typeof ANALYTICS_STATUS.PENDING
  | typeof ANALYTICS_STATUS.PROCESSING
  | typeof ANALYTICS_STATUS.COMPLETED
  | typeof ANALYTICS_STATUS.FAILED
  | typeof ANALYTICS_STATUS.ARCHIVED;

const VALID_STATUSES: readonly string[] = [
  ANALYTICS_STATUS.ACTIVE,
  ANALYTICS_STATUS.INACTIVE,
  ANALYTICS_STATUS.PENDING,
  ANALYTICS_STATUS.PROCESSING,
  ANALYTICS_STATUS.COMPLETED,
  ANALYTICS_STATUS.FAILED,
  ANALYTICS_STATUS.ARCHIVED,
];

const TERMINAL: readonly string[] = [
  ANALYTICS_STATUS.COMPLETED,
  ANALYTICS_STATUS.FAILED,
  ANALYTICS_STATUS.ARCHIVED,
];

const TRANSIENT: readonly string[] = [
  ANALYTICS_STATUS.PENDING,
  ANALYTICS_STATUS.PROCESSING,
];

export class ReportStatusVO extends BaseStatusVO<ReportStatusValue> {
  private constructor(value: ReportStatusValue) {
    super(value);
  }

  static create(raw: string): ReportStatusVO {
    if (typeof raw !== 'string') {
      throw new Error('ReportStatus must be a string');
    }

    const normalized = raw.trim().toLowerCase();

    if (!VALID_STATUSES.includes(normalized)) {
      throw new Error(
        `Invalid ReportStatus: "${normalized}". Valid: ${VALID_STATUSES.join(', ')}`
      );
    }

    return new ReportStatusVO(normalized as ReportStatusValue);
  }

  static pending(): ReportStatusVO {
    return new ReportStatusVO(ANALYTICS_STATUS.PENDING);
  }

  static processing(): ReportStatusVO {
    return new ReportStatusVO(ANALYTICS_STATUS.PROCESSING);
  }

  static completed(): ReportStatusVO {
    return new ReportStatusVO(ANALYTICS_STATUS.COMPLETED);
  }

  static failed(): ReportStatusVO {
    return new ReportStatusVO(ANALYTICS_STATUS.FAILED);
  }

  isPending(): boolean {
    return this.value === ANALYTICS_STATUS.PENDING;
  }

  isProcessing(): boolean {
    return this.value === ANALYTICS_STATUS.PROCESSING;
  }

  isCompleted(): boolean {
    return this.value === ANALYTICS_STATUS.COMPLETED;
  }

  isFailed(): boolean {
    return this.value === ANALYTICS_STATUS.FAILED;
  }

  isArchived(): boolean {
    return this.value === ANALYTICS_STATUS.ARCHIVED;
  }

  /** Terminal state কিনা — আর transition হবে না */
  isTerminal(): boolean {
    return TERMINAL.includes(this.value);
  }

  /** Transient state কিনা — এখনো processing হচ্ছে */
  isTransient(): boolean {
    return TRANSIENT.includes(this.value);
  }

  /** Succeeded কিনা */
  isSuccess(): boolean {
    return this.isCompleted();
  }

  /** Valid transition check: this → next */
  canTransitionTo(next: ReportStatusVO): boolean {
    if (this.isTerminal()) return false;

    const transitions: Record<string, readonly string[]> = {
      [ANALYTICS_STATUS.PENDING]: [
        ANALYTICS_STATUS.PROCESSING,
        ANALYTICS_STATUS.FAILED,
      ],
      [ANALYTICS_STATUS.PROCESSING]: [
        ANALYTICS_STATUS.COMPLETED,
        ANALYTICS_STATUS.FAILED,
      ],
    };

    const allowed = transitions[this.value] ?? [];
    return allowed.includes(next.value);
  }
}
