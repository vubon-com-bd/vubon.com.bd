/**
 * Page View Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Complete page view snapshot।
 * Business Rule:
 * - pagePath + referrer + userAgent + timestamp + device
 * - Anonymous allowed
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { PageViewIdVO } from '../primitives/page-view-id.vo.js';
import { PagePathVO } from '../primitives/page-path.vo.js';
import { ReferrerVO } from '../primitives/referrer.vo.js';
import { UserAgentVO } from '../primitives/user-agent.vo.js';
import { EventTimestampVO } from '../primitives/event-timestamp.vo.js';
import { SessionIdVO } from '../primitives/session-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { DeviceTypeVO } from '../primitives/device-type.vo.js';
import { CountryCodeVO } from '../primitives/country-code.vo.js';

export interface PageViewVOProps {
  readonly id: PageViewIdVO;
  readonly path: PagePathVO;
  readonly sessionId: SessionIdVO;
  readonly userId?: UserIdVO;
  readonly referrer: ReferrerVO;
  readonly userAgent: UserAgentVO;
  readonly device: DeviceTypeVO;
  readonly country?: CountryCodeVO;
  readonly occurredAt: EventTimestampVO;
  readonly durationMs?: number;
}

export class PageViewVO extends BaseVO<PageViewVOProps> {
  private constructor(props: PageViewVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: PageViewVOProps): PageViewVO {
    if (!props.id || !props.path || !props.sessionId || !props.referrer || !props.userAgent || !props.device || !props.occurredAt) {
      throw new Error('PageViewVO requires id, path, sessionId, referrer, userAgent, device, occurredAt');
    }

    if (props.durationMs !== undefined && props.durationMs < 0) {
      throw new Error('PageViewVO durationMs cannot be negative');
    }

    return new PageViewVO(props);
  }

  get id(): PageViewIdVO {
    return this.value.id;
  }

  get path(): PagePathVO {
    return this.value.path;
  }

  get sessionId(): SessionIdVO {
    return this.value.sessionId;
  }

  get userId(): UserIdVO | undefined {
    return this.value.userId;
  }

  get referrer(): ReferrerVO {
    return this.value.referrer;
  }

  get userAgent(): UserAgentVO {
    return this.value.userAgent;
  }

  get device(): DeviceTypeVO {
    return this.value.device;
  }

  get country(): CountryCodeVO | undefined {
    return this.value.country;
  }

  get occurredAt(): EventTimestampVO {
    return this.value.occurredAt;
  }

  get durationMs(): number | undefined {
    return this.value.durationMs;
  }

  isAnonymous(): boolean {
    return this.userId === undefined;
  }

  isLanding(): boolean {
    return this.referrer.isDirect() || this.referrer.isExternal();
  }

  isBot(): boolean {
    return this.device.isBot() || this.userAgent.isBot();
  }

  isRealUser(): boolean {
    return !this.isBot() && this.device.isRealUser();
  }

  /** Time on page in seconds */
  timeOnPageSeconds(): number {
    if (this.durationMs === undefined) return 0;
    return Math.round(this.durationMs / 1000);
  }

  /** Is product page */
  isProductPage(): boolean {
    return /^\/product/.test(this.path.value);
  }

  /** Is category page */
  isCategoryPage(): boolean {
    return /^\/category/.test(this.path.value);
  }
}
