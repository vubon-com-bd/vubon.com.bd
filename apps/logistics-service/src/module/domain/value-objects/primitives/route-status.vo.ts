/**
 * RouteStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ROUTE_STATUS } from '@vubon/shared-constants/logistics';

export type RouteStatusValue =
  (typeof ROUTE_STATUS)[keyof typeof ROUTE_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(ROUTE_STATUS);

const VALID_TRANSITIONS: Readonly<
  Record<RouteStatusValue, readonly RouteStatusValue[]>
> = {
  draft: ['planned', 'cancelled'],
  planned: ['active', 'optimizing', 'cancelled'],
  active: ['completed', 'cancelled'],
  completed: ['archived'],
  cancelled: ['archived'],
  optimizing: ['planned', 'cancelled'],
  archived: [], // final
};

export class RouteStatusVO extends BaseStatusVO<RouteStatusValue> {
  private constructor(value: RouteStatusValue) {
    super(value);
  }

  static create(raw: string): RouteStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('RouteStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid RouteStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new RouteStatusVO(normalized as RouteStatusValue);
  }

  static reconstitute(raw: string): RouteStatusVO {
    return new RouteStatusVO(raw as RouteStatusValue);
  }

  static draft(): RouteStatusVO {
    return new RouteStatusVO(ROUTE_STATUS.DRAFT);
  }

  isDraft(): boolean { return this.value === ROUTE_STATUS.DRAFT; }
  isPlanned(): boolean { return this.value === ROUTE_STATUS.PLANNED; }
  isActive(): boolean { return this.value === ROUTE_STATUS.ACTIVE; }
  isCompleted(): boolean { return this.value === ROUTE_STATUS.COMPLETED; }
  isCancelled(): boolean { return this.value === ROUTE_STATUS.CANCELLED; }
  isOptimizing(): boolean { return this.value === ROUTE_STATUS.OPTIMIZING; }
  isArchived(): boolean { return this.value === ROUTE_STATUS.ARCHIVED; }

  isFinal(): boolean { return this.isArchived(); }
  isExecutable(): boolean { return this.isPlanned() || this.isActive(); }

  canTransitionTo(target: string): boolean {
    const normalized = target.trim().toLowerCase() as RouteStatusValue;
    return (VALID_TRANSITIONS[this.value] ?? []).includes(normalized);
  }
}
