/**
 * OrderSnapshotGeneratorService — DI-injectable snapshot generator
 * @module order-service/infrastructure/services/internal
 *
 * NOTE: Distinct from domain's OrderSnapshotService (which is static).
 * This one is injectable and can be mocked / overridden in tests.
 */
import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../../../domain/entities/order.entity.js';
import { OrderSnapshotVO } from '../../../domain/value-objects/composites/order-snapshot.vo.js';
import { OrderSnapshotService } from '../../../domain/services/order-snapshot.service.js';

export const ORDER_SNAPSHOT_GENERATOR = Symbol('ORDER_SNAPSHOT_GENERATOR');

export interface SnapshotRequest {
  readonly reason: string;
  readonly takenBy?: string;
  readonly now?: string;
}

export interface IOrderSnapshotGeneratorService {
  create(order: OrderEntity, options: SnapshotRequest): OrderSnapshotVO;
  diff(before: OrderSnapshotVO, after: OrderSnapshotVO): readonly string[];
  isIdentical(a: OrderSnapshotVO, b: OrderSnapshotVO): boolean;
}

@Injectable()
export class OrderSnapshotGeneratorService implements IOrderSnapshotGeneratorService {
  create(order: OrderEntity, options: SnapshotRequest): OrderSnapshotVO {
    return OrderSnapshotService.create(order, options);
  }
  diff(before: OrderSnapshotVO, after: OrderSnapshotVO): readonly string[] {
    return OrderSnapshotService.diff(before, after);
  }
  isIdentical(a: OrderSnapshotVO, b: OrderSnapshotVO): boolean {
    return OrderSnapshotService.isIdentical(a, b);
  }
}
