/**
 * PayoutCalculatorService — internal helper for payout fee math
 * @module vendor-service/infrastructure/services/internal
 *
 * This delegates to domain services; kept as a thin wrapper so infrastructure
 * consumers (workers) can inject a single service.
 */
import { Injectable } from '@nestjs/common';
import { PayoutCalculatorService as DomainPayoutCalculator } from '../../../domain/services/payout-calculator.service.js';

export interface InternalPayoutInput {
  readonly amount: number;
  readonly method: string;
  readonly currency?: string;
}

@Injectable()
export class PayoutCalculatorService {
  calculate(input: InternalPayoutInput): {
    readonly grossAmount: number;
    readonly fee: number;
    readonly netAmount: number;
    readonly currency: string;
  } {
    const result = DomainPayoutCalculator.calculate({
      amount: input.amount,
      method: input.method as never,
      currency: input.currency,
    });
    return {
      grossAmount: result.grossAmount,
      fee: result.fee,
      netAmount: result.netAmount,
      currency: result.currency,
    };
  }
}
