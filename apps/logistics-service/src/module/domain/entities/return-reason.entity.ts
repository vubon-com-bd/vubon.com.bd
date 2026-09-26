import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ReturnReasonTypeVO } from '../value-objects/primitives/return-reason-type.vo';

export interface ReturnReasonEntityProps {
  readonly code: string;
  readonly label: string;
  readonly type: ReturnReasonTypeVO;
  readonly status: string;
}

export class ReturnReasonEntity extends BaseEntity<string> {
  private readonly _code: string;
  private readonly _label: string;
  private readonly _type: ReturnReasonTypeVO;
  private readonly _status: string;

  private constructor(
    id: string,
    props: ReturnReasonEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._code = props.code;
    this._label = props.label;
    this._type = props.type;
    this._status = props.status;
  }

  static create(props: ReturnReasonEntityProps): ReturnReasonEntity {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();
    return new ReturnReasonEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: ReturnReasonEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): ReturnReasonEntity {
    return new ReturnReasonEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get code(): string { return this._code; }
  get label(): string { return this._label; }
  get type(): ReturnReasonTypeVO { return this._type; }
  get status(): string { return this._status; }
}
