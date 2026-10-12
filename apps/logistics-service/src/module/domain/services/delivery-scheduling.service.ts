/**
 * DeliverySchedulingService — compute delivery date estimates
 * @module logistics-service/domain/services
 *
 * Uses shared-utils calculateDeliveryTime to skip weekends.
 * Honors config: DELIVERY_CONFIG.sameDayCutoffHour.
 */
import { DELIVERY_CONFIG } from '@vubon/shared-config/logistics';
import { calculateDeliveryTime } from '@vubon/shared-utils/calculator';
import type { DeliveryTypeVO } from '../value-objects/primitives/delivery-type.vo.js';
import type { ZoneEntity } from '../entities/zone.entity.js';

export interface DeliveryEstimate {
  readonly estimatedAt: string;
  readonly earliestAt: string;
  readonly latestAt: string;
  readonly estimatedDays: number;
  readonly isSameDay: boolean;
}

export class DeliverySchedulingService {
  static estimate(params: {
    type: DeliveryTypeVO;
    zone: ZoneEntity;
    fromDate?: Date;
  }): DeliveryEstimate {
    const from = params.fromDate ?? new Date();
    const zoneMin = params.zone.minDeliveryDays;
    const zoneMax = params.zone.maxDeliveryDays;
    const typeDays = params.type.estimatedDays;

    let baseDays: number;
    if (params.type.isSameDay()) {
      baseDays = this.isBeforeSameDayCutoff(from) ? 0 : 1;
    } else if (params.type.isExpress()) {
      baseDays = Math.max(1, zoneMin);
    } else {
      baseDays = Math.max(zoneMin, typeDays);
    }

    const earliest = calculateDeliveryTime({ from, businessDays: baseDays });
    const latestDays = Math.max(baseDays + 1, zoneMax);
    const latest = calculateDeliveryTime({ from, businessDays: latestDays });

    return {
      estimatedAt: earliest.toISOString(),
      earliestAt: earliest.toISOString(),
      latestAt: latest.toISOString(),
      estimatedDays: baseDays,
      isSameDay: baseDays === 0,
    };
  }

  /** Can we still make a same-day delivery today? */
  static isBeforeSameDayCutoff(at: Date = new Date()): boolean {
    return at.getHours() < DELIVERY_CONFIG.sameDayCutoffHour;
  }

  /** Compute the next valid pickup slot based on business hours. */
  static nextPickupSlot(at: Date = new Date()): Date {
    const result = new Date(at.getTime());
    const hour = result.getHours();
    const START = 8;
    const END = 20;
    if (hour < START) {
      result.setHours(START, 0, 0, 0);
      return result;
    }
    if (hour >= END) {
      const tomorrow = calculateDeliveryTime({ from: result, businessDays: 1 });
      tomorrow.setHours(START, 0, 0, 0);
      return tomorrow;
    }
    return result;
  }
}
