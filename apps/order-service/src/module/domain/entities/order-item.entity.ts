/**
 * OrderItemEntity — Child of Order aggregate
 * @module order-service/domain/entities
 *
 * ⚠️ BaseEntity-তে version নেই।
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { OrderItemVO } from '../value-objects/composites/order-item.vo.js';
import { OrderItemStatusVO } from '../value-objects/primitives/order-item-status.vo.js';
import { OrderItemQuantityVO } from '../value-objects/primitives/order-item-quantity.vo.js';

export class OrderItemEntity extends BaseEntity<string> {
  private _vo: OrderItemVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: OrderItemVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
  }

  // ═══ Getters ═══
  get vo(): OrderItemVO { return this._vo; }
  get orderId(): OrderItemVO['orderId'] { return this._vo.orderId; }
  get productId(): OrderItemVO['productId'] { return this._vo.productId; }
  get quantity(): OrderItemQuantityVO { return this._vo.quantity; }
  get status(): OrderItemStatusVO { return this._vo.status; }

  // ═══ Predicates ═══
  isCancellable(): boolean { return this._vo.isCancellable(); }
  isReturnable(): boolean { return this._vo.isReturnable(); }
  get lineTotal(): number { return this._vo.lineTotal.amount; }

  // ═══ Business methods ═══
  updateQuantity(quantity: OrderItemQuantityVO, now: string = new Date().toISOString()): void {
    if (!this.status.isPending() && !this.status.isConfirmed()) {
      throw new BusinessRuleError(
        `Cannot update quantity of order item in status "${this.status.value}"`,
        'ORDER_ITEM_CANNOT_BE_MODIFIED',
        { itemId: this.id, status: this.status.value },
      );
    }
    this._vo = OrderItemVO.create({ ...this._vo.value, quantity });
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  changeStatus(target: string, now: string = new Date().toISOString()): void {
    if (!this.status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Cannot transition order item status from "${this.status.value}" to "${target}"`,
        'INVALID_ORDER_ITEM_STATUS_TRANSITION',
        { from: this.status.value, to: target, itemId: this.id },
      );
    }
    this._vo = OrderItemVO.create({
      ...this._vo.value,
      status: OrderItemStatusVO.create(target),
    });
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  cancel(now: string = new Date().toISOString()): void {
    if (!this.isCancellable()) {
      throw new BusinessRuleError(
        `Order item "${this.id}" cannot be cancelled in status "${this.status.value}"`,
        'ORDER_ITEM_CANNOT_BE_CANCELLED',
        { itemId: this.id, status: this.status.value },
      );
    }
    this._vo = OrderItemVO.create({
      ...this._vo.value,
      status: OrderItemStatusVO.cancelled(),
    });
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  markReturned(now: string = new Date().toISOString()): void {
    if (!this.isReturnable()) {
      throw new BusinessRuleError(
        `Order item "${this.id}" cannot be returned in status "${this.status.value}"`,
        'ORDER_ITEM_CANNOT_BE_RETURNED',
        { itemId: this.id, status: this.status.value },
      );
    }
    this._vo = OrderItemVO.create({
      ...this._vo.value,
      status: OrderItemStatusVO.create('returned'),
    });
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: OrderItemVO;
    now: string;
  }): OrderItemEntity {
    if (!params.vo.status.isPending()) {
      throw new ValidationError('New order item must be in pending status', 'status');
    }
    return new OrderItemEntity(params.id, params.now, params.now, params.vo, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    vo: OrderItemVO;
  }): OrderItemEntity {
    return new OrderItemEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.deletedAt ?? null,
    );
  }
}
