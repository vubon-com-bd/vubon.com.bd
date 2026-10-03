/**
 * OrderHistoryVO
 * @module order-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { HistoryIdVO } from '../primitives/history-id.vo.js';
import { HistoryTypeVO } from '../primitives/history-type.vo.js';
import { OrderIdVO } from '../primitives/order-id.vo.js';

export interface OrderHistoryVOProps {
  readonly id: HistoryIdVO;
  readonly orderId: OrderIdVO;
  readonly type: HistoryTypeVO;
  readonly fromValue?: string;
  readonly toValue?: string;
  readonly actorId?: string;
  readonly actorType?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly createdAt: string;
}

export class OrderHistoryVO extends BaseVO<OrderHistoryVOProps> {
  private constructor(props: OrderHistoryVOProps) { super(props); }

  static create(props: OrderHistoryVOProps): OrderHistoryVO {
    const vo = new OrderHistoryVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: OrderHistoryVOProps): OrderHistoryVO {
    return new OrderHistoryVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.createdAt || !Date.parse(v.createdAt)) {
      throw new ValidationError('Invalid createdAt date', 'createdAt');
    }
    if (v.type.isStatusChange() && (!v.fromValue || !v.toValue)) {
      throw new ValidationError(
        'Status change history requires fromValue and toValue',
        'fromValue',
      );
    }
  }

  get id(): HistoryIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get type(): HistoryTypeVO { return this.value.type; }
  get fromValue(): string | undefined { return this.value.fromValue; }
  get toValue(): string | undefined { return this.value.toValue; }
  get actorId(): string | undefined { return this.value.actorId; }
  get actorType(): string | undefined { return this.value.actorType; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this.value.metadata; }
  get createdAt(): string { return this.value.createdAt; }

  /** Human-readable summary. */
  get summary(): string {
    if (this.type.isStatusChange()) {
      return `${this.fromValue} → ${this.toValue}`;
    }
    return this.type.value;
  }

  isSystemGenerated(): boolean {
    return this.actorType === 'system';
  }

  isUserAction(): boolean {
    return this.actorType === 'user';
  }
}
