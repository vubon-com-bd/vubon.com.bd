import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ComplaintIdVO } from '../value-objects/primitives/complaint-id.vo';
import { ComplaintTypeVO } from '../value-objects/primitives/complaint-type.vo';
import { ComplaintStatusVO } from '../value-objects/primitives/complaint-status.vo';
import { ComplaintSeverityVO } from '../value-objects/primitives/complaint-severity.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface ComplaintEntityProps {
  readonly userId: UserIdVO;
  readonly type: ComplaintTypeVO;
  readonly severity: ComplaintSeverityVO;
  readonly status: ComplaintStatusVO;
  readonly content: string;
}

export class ComplaintEntity extends AggregateRoot<ComplaintIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _type: ComplaintTypeVO;
  private readonly _severity: ComplaintSeverityVO;
  private readonly _status: ComplaintStatusVO;
  private readonly _content: string;

  private constructor(
    id: ComplaintIdVO,
    props: ComplaintEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._type = props.type;
    this._severity = props.severity;
    this._status = props.status;
    this._content = props.content;
  }

  static create(props: ComplaintEntityProps): ComplaintEntity {
    const now = new Date().toISOString();
    const id = ComplaintIdVO.create(crypto.randomUUID());
    return new ComplaintEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: ComplaintIdVO,
    props: ComplaintEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ComplaintEntity {
    return new ComplaintEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get userId(): UserIdVO { return this._userId; }
  get type(): ComplaintTypeVO { return this._type; }
  get severity(): ComplaintSeverityVO { return this._severity; }
  get status(): ComplaintStatusVO { return this._status; }
  get content(): string { return this._content; }
}
