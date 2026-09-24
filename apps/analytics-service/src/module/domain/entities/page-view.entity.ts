import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { PageViewIdVO } from '../value-objects/primitives/page-view-id.vo';
import { PagePathVO } from '../value-objects/primitives/page-path.vo';
import { ReferrerVO } from '../value-objects/primitives/referrer.vo';
import { UserAgentVO } from '../value-objects/primitives/user-agent.vo';
import { SessionIdVO } from '../value-objects/primitives/session-id.vo';

export interface PageViewEntityProps {
  readonly sessionId: SessionIdVO;
  readonly path: PagePathVO;
  readonly referrer: ReferrerVO;
  readonly userAgent: UserAgentVO;
  readonly viewedAt: Date;
  readonly timeOnPageSeconds: number;
}

export class PageViewEntity extends BaseEntity<PageViewIdVO> {
  private readonly _sessionId: SessionIdVO;
  private readonly _path: PagePathVO;
  private readonly _referrer: ReferrerVO;
  private readonly _userAgent: UserAgentVO;
  private readonly _viewedAt: Date;
  private readonly _timeOnPageSeconds: number;

  private constructor(
    id: PageViewIdVO,
    props: PageViewEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._sessionId = props.sessionId;
    this._path = props.path;
    this._referrer = props.referrer;
    this._userAgent = props.userAgent;
    this._viewedAt = props.viewedAt;
    this._timeOnPageSeconds = props.timeOnPageSeconds;
  }

  static create(props: PageViewEntityProps): PageViewEntity {
    if (props.timeOnPageSeconds < 0) {
      throw new Error('Time on page cannot be negative');
    }
    const now = new Date().toISOString();
    const id = PageViewIdVO.create(crypto.randomUUID());
    return new PageViewEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: PageViewIdVO,
    props: PageViewEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): PageViewEntity {
    return new PageViewEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get sessionId(): SessionIdVO { return this._sessionId; }
  get path(): PagePathVO { return this._path; }
  get referrer(): ReferrerVO { return this._referrer; }
  get userAgent(): UserAgentVO { return this._userAgent; }
  get viewedAt(): Date { return this._viewedAt; }
  get timeOnPageSeconds(): number { return this._timeOnPageSeconds; }

  get isBounce(): boolean {
    return this._timeOnPageSeconds < 10;
  }
}
