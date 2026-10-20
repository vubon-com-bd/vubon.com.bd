/**
 * OrderHistoryEntity — Child of Order aggregate (append-only)
 * @module order-service/domain/entities
 *
 * ⚠️ BaseEntity-তে version নেই।
 * ⚠️ Append-only — no mutations allowed.
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';

import { OrderHistoryVO } from '../value-objects/composites/order-history.vo.js';

export class OrderHistoryEntity extends BaseEntity<string> {
  private readonly _vo: OrderHistoryVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: OrderHistoryVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
  }

  // ═══ Getters (read-only) ═══
  get vo(): OrderHistoryVO { return this._vo; }
  get orderId(): OrderHistoryVO['orderId'] { return this._vo.orderId; }
  get type(): OrderHistoryVO['type'] { return this._vo.type; }
  get message(): string { return this._vo.message; }
  get occurredAt(): string { return this._vo.occurredAt; }

  // ═══ Predicates ═══
  isSystemGenerated(): boolean { return this._vo.isSystemGenerated(); }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: OrderHistoryVO;
    now: string;
  }): OrderHistoryEntity {
    return new OrderHistoryEntity(params.id, params.now, params.now, params.vo, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    vo: OrderHistoryVO;
  }): OrderHistoryEntity {
    return new OrderHistoryEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.deletedAt ?? null,
    );
  }
}
