import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { FeedbackIdVO } from '../value-objects/primitives/feedback-id.vo';
import { FeedbackTypeVO } from '../value-objects/primitives/feedback-type.vo';
import { FeedbackStatusVO } from '../value-objects/primitives/feedback-status.vo';
import { FeedbackContentVO } from '../value-objects/primitives/feedback-content.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface FeedbackEntityProps {
  readonly userId: UserIdVO;
  readonly type: FeedbackTypeVO;
  readonly status: FeedbackStatusVO;
  readonly content: FeedbackContentVO;
}

export class FeedbackEntity extends AggregateRoot<FeedbackIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _type: FeedbackTypeVO;
  private readonly _status: FeedbackStatusVO;
  private readonly _content: FeedbackContentVO;

  private constructor(
    id: FeedbackIdVO,
    props: FeedbackEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._type = props.type;
    this._status = props.status;
    this._content = props.content;
  }

  static create(props: FeedbackEntityProps): FeedbackEntity {
    const now = new Date().toISOString();
    const id = FeedbackIdVO.create(crypto.randomUUID());
    return new FeedbackEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: FeedbackIdVO,
    props: FeedbackEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): FeedbackEntity {
    return new FeedbackEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get userId(): UserIdVO { return this._userId; }
  get type(): FeedbackTypeVO { return this._type; }
  get status(): FeedbackStatusVO { return this._status; }
  get content(): FeedbackContentVO { return this._content; }
}
