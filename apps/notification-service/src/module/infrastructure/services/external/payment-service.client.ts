/**
 * PaymentServiceClient — cross-service calls to payment-service
 * @module notification-service/infrastructure/services/external
 */
import { Injectable } from '@nestjs/common';
import { BaseHttpClient } from './http-client.client.js';

export const PAYMENT_SERVICE_CLIENT = Symbol('PAYMENT_SERVICE_CLIENT');

export interface PaymentSummary {
  readonly id: string;
  readonly orderId: string;
  readonly status: string;
  readonly amount: number;
  readonly currency: string;
  readonly method: string;
}

@Injectable()
export class PaymentServiceClient extends BaseHttpClient {
  constructor() {
    super({
      name: 'PaymentServiceClient',
      envKey: 'PAYMENT_SERVICE_URL',
      defaultTimeoutMs: 8_000,
    });
  }

  async getPayment(paymentId: string): Promise<PaymentSummary | null> {
    return this.get<PaymentSummary>(`/api/v1/payments/${paymentId}`);
  }
}
