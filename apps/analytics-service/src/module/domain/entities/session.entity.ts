/**
 * Session Entity (Aggregate Root)
 * @module analytics-service/domain/entities
 *
 * User session lifecycle (active → completed)।
 * Business Rule:
 * - Duration consistent with timestamps
 * - Events tracked incrementally
 * - Publish started/ended events
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base';
import { SessionIdVO } from '../value-objects/primitives/session-id.vo.js';
import { SessionDurationVO } from '../value-objects/primitives/session-duration.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { EventTimestampVO } from '../value-objects/primitives/event-timestamp.vo.js';
import { DeviceTypeVO } from '../value-objects/primitives/device-type.vo.js';
import { TrafficSourceVO } from '../value-objects/composites/traffic-source.vo.js';
import { SessionStartedEvent } from '../events/session.events.js';
import { SessionEndedEvent } from '../events/session.events.js';

export interface SessionEntityProps {
  readonly userId?: UserIdVO;
  readonly device?: DeviceTypeVO;
  readonly trafficSource?: TrafficSourceVO;
  readonly startedAt: EventTimestampVO;
  endedAt?: EventTimestampVO;
  duration?: SessionDurationVO;
  eventCount: number;
  pageViewCount: number;
}

export class SessionEntity extends AggregateRoot<string> {
  private props: SessionEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: SessionEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static start(params: {
    id: SessionIdVO;
    startedAt: EventTimestampVO;
    userId?: UserIdVO;
    device?: DeviceTypeVO;
    trafficSource?: TrafficSourceVO;
    now: string;
  }): SessionEntity {
    if (!params.id || !params.startedAt) {
      throw new Error('SessionEntity requires id, startedAt');
    }

    const entity = new SessionEntity(
      params.id.value,
      params.now,
      params.now,
      {
        userId: params.userId,
        device: params.device,
        trafficSource: params.trafficSource,
        startedAt: params.startedAt,
        eventCount: 0,
        pageViewCount: 0,
      }
    );

    entity.addDomainEvent(
      new SessionStartedEvent(
        params.id.value,
        params.userId?.value,
        params.now
      )
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: SessionEntityProps;
  }): SessionEntity {
    return new SessionEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get userId(): UserIdVO | undefined { return this.props.userId; }
  get device(): DeviceTypeVO | undefined { return this.props.device; }
  get trafficSource(): TrafficSourceVO | undefined { return this.props.trafficSource; }
  get startedAt(): EventTimestampVO { return this.props.startedAt; }
  get endedAt(): EventTimestampVO | undefined { return this.props.endedAt; }
  get duration(): SessionDurationVO | undefined { return this.props.duration; }
  get eventCount(): number { return this.props.eventCount; }
  get pageViewCount(): number { return this.props.pageViewCount; }

  /**
   * Business Action: Track event
   */
  trackEvent(isPageView: boolean): void {
    if (this.props.endedAt) {
      throw new Error('Cannot track event on ended session');
    }
    this.props.eventCount += 1;
    if (isPageView) {
      this.props.pageViewCount += 1;
    }
    this.incrementVersion();
  }

  /**
   * Business Action: End session
   */
  end(endedAt: EventTimestampVO, now: string): void {
    if (this.props.endedAt) {
      throw new Error('Session already ended');
    }
    const spanSeconds = Math.floor(
      (endedAt.value.epochMs - this.props.startedAt.value.epochMs) / 1000
    );
    if (spanSeconds < 0) {
      throw new Error('end time cannot be before start time');
    }

    this.props.endedAt = endedAt;
    this.props.duration = SessionDurationVO.create(spanSeconds);

    this.addDomainEvent(
      new SessionEndedEvent(
        this.id,
        spanSeconds,
        this.props.eventCount,
        now
      )
    );
    this.incrementVersion();
  }

  isAnonymous(): boolean {
    return this.props.userId === undefined;
  }

  isActive(): boolean {
    return this.props.endedAt === undefined;
  }

  isCompleted(): boolean {
    return this.props.endedAt !== undefined;
  }

  isBounce(): boolean {
    return this.props.pageViewCount <= 1;
  }

  isEngaged(): boolean {
    return this.props.duration?.isEngaged() ?? false;
  }

  eventsPerMinute(): number {
    const dur = this.props.duration;
    if (!dur || dur.isZero) return 0;
    return Math.round((this.props.eventCount / dur.minutes) * 100) / 100;
  }

  durationSeconds(): number {
    return this.props.duration?.seconds ?? 0;
  }
}
