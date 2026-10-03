/**
 * OrderHistoryEntity — immutable audit log entry
 * @module order-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { HistoryIdVO } from '../value-objects/primitives/history-id.vo.js';
import { HistoryTypeVO } from '../value-objects/primitives/history-type.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';

export interface OrderHistoryEntityProps {
  readonly orderId: OrderIdVO;
  readonly type: HistoryTypeVO;
  readonly fromValue?: string;
  readonly toValue?: string;
  readonly actorId?: string;
  readonly actorType?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class OrderHistoryEntity extends BaseEntity<string> {
  private readonly _orderId: OrderIdVO;
  private readonly _type: HistoryTypeVO;
  private readonly _fromValue?: string;
  private readonly _toValue?: string;
  private readonly _actorId?: string;
  private readonly _actorType?: string;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: OrderHistoryEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._orderId = props.orderId;
    this._type = props.type;
    this._fromValue = props.fromValue;
    this._toValue = props.toValue;
    this._actorId = props.actorId;
    this._actorType = props.actorType;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._type.isStatusChange() && (!this._fromValue || !this._toValue)) {
      throw new ValidationError('Status change requires from/to values', 'fromValue');
    }
  }

  get toIdVO(): HistoryIdVO { return HistoryIdVO.reconstitute(this.id); }
  get orderId(): OrderIdVO { return this._orderId; }
  get type(): HistoryTypeVO { return this._type; }
  get fromValue(): string | undefined { return this._fromValue; }
  get toValue(): string | undefined { return this._toValue; }
  get actorId(): string | undefined { return this._actorId; }
  get actorType(): string | undefined { return this._actorType; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get summary(): string {
    if (this._type.isStatusChange()) {
      return `${this._fromValue} → ${this._toValue}`;
    }
    return this._type.value;
  }

  isSystemGenerated(): boolean { return this._actorType === 'system'; }
  isUserAction(): boolean { return this._actorType === 'user'; }

  static create(params: {
    id: string;
    props: OrderHistoryEntityProps;
    now: string;
  }): OrderHistoryEntity {
    return new OrderHistoryEntity(params.id, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: OrderHistoryEntityProps;
  }): OrderHistoryEntity {
    return new OrderHistoryEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
