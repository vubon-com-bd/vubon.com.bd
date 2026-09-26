import { Injectable } from '@nestjs/common';

export interface CommissionResult {
  readonly rate: number;
  readonly orderAmount: number;
  readonly commissionAmount: number;
  readonly netAmount: number;
  readonly currency: string;
}

@Injectable()
export class CommissionCalculatorService {
  calculate(
    orderAmount: number,
    rate: number,
    currency: string = 'BDT',
  ): CommissionResult {
    const commissionAmount = Math.round(orderAmount * (rate / 100) * 100) / 100;
    const netAmount = Math.round((orderAmount - commissionAmount) * 100) / 100;
    return {
      rate,
      orderAmount,
      commissionAmount,
      netAmount,
      currency,
    };
  }

  netAmount(orderAmount: number, rate: number): number {
    return Math.round((orderAmount * (1 - rate / 100)) * 100) / 100;
  }
}
