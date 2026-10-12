/**
 * Session Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Complete user session snapshot।
 * Business Rule:
 * - sessionId + userId + duration + entry/exit page + traffic source
 * - Anonymous session possible (userId absent)
 * - Duration consistent with event count
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { SessionIdVO } from '../primitives/session-id.vo.js';
import { SessionDurationVO } from '../primitives/session-duration.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { PagePathVO } from '../primitives/page-path.vo.js';
import { EventTimestampVO } from '../primitives/event-timestamp.vo.js';
import { DeviceTypeVO } from '../primitives/device-type.vo.js';
import { TrafficSourceVO } from './traffic-source.vo.js';

export interface SessionVOProps {
  readonly id: SessionIdVO;
  readonly userId?: UserIdVO;
  readonly startedAt: EventTimestampVO;
  readonly endedAt?: EventTimestampVO;
  readonly duration?: SessionDurationVO;
  readonly entryPage?: PagePathVO;
  readonly exitPage?: PagePathVO;
  readonly device?: DeviceTypeVO;
  readonly trafficSource?: TrafficSourceVO;
  readonly eventCount: number;
  readonly pageViewCount: number;
}

export class SessionVO extends BaseVO<SessionVOProps> {
  private constructor(props: SessionVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: SessionVOProps): SessionVO {
    if (!props.id || !props.startedAt) {
      throw new Error('SessionVO requires id, startedAt');
    }

    if (props.eventCount < 0 || props.pageViewCount < 0) {
      throw new Error('SessionVO counts cannot be negative');
    }

    if (props.pageViewCount > props.eventCount) {
      throw new Error('SessionVO pageViewCount cannot exceed eventCount');
    }

    if (props.endedAt && props.startedAt) {
      const spanMs = props.endedAt.value.epochMs - props.startedAt.value.epochMs;
      if (spanMs < 0) {
        throw new Error('SessionVO endedAt must be after startedAt');
      }
    }

    return new SessionVO(props);
  }

  get id(): SessionIdVO {
    return this.value.id;
  }

  get userId(): UserIdVO | undefined {
    return this.value.userId;
  }

  get startedAt(): EventTimestampVO {
    return this.value.startedAt;
  }

  get endedAt(): EventTimestampVO | undefined {
    return this.value.endedAt;
  }

  get duration(): SessionDurationVO | undefined {
    return this.value.duration;
  }

  get entryPage(): PagePathVO | undefined {
    return this.value.entryPage;
  }

  get exitPage(): PagePathVO | undefined {
    return this.value.exitPage;
  }

  get device(): DeviceTypeVO | undefined {
    return this.value.device;
  }

  get trafficSource(): TrafficSourceVO | undefined {
    return this.value.trafficSource;
  }

  get eventCount(): number {
    return this.value.eventCount;
  }

  get pageViewCount(): number {
    return this.value.pageViewCount;
  }

  isAnonymous(): boolean {
    return this.userId === undefined;
  }

  isActive(): boolean {
    return this.endedAt === undefined;
  }

  isCompleted(): boolean {
    return this.endedAt !== undefined;
  }

  isBounce(): boolean {
    return this.value.pageViewCount <= 1;
  }

  isEngaged(): boolean {
    return this.duration?.isEngaged() ?? false;
  }

  /** Events per minute */
  eventsPerMinute(): number {
    const dur = this.duration;
    if (!dur || dur.isZero) return 0;
    return Math.round((this.eventCount / dur.minutes) * 100) / 100;
  }

  /** Pages per session */
  pagesPerSession(): number {
    return this.value.pageViewCount;
  }

  /** Duration in seconds (0 if not set) */
  durationSeconds(): number {
    return this.duration?.seconds ?? 0;
  }
}
