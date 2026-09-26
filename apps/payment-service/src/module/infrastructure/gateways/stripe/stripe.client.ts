import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';
import { StripeConfig } from './stripe.config';
import type {
  StripeCreatePaymentIntentRequest,
  StripePaymentIntentResponse,
  StripeCaptureResponse,
  StripeRefundResponse,
} from './stripe.types';

@Injectable()
export class StripeClient {
  private readonly logger = new Logger(StripeClient.name);
  private readonly http: AxiosInstance;

  constructor(private readonly config: StripeConfig) {
    this.http = axios.create({
      baseURL: 'https://api.stripe.com/v1',
      timeout: this.config.timeoutMs,
      headers: {
        Authorization: `Bearer ${this.config.secretKey}`,
        'Stripe-Version': this.config.apiVersion,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  async createPaymentIntent(
    input: StripeCreatePaymentIntentRequest,
  ): Promise<StripePaymentIntentResponse> {
    const params = new URLSearchParams();
    params.append('amount', String(input.amount));
    params.append('currency', input.currency.toLowerCase());
    for (const [key, value] of Object.entries(input.metadata)) {
      params.append(`metadata[${key}]`, value);
    }
    const headers: Record<string, string> = {};
    if (input.idempotencyKey) headers['Idempotency-Key'] = input.idempotencyKey;

    const { data } = await this.http.post<StripePaymentIntentResponse>(
      '/payment_intents',
      params,
      { headers },
    );
    return data;
  }

  async capturePayment(paymentIntentId: string): Promise<StripeCaptureResponse> {
    const { data } = await this.http.post<StripeCaptureResponse>(
      `/payment_intents/${paymentIntentId}/capture`,
    );
    return data;
  }

  async refundPayment(
    paymentIntentId: string,
    amount?: number,
  ): Promise<StripeRefundResponse> {
    const params = new URLSearchParams();
    params.append('payment_intent', paymentIntentId);
    if (amount) params.append('amount', String(amount));
    const { data } = await this.http.post<StripeRefundResponse>(
      '/refunds',
      params,
    );
    return data;
  }
}
