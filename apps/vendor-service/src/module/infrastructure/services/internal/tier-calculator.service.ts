/**
 * TierCalculatorService — internal helper for tier evaluation
 * @module vendor-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import {
  VendorTierCalculatorService,
  type TierEvaluationInput,
  type TierEvaluationResult,
} from '../../../domain/services/vendor-tier-calculator.service.js';
import { VendorTierVO } from '../../../domain/value-objects/primitives/vendor-tier.vo.js';

export interface InternalTierInput {
  readonly currentTier: string;
  readonly totalSales: number;
  readonly totalOrders: number;
  readonly averageRating: number;
  readonly fulfillmentRate: number;
  readonly accountAgeDays: number;
}

@Injectable()
export class TierCalculatorService {
  evaluate(input: InternalTierInput): TierEvaluationResult {
    const domainInput: TierEvaluationInput = {
      currentTier: VendorTierVO.reconstitute(input.currentTier),
      totalSales: input.totalSales,
      totalOrders: input.totalOrders,
      averageRating: input.averageRating,
      fulfillmentRate: input.fulfillmentRate,
      accountAgeDays: input.accountAgeDays,
    };
    return VendorTierCalculatorService.evaluate(domainInput);
  }
}
