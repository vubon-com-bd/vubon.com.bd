/**
 * PaymentService — bridge to payment-service
 * @module order-service/infrastructure/external/payment
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface InitiatePaymentInput {
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly method: string;
  readonly customerId: string;
  readonly returnUrl?: string;
}

export interface InitiatePaymentResult {
  readonly success: boolean;
  readonly paymentId?: string;
  readonly redirectUrl?: string;
  readonly error?: string;
}

export interface RefundInput {
  readonly orderId: string;
  readonly paymentId: string;
  readonly amount: number;
  readonly reason: string;
}

export interface RefundResult {
  readonly success: boolean;
  readonly refundId?: string;
  readonly error?: string;
}

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor() {
    this.baseUrl = getOptionalEnv('PAYMENT_SERVICE_URL', 'http://localhost:3005');
    this.timeout = Number(getOptionalEnv('PAYMENT_SERVICE_TIMEOUT', '10000'));
  }

  async initiate(input: InitiatePaymentInput): Promise<InitiatePaymentResult> {
    try {
      const res = await fetch(`${this.baseUrl}/payments/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) {
        return { success: false, error: `HTTP ${res.status}` };
      }
      return (await res.json()) as InitiatePaymentResult;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Initiate failed (${input.orderId}): ${msg.slice(0, 100)}`);
      return { success: false, error: msg };
    }
  }

  async refund(input: RefundInput): Promise<RefundResult> {
    try {
      const res = await fetch(`${this.baseUrl}/payments/${input.paymentId}/refund`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) {
        return { success: false, error: `HTTP ${res.status}` };
      }
      return (await res.json()) as RefundResult;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Refund failed (${input.paymentId}): ${msg.slice(0, 100)}`);
      return { success: false, error: msg };
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, {
        signal: AbortSignal.timeout(2000),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
