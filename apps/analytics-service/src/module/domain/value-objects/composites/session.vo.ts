import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SessionIdVO } from '../primitives/session-id.vo';
import { SessionDurationVO } from '../primitives/session-duration.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { PagePathVO } from '../primitives/page-path.vo';

export interface SessionProps {
  readonly sessionId: SessionIdVO;
  readonly userId: UserIdVO | null;
  readonly duration: SessionDurationVO;
  readonly entryPage: PagePathVO;
  readonly exitPage: PagePathVO;
  readonly pageViewCount: number;
  readonly startedAt: Date;
}

export class SessionVO extends BaseVO<SessionProps> {
  static create(props: SessionProps): SessionVO {
    if (props.pageViewCount < 0) {
      throw new Error('Page view count cannot be negative');
    }
    return new SessionVO(Object.freeze({ ...props }));
  }

  private constructor(value: SessionProps) {
    super(value);
  }

  get sessionId(): SessionIdVO { return this.value.sessionId; }
  get userId(): UserIdVO | null { return this.value.userId; }
  get duration(): SessionDurationVO { return this.value.duration; }
  get entryPage(): PagePathVO { return this.value.entryPage; }
  get exitPage(): PagePathVO { return this.value.exitPage; }
  get pageViewCount(): number { return this.value.pageViewCount; }
  get startedAt(): Date { return this.value.startedAt; }

  get isAnonymous(): boolean {
    return this.value.userId === null;
  }

  get isBounce(): boolean {
    return this.value.pageViewCount <= 1;
  }

  get isEngaged(): boolean {
    return this.value.pageViewCount >= 3 || this.value.duration.seconds >= 60;
  }

  get pagesPerMinute(): number {
    const minutes = this.value.duration.seconds / 60;
    if (minutes === 0) return 0;
    return this.value.pageViewCount / minutes;
  }
}
