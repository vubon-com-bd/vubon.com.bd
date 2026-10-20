/**
 * OrderReturnEntity — Child of Order aggregate
 * @module order-service/domain/entities
 *
 * ⚠️ BaseEntity-তে version নেই।
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { OrderReturnVO } from '../value-objects/composites/order-return.vo.js';
import { ReturnStatusVO } from '../value-objects/primitives/return-status.vo.js';

export class OrderReturnEntity extends BaseEntity<string> {
  private _vo: OrderReturnVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: OrderReturnVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
  }

  // ═══ Getters ═══
  get vo(): OrderReturnVO { return this._vo; }
  get orderId(): OrderReturnVO['orderId'] { return this._vo.orderId; }
  get customerId(): OrderReturnVO['customerId'] { return this._vo.customerId; }
  get status(): ReturnStatusVO { return this._vo.status; }
  get itemIds(): readonly string[] { return this._vo.itemIds; }

  // ═══ Predicates ═══
  isPending(): boolean { return this._vo.isPending(); }
  isTerminal(): boolean { return this._vo.isTerminal(); }

  // ═══ Business methods ═══
  approve(now: string = new Date().toISOString()): void {
    this.transitionTo('approved', now);
  }

  reject(reason: string, now: string = new Date().toISOString()): void {
    if (!this.status.isRequested()) {
      throw new BusinessRuleError(
        `Cannot reject return in status "${this.status.value}"`,
        'ORDER_RETURN_CANNOT_BE_REJECTED',
        { returnId: this.id, status: this.status.value },
      );
    }
    this._vo = OrderReturnVO.create({
      ...this._vo.value,
      status: ReturnStatusVO.create('rejected'),
      notes: reason,
    });
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  schedulePickup(now: string = new Date().toISOString()): void {
    this.transitionTo('pickup_scheduled', now);
  }

  pickUp(now: string = new Date().toISOString()): void {
    this.transitionTo('picked_up', now);
  }

  receive(now: string = new Date().toISOString()): void {
    this.transitionTo('received', now);
  }

  inspect(now: string = new Date().toISOString()): void {
    this.transitionTo('inspected', now);
  }

  refund(now: string = new Date().toISOString()): void {
    this.transitionTo('refunded', now);
  }

  replace(now: string = new Date().toISOString()): void {
    this.transitionTo('replaced', now);
  }

  close(now: string = new Date().toISOString()): void {
    this.transitionTo('closed', now);
  }

  // ═══ Private Helpers ═══
  private transitionTo(target: string, now: string): void {
    if (!this.status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid return status transition: "${this.status.value}" → "${target}"`,
        'INVALID_ORDER_RETURN_STATUS_TRANSITION',
        { from: this.status.value, to: target, returnId: this.id },
      );
    }
    this._vo = OrderReturnVO.create({
      ...this._vo.value,
      status: ReturnStatusVO.create(target),
    });
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: OrderReturnVO;
    now: string;
  }): OrderReturnEntity {
    return new OrderReturnEntity(params.id, params.now, params.now, params.vo, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    vo: OrderReturnVO;
  }): OrderReturnEntity {
    return new OrderReturnEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.deletedAt ?? null,
    );
  }
}
