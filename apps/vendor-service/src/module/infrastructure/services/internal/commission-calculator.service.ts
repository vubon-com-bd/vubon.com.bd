/**
 * CommissionCalculatorService — internal helper for commission math
 * @module vendor-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { CommissionCalculatorService as DomainCommissionCalculator } from '../../../domain/services/commission-calculator.service.js';
import type { VendorCommissionVO } from '../../../domain/value-objects/composites/vendor-commission.vo.js';

export interface InternalCommissionInput {
  readonly orderAmount: number;
  readonly categoryId?: string;
  readonly discountAmount?: number;
  readonly currency?: string;
}

@Injectable()
export class CommissionCalculatorService {
  calculate(commission: VendorCommissionVO, input: InternalCommissionInput) {
    return DomainCommissionCalculator.calculate(
      commission,
      {
        orderAmount: input.orderAmount,
        categoryId: input.categoryId,
        discountAmount: input.discountAmount,
      },
      input.currency ?? 'BDT',
    );
  }
}
