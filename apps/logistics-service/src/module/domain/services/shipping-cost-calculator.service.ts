/**
 * ShippingCostCalculatorService — compute cost from weight/zone/method
 * @module logistics-service/domain/services
 *
 * Uses shared-utils calculateShippingCost for the base formula,
 * then layers in COD charge, remote surcharge, free-shipping threshold.
 */
import { SHIPPING_CONFIG } from '@vubon/shared-config/logistics';
import { calculateShippingCost } from '@vubon/shared-utils/calculator';
import type { ShippingMethodEntity } from '../entities/shipping-method.entity.js';
import type { ZoneEntity } from '../entities/zone.entity.js';
import type { ShipmentDimensionsVO } from '../value-objects/composites/shipment-dimensions.vo.js';
import { ShippingCostVO } from '../value-objects/primitives/shipping-cost.vo.js';

export interface ShippingCostInput {
  readonly method: ShippingMethodEntity;
  readonly zone: ZoneEntity;
  readonly dimensions: ShipmentDimensionsVO;
  readonly orderValue: number;
  readonly isCOD: boolean;
  readonly currency: string;
}

export interface ShippingCostBreakdown {
  readonly baseCost: number;
  readonly weightSurcharge: number;
  readonly zoneMultiplier: number;
  readonly remoteSurcharge: number;
  readonly codCharge: number;
  readonly discount: number;
  readonly total: ShippingCostVO;
  readonly currency: string;
  readonly isFreeShipping: boolean;
}

export class ShippingCostCalculatorService {
  static calculate(input: ShippingCostInput): ShippingCostBreakdown {
    const chargeableWeightKg = input.dimensions.chargeableWeightKg.value;
    const perKg = 20;
    const zoneMultiplier = input.zone.isRemote ? 2 : 1;

    // Base + weight surcharge via shared-utils
    const baseCostRaw = calculateShippingCost({
      actualWeightKg: chargeableWeightKg,
      baseRate: input.method.baseCost.amount,
      perKgRate: perKg,
      zoneMultiplier,
    });

    const baseCost = input.method.baseCost.amount;
    const weightSurcharge = Math.max(0, baseCostRaw - baseCost * zoneMultiplier);
    const zoneSurcharge = baseCost * zoneMultiplier - baseCost;
    const remoteSurcharge = input.zone.isRemote ? SHIPPING_CONFIG.remoteSurcharge : 0;
    const codCharge = input.isCOD ? SHIPPING_CONFIG.codCharge : 0;

    let subtotal = baseCost + weightSurcharge + zoneSurcharge + remoteSurcharge + codCharge;

    // Free-shipping threshold
    let isFreeShipping = false;
    if (input.method.freeAbove && input.orderValue >= input.method.freeAbove.amount) {
      isFreeShipping = true;
      subtotal = remoteSurcharge + codCharge;
    }

    const total = Math.max(0, Math.round(subtotal * 100) / 100);
    return {
      baseCost,
      weightSurcharge: Math.round(weightSurcharge * 100) / 100,
      zoneMultiplier,
      remoteSurcharge,
      codCharge,
      discount: isFreeShipping ? baseCost + weightSurcharge + zoneSurcharge : 0,
      total: ShippingCostVO.create(total, input.currency),
      currency: input.currency,
      isFreeShipping,
    };
  }
}
