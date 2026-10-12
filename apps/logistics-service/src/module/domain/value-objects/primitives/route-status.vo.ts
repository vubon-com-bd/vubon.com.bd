/**
 * RouteStatus Value Object — state machine
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ROUTE_STATUS } from '@vubon/shared-constants/logistics';
import { InvalidRouteStatusError } from '../../errors/route.errors.js';

const ALLOWED = Object.values(ROUTE_STATUS) as readonly string[];

export class RouteStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): RouteStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidRouteStatusError(String(raw));
    }
    return new RouteStatusVO(raw);
  }

  static reconstitute(raw: string): RouteStatusVO { return new RouteStatusVO(raw); }

  static draft(): RouteStatusVO { return new RouteStatusVO(ROUTE_STATUS.DRAFT); }
  static planned(): RouteStatusVO { return new RouteStatusVO(ROUTE_STATUS.PLANNED); }
  static active(): RouteStatusVO { return new RouteStatusVO(ROUTE_STATUS.ACTIVE); }
  static completed(): RouteStatusVO { return new RouteStatusVO(ROUTE_STATUS.COMPLETED); }
  static cancelled(): RouteStatusVO { return new RouteStatusVO(ROUTE_STATUS.CANCELLED); }
  static optimizing(): RouteStatusVO { return new RouteStatusVO(ROUTE_STATUS.OPTIMIZING); }
  static archived(): RouteStatusVO { return new RouteStatusVO(ROUTE_STATUS.ARCHIVED); }

  isDraft(): boolean { return this.value === ROUTE_STATUS.DRAFT; }
  isPlanned(): boolean { return this.value === ROUTE_STATUS.PLANNED; }
  isActive(): boolean { return this.value === ROUTE_STATUS.ACTIVE; }
  isCompleted(): boolean { return this.value === ROUTE_STATUS.COMPLETED; }
  isCancelled(): boolean { return this.value === ROUTE_STATUS.CANCELLED; }
  isOptimizing(): boolean { return this.value === ROUTE_STATUS.OPTIMIZING; }
  isArchived(): boolean { return this.value === ROUTE_STATUS.ARCHIVED; }

  isFinal(): boolean {
    return [ROUTE_STATUS.COMPLETED, ROUTE_STATUS.CANCELLED, ROUTE_STATUS.ARCHIVED].includes(
      this.value as never,
    );
  }

  canBeEdited(): boolean { return this.isDraft() || this.isPlanned(); }
  canBeStarted(): boolean { return this.isPlanned() || this.isDraft(); }
  canBeOptimized(): boolean { return this.isDraft() || this.isPlanned(); }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [ROUTE_STATUS.DRAFT]: [
        ROUTE_STATUS.PLANNED,
        ROUTE_STATUS.OPTIMIZING,
        ROUTE_STATUS.CANCELLED,
        ROUTE_STATUS.ARCHIVED,
      ],
      [ROUTE_STATUS.PLANNED]: [
        ROUTE_STATUS.ACTIVE,
        ROUTE_STATUS.OPTIMIZING,
        ROUTE_STATUS.DRAFT,
        ROUTE_STATUS.CANCELLED,
      ],
      [ROUTE_STATUS.OPTIMIZING]: [
        ROUTE_STATUS.PLANNED,
        ROUTE_STATUS.ACTIVE,
        ROUTE_STATUS.CANCELLED,
      ],
      [ROUTE_STATUS.ACTIVE]: [
        ROUTE_STATUS.COMPLETED,
        ROUTE_STATUS.CANCELLED,
      ],
      [ROUTE_STATUS.COMPLETED]: [ROUTE_STATUS.ARCHIVED],
      [ROUTE_STATUS.CANCELLED]: [ROUTE_STATUS.ARCHIVED],
      [ROUTE_STATUS.ARCHIVED]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
