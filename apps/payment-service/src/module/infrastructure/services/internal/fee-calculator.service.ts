import { Injectable } from '@nestjs/common';
import { FEE_CONFIG } from '../../config/fee.config';

export interface FeeBreakdown {
  readonly platformFee: number;
  readonly gatewayFee: number;
  readonly totalFee: number;
  readonly netAmount: number;
}

@Injectable()
export class FeeCalculatorService {
  calculate(amount: number, gateway: string): FeeBreakdown {
    const gatewayPercent =
      FEE_CONFIG.gatewayFees[gateway as keyof typeof FEE_CONFIG.gatewayFees] ?? 0;
    const platformFee = Math.round((amount * FEE_CONFIG.platformFeePercent) / 100 * 100) / 100;
    const gatewayFee = Math.round((amount * gatewayPercent) / 100 * 100) / 100;
    const totalFee = Math.round((platformFee + gatewayFee) * 100) / 100;
    return {
      platformFee,
      gatewayFee,
      totalFee,
      netAmount: Math.round((amount - totalFee) * 100) / 100,
    };
  }
}
