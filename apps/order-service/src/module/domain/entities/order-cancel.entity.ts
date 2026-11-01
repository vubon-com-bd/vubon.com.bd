/**
 * OrderCancelEntity — Child of Order aggregate
 * @module order-service/domain/entities
 *
 * ⚠️ BaseEntity-তে version নেই।
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { OrderCancelVO } from '../value-objects/composites/order-cancel.vo.js';
import { CancelStatusVO } from '../value-objects/primitives/cancel-status.vo.js';
import {
  OrderCancelRequestedEvent,
  OrderCancelApprovedEvent,
  OrderCancelRejectedEvent,
  OrderCancelProcessedEvent,
  OrderCancelRefundedEvent,
} from '../events/order-cancel.events.js';

export class OrderCancelEntity extends AggregateRoot<string> {
  private _vo: OrderCancelVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: OrderCancelVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
  }

  // ═══ Getters ═══
  get vo(): OrderCancelVO { return this._vo; }
  get orderId(): OrderCancelVO['orderId'] { return this._vo.orderId; }
  get status(): CancelStatusVO { return this._vo.status; }

  // ═══ Predicates ═══
  isPending(): boolean { return this._vo.isPending(); }
  isTerminal(): boolean { return this._vo.isTerminal(); }

  // ═══ Business methods ═══
  approve(approvedBy: string, now: string = new Date().toISOString()): void {
    if (!this.status.isRequested()) {
      throw new BusinessRuleError(
        `Cannot approve cancel in status "${this.status.value}"`,
        'ORDER_CANCEL_CANNOT_BE_APPROVED',
        { cancelId: this.id, status: this.status.value },
      );
    }
    this._vo = OrderCancelVO.create({
      ...this._vo.value,
      status: CancelStatusVO.approved(),
      approvedBy,
      processedAt: now,
    });
    this.addDomainEvent(
      new OrderCancelApprovedEvent({
        aggregateId: this.id,
        payload: {
          cancelId: this.id,
          orderId: this.orderId.value,
          approvedBy,
          approvedAt: now,
        },
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  reject(rejectedBy: string, reason: string, now: string = new Date().toISOString()): void {
    if (!this.status.isRequested()) {
      throw new BusinessRuleError(
        `Cannot reject cancel in status "${this.status.value}"`,
        'ORDER_CANCEL_CANNOT_BE_REJECTED',
        { cancelId: this.id, status: this.status.value },
      );
    }
    const notes = `${reason} (rejected by ${rejectedBy})`;
    this._vo = OrderCancelVO.create({
      ...this._vo.value,
      status: CancelStatusVO.create('rejected'),
      notes,
      processedAt: now,
    });
    this.addDomainEvent(
      new OrderCancelRejectedEvent({
        aggregateId: this.id,
        payload: {
          cancelId: this.id,
          orderId: this.orderId.value,
          rejectedBy,
          rejectionReason: reason,
        },
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  process(now: string = new Date().toISOString()): void {
    if (!this.status.isApproved()) {
      throw new BusinessRuleError(
        `Cannot process cancel in status "${this.status.value}"`,
        'ORDER_CANCEL_CANNOT_BE_PROCESSED',
        { cancelId: this.id, status: this.status.value },
      );
    }
    this._vo = OrderCancelVO.create({
      ...this._vo.value,
      status: CancelStatusVO.create('processed'),
      processedAt: now,
    });
    this.addDomainEvent(
      new OrderCancelProcessedEvent({
        aggregateId: this.id,
        payload: {
          cancelId: this.id,
          orderId: this.orderId.value,
          processedAt: now,
        },
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  refund(now: string = new Date().toISOString()): void {
    if (!this.status.isProcessed()) {
      throw new BusinessRuleError(
        `Cannot refund cancel in status "${this.status.value}"`,
        'ORDER_CANCEL_CANNOT_BE_REFUNDED',
        { cancelId: this.id, status: this.status.value },
      );
    }
    this._vo = OrderCancelVO.create({
      ...this._vo.value,
      status: CancelStatusVO.create('refunded'),
      processedAt: now,
    });
    this.addDomainEvent(
      new OrderCancelRefundedEvent({
        aggregateId: this.id,
        payload: {
          cancelId: this.id,
          orderId: this.orderId.value,
          refundAmount: 0,
          currency: 'BDT',
          refundedAt: now,
        },
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: OrderCancelVO;
    now: string;
  }): OrderCancelEntity {
    const entity = new OrderCancelEntity(params.id, params.now, params.now, params.vo, null);
    entity.addDomainEvent(
      new OrderCancelRequestedEvent({
        aggregateId: params.id,
        payload: {
          cancelId: params.id,
          orderId: params.vo.orderId.value,
          reason: params.vo.reason.value,
          requestedBy: params.vo.requestedBy,
          requestedAt: params.now,
        },
      }),
    );
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    vo: OrderCancelVO;
  }): OrderCancelEntity {
    return new OrderCancelEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.deletedAt ?? null,
    );
  }
}
