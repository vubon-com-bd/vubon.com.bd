import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { FeedbackIdVO } from '../primitives/feedback-id.vo';
import { FeedbackTypeVO } from '../primitives/feedback-type.vo';
import { FeedbackStatusVO } from '../primitives/feedback-status.vo';
import { FeedbackContentVO } from '../primitives/feedback-content.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface FeedbackProps {
  readonly id: FeedbackIdVO;
  readonly userId: UserIdVO;
  readonly type: FeedbackTypeVO;
  readonly status: FeedbackStatusVO;
  readonly content: FeedbackContentVO;
  readonly createdAt: Date;
}

export class FeedbackVO extends BaseVO<FeedbackProps> {
  private constructor(props: FeedbackProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: FeedbackProps): FeedbackVO {
    return new FeedbackVO(props);
  }

  get id(): FeedbackIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): FeedbackTypeVO { return this.value.type; }
  get status(): FeedbackStatusVO { return this.value.status; }
  get content(): FeedbackContentVO { return this.value.content; }
  get createdAt(): Date { return this.value.createdAt; }
}
