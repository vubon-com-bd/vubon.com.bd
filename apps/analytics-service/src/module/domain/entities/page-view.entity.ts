/**
 * Page View Entity
 * @module analytics-service/domain/entities
 *
 * Individual page view record।
 * Business Rule:
 * - Immutable after creation
 * - Duration can be updated once
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base';
import { PageViewIdVO } from '../value-objects/primitives/page-view-id.vo.js';
import { PagePathVO } from '../value-objects/primitives/page-path.vo.js';
import { ReferrerVO } from '../value-objects/primitives/referrer.vo.js';
import { UserAgentVO } from '../value-objects/primitives/user-agent.vo.js';
import { SessionIdVO } from '../value-objects/primitives/session-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { DeviceTypeVO } from '../value-objects/primitives/device-type.vo.js';
import { CountryCodeVO } from '../value-objects/primitives/country-code.vo.js';
import { EventTimestampVO } from '../value-objects/primitives/event-timestamp.vo.js';

export interface PageViewEntityProps {
  readonly path: PagePathVO;
  readonly sessionId: SessionIdVO;
  readonly userId?: UserIdVO;
  readonly referrer: ReferrerVO;
  readonly userAgent: UserAgentVO;
  readonly device: DeviceTypeVO;
  readonly country?: CountryCodeVO;
  readonly occurredAt: EventTimestampVO;
  durationMs?: number;
}

export class PageViewEntity extends BaseEntity<string> {
  private props: PageViewEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: PageViewEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: PageViewIdVO;
    path: PagePathVO;
    sessionId: SessionIdVO;
    referrer: ReferrerVO;
    userAgent: UserAgentVO;
    device: DeviceTypeVO;
    occurredAt: EventTimestampVO;
    userId?: UserIdVO;
    country?: CountryCodeVO;
    now: string;
  }): PageViewEntity {
    if (!params.id || !params.path || !params.sessionId || !params.referrer || !params.userAgent || !params.device || !params.occurredAt) {
      throw new Error('PageViewEntity requires id, path, sessionId, referrer, userAgent, device, occurredAt');
    }

    return new PageViewEntity(
      params.id.value,
      params.now,
      params.now,
      {
        path: params.path,
        sessionId: params.sessionId,
        userId: params.userId,
        referrer: params.referrer,
        userAgent: params.userAgent,
        device: params.device,
        country: params.country,
        occurredAt: params.occurredAt,
      }
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: PageViewEntityProps;
  }): PageViewEntity {
    return new PageViewEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get path(): PagePathVO { return this.props.path; }
  get sessionId(): SessionIdVO { return this.props.sessionId; }
  get userId(): UserIdVO | undefined { return this.props.userId; }
  get referrer(): ReferrerVO { return this.props.referrer; }
  get userAgent(): UserAgentVO { return this.props.userAgent; }
  get device(): DeviceTypeVO { return this.props.device; }
  get country(): CountryCodeVO | undefined { return this.props.country; }
  get occurredAt(): EventTimestampVO { return this.props.occurredAt; }
  get durationMs(): number | undefined { return this.props.durationMs; }

  /**
   * Business Action: Update duration (once)
   */
  updateDuration(durationMs: number): void {
    if (this.props.durationMs !== undefined) {
      throw new Error('Page view duration already set');
    }
    if (durationMs < 0) {
      throw new Error('Duration cannot be negative');
    }
    this.props.durationMs = durationMs;
  }

  isAnonymous(): boolean {
    return this.props.userId === undefined;
  }

  isLanding(): boolean {
    return this.props.referrer.isDirect() || this.props.referrer.isExternal();
  }

  isBot(): boolean {
    return this.props.device.isBot() || this.props.userAgent.isBot();
  }

  isRealUser(): boolean {
    return !this.isBot() && this.props.device.isRealUser();
  }

  timeOnPageSeconds(): number {
    if (this.props.durationMs === undefined) return 0;
    return Math.round(this.props.durationMs / 1000);
  }

  isProductPage(): boolean {
    return /^\/product/.test(this.props.path.value);
  }

  isCategoryPage(): boolean {
    return /^\/category/.test(this.props.path.value);
  }
}
