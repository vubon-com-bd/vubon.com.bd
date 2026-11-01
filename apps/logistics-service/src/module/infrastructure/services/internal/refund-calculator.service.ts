/**
 * RefundCalculatorService — Refund + restocking fee math
 * @module logistics-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';

export interface RefundInput {
  readonly orderAmount: number;
  readonly refundItems: readonly { unitPrice: number; quantity: number }[];
  readonly restockFeePct?: number;    // 0..1
  readonly shippingRefundable?: boolean;
  readonly shippingAmount?: number;
}

export interface RefundResult {
  readonly itemsRefund: number;
  readonly shippingRefund: number;
  readonly restockFee: number;
  readonly totalRefund: number;
  readonly currency: string;
}

@Injectable()
export class RefundCalculatorService {
  calculate(input: RefundInput): RefundResult {
    const {
      refundItems,
      restockFeePct = 0,
      shippingRefundable = false,
      shippingAmount = 0,
    } = input;

    const itemsRefund = this.round2(
      refundItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    );
    const shippingRefund = shippingRefundable ? this.round2(shippingAmount) : 0;
    const restockFee = this.round2(itemsRefund * restockFeePct);
    const totalRefund = this.round2(itemsRefund + shippingRefund - restockFee);

    return {
      itemsRefund,
      shippingRefund,
      restockFee,
      totalRefund: Math.max(0, totalRefund),
      currency: 'BDT',
    };
  }

  private round2(n: number): number {
    return Math.round(n * 100) / 100;
  }
}
