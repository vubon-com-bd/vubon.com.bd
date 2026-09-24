import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PageViewIdVO } from '../primitives/page-view-id.vo';
import { PagePathVO } from '../primitives/page-path.vo';
import { ReferrerVO } from '../primitives/referrer.vo';
import { UserAgentVO } from '../primitives/user-agent.vo';

export interface PageViewProps {
  readonly pageViewId: PageViewIdVO;
  readonly path: PagePathVO;
  readonly referrer: ReferrerVO;
  readonly userAgent: UserAgentVO;
  readonly viewedAt: Date;
  readonly timeOnPageSeconds: number;
}

export class PageViewVO extends BaseVO<PageViewProps> {
  static create(props: PageViewProps): PageViewVO {
    if (props.timeOnPageSeconds < 0) {
      throw new Error('Time on page cannot be negative');
    }
    return new PageViewVO(Object.freeze({ ...props }));
  }

  private constructor(value: PageViewProps) {
    super(value);
  }

  get pageViewId(): PageViewIdVO { return this.value.pageViewId; }
  get path(): PagePathVO { return this.value.path; }
  get referrer(): ReferrerVO { return this.value.referrer; }
  get userAgent(): UserAgentVO { return this.value.userAgent; }
  get viewedAt(): Date { return this.value.viewedAt; }
  get timeOnPageSeconds(): number { return this.value.timeOnPageSeconds; }

  get isBounce(): boolean {
    return this.value.timeOnPageSeconds < 10;
  }

  get isDeepRead(): boolean {
    return this.value.timeOnPageSeconds >= 180;
  }
}
