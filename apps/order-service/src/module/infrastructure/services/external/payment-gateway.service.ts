/**
 * PaymentGatewayService — external adapter (interface + stub impl)
 * @module order-service/infrastructure/services/external
 *
 * NOTE: Real HTTP integration is out of scope — this is a stub that
 * satisfies the interface. Plug real SDK in wiring phase.
 */
import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

export const PAYMENT_GATEWAY_SERVICE = Symbol('PAYMENT_GATEWAY_SERVICE');

export interface PaymentChargeResult {
  readonly success: boolean;
  readonly transactionId?: string;
  readonly failureReason?: string;
}

export interface RefundResult {
  readonly success: boolean;
  readonly refundId?: string;
  readonly failureReason?: string;
}

export interface IPaymentGatewayService {
  charge(orderId: string, amount: number, currency: string): Promise<PaymentChargeResult>;
  refund(orderId: string, amount: number, currency: string, reason: string): Promise<RefundResult>;
}

@Injectable()
export class PaymentGatewayService implements IPaymentGatewayService {
  private readonly logger = new Logger(PaymentGatewayService.name);

  async charge(orderId: string, amount: number, currency: string): Promise<PaymentChargeResult> {
    this.logger.log(`charge ${orderId}: ${amount} ${currency}`);
    return { success: true, transactionId: `txn_${randomUUID()}` };
  }

  async refund(
    orderId: string,
    amount: number,
    currency: string,
    reason: string,
  ): Promise<RefundResult> {
    this.logger.log(`refund ${orderId}: ${amount} ${currency} (${reason})`);
    return { success: true, refundId: `ref_${randomUUID()}` };
  }
}
