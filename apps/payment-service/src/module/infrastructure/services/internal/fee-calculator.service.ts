/**
 * FeeCalculatorService — gateway fee + VAT façade
 * @module payment-service/infrastructure/services/internal
 *
 * Wraps the domain FeeCalculationService with config-driven rates.
 */
import { Injectable, Logger } from '@nestjs/common';
import {
  FeeCalculationService,
  type FeeBreakdown,
} from '@domain/services/fee-calculation.service';

export const FEE_CALCULATOR_SERVICE = Symbol('FEE_CALCULATOR_SERVICE');

export interface FeeCalcInput {
  readonly amount: number;
  readonly currency: string;
  readonly provider: string;
  readonly method: string;
}

@Injectable()
export class FeeCalculatorService {
  private readonly logger = new Logger(FeeCalculatorService.name);

  calculate(input: FeeCalcInput): FeeBreakdown {
    const result = FeeCalculationService.calculate(input);
    this.logger.debug(
      `fee calc: ${input.amount} ${input.currency} via ${input.provider} → fee=${result.platformFee}, vat=${result.vatAmount}, net=${result.netAmount}`,
    );
    return result;
  }

  platformFeeOnly(amount: number, provider: string): number {
    return FeeCalculationService.platformFeeOf(amount, provider);
  }
}
