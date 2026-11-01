/**
 * FulfillmentStrategyService — Domain Service
 * @module logistics-service/domain/services
 *
 * Business Rules:
 *   - Calculates SLA due based on priority + type
 *   - Recommends picking strategy
 *   - Priority SLA: urgent=6h, high=12h, normal=24h, low=48h
 *   - Same-day overrides to +8h
 */
import type { FulfillmentEntity } from '../entities/fulfillment.entity.js';

export interface SlaCalculationInput {
  readonly priority: string;
  readonly type: string;
  readonly fromDate?: Date;
}

export interface PickingStrategyRecommendation {
  readonly strategy: 'fifo' | 'lifo' | 'nearest' | 'batch' | 'single';
  readonly reason: string;
}

export class FulfillmentStrategyService {
  static calculateSlaDue(params: SlaCalculationInput): Date {
    const from = params.fromDate ?? new Date();
    let hours = 24; // normal default

    if (params.priority === 'urgent') hours = 6;
    else if (params.priority === 'high') hours = 12;
    else if (params.priority === 'low') hours = 48;

    if (params.type === 'same_day') hours = Math.min(hours, 8);
    else if (params.type === 'express') hours = Math.min(hours, 16);

    return new Date(from.getTime() + hours * 60 * 60 * 1000);
  }

  static recommendPickingStrategy(
    fulfillment: FulfillmentEntity,
  ): PickingStrategyRecommendation {
    if (fulfillment.priority.isUrgent()) {
      return { strategy: 'single', reason: 'urgent priority — single-order pick' };
    }
    if (fulfillment.type.isFast()) {
      return { strategy: 'nearest', reason: 'fast fulfillment — nearest items' };
    }
    if (fulfillment.itemCount > 10) {
      return { strategy: 'batch', reason: 'many items — batch pick' };
    }
    return { strategy: 'fifo', reason: 'standard — first-in-first-out' };
  }

  static isSlaBreached(fulfillment: FulfillmentEntity, now: Date = new Date()): boolean {
    return fulfillment.isSlaBreached(now);
  }
}
