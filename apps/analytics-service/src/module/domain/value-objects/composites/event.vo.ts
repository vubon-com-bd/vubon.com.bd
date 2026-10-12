/**
 * Event Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { EventIdVO } from '../primitives/event-id.vo.js';
import { EventNameVO } from '../primitives/event-name.vo.js';
import { EventSourceVO } from '../primitives/event-source.vo.js';
import { EventTimestampVO } from '../primitives/event-timestamp.vo.js';
import { EventPayloadVO } from '../primitives/event-payload.vo.js';
import { SessionIdVO } from '../primitives/session-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';

export interface EventVOProps {
  readonly id: EventIdVO;
  readonly name: EventNameVO;
  readonly source: EventSourceVO;
  readonly timestamp: EventTimestampVO;
  readonly payload: EventPayloadVO;
  readonly sessionId?: SessionIdVO;
  readonly userId?: UserIdVO;
}

export class EventVO extends BaseVO<EventVOProps> {
  private constructor(props: EventVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: EventVOProps): EventVO {
    if (!props.id || !props.name || !props.source || !props.timestamp || !props.payload) {
      throw new Error('EventVO requires id, name, source, timestamp, payload');
    }
    if (props.name.isEcommerce() && !props.sessionId) {
      throw new Error('Ecommerce events must include a sessionId');
    }
    if (props.userId && !props.sessionId) {
      throw new Error('Authenticated events must include a sessionId');
    }
    return new EventVO(props);
  }

  get id(): EventIdVO { return this.value.id; }
  get name(): EventNameVO { return this.value.name; }
  get source(): EventSourceVO { return this.value.source; }
  get timestamp(): EventTimestampVO { return this.value.timestamp; }
  get payload(): EventPayloadVO { return this.value.payload; }
  get sessionId(): SessionIdVO | undefined { return this.value.sessionId; }
  get userId(): UserIdVO | undefined { return this.value.userId; }

  isAnonymous(): boolean { return this.userId === undefined; }
  isAuthenticated(): boolean { return this.userId !== undefined; }
  isRealTime(): boolean { return this.timestamp.isRealTime(); }
  isEcommerce(): boolean { return this.name.isEcommerce(); }
  isEngagement(): boolean { return this.name.isEngagement(); }
  isFunnelStep(): boolean { return this.name.isEcommerce(); }
  isRevenue(): boolean { return this.name.isEcommerce() && this.name.value === 'purchase'; }

  isSameSessionAs(other: EventVO): boolean {
    if (!this.sessionId || !other.sessionId) return false;
    return this.sessionId.equals(other.sessionId);
  }

  isSameUserAs(other: EventVO): boolean {
    if (!this.userId || !other.userId) return false;
    return this.userId.equals(other.userId);
  }

  hasPayloadKey(key: string): boolean {
    return this.payload.has(key);
  }

  timeSinceMs(other: EventVO): number {
    return this.timestamp.value.epochMs - other.timestamp.value.epochMs;
  }
}
